import { Router } from "express";
import { Request, Response } from "firebase-functions/v1";

import mapTopics from "../handlers/openAi/mapTopics";
import fetchHeadlinesByTopic from "../handlers/news/fetchHeadlinesByTopic";
import verifyFirebaseToken from "../../middleware/verifyFirebaseToken";
import { handleBadRequest } from "./utils";
import { ContentBatch } from "@/types/database";
import createPosts from "../handlers/openAi/createPosts";
import { firebaseApp } from "../setup/setupFirebase";

const router = Router();

router.get(
  "/news",
  verifyFirebaseToken,
  async (req: Request, res: Response) => {
    const { topic, thoughts } = req.query;

    if (!topic) {
      return handleBadRequest(res, "Topic is required");
    }

    const useableTopic = await mapTopics(
      topic.toString(),
      thoughts?.toString()
    );

    if (!useableTopic) {
      return handleBadRequest(res, "Error finding topic");
    }

    res.json(await fetchHeadlinesByTopic(useableTopic.query));
  }
);

router.get(
  "/posts",
  verifyFirebaseToken,
  async (req: Request<{ batchId: string }>, res: Response) => {
    const { batchId } = req.query as { batchId: string };

    if (!batchId) {
      return handleBadRequest(res, "BatchID is required");
    }

    try {
      const db = firebaseApp.firestore();
      const batchDocRef = db.collection("content").doc(String(batchId));
      const batchDoc = await batchDocRef.get();

      if (!batchDoc.exists) {
        return handleBadRequest(res, "Batch not found");
      }

      const batch = batchDoc.data() as ContentBatch;
      console.log(JSON.stringify(batch));

      const posts = await createPosts(batch);
      if (!posts) throw new Error();

      res.json({ posts });
    } catch (error) {
      console.error(error);
      return handleBadRequest(res, "Error creating posts");
    }
  }
);

export default router;
