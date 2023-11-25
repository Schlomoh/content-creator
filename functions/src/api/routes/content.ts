import { Router } from "express";
import { Request, Response } from "firebase-functions/v1";

import mapTopics from "../handlers/openAi/mapTopics";
import fetchHeadlinesByTopic from "../handlers/news/fetchHeadlinesByTopic";
import verifyFirebaseToken from "../../middleware/verifyFirebaseToken";
import { handleBadRequest } from "./utils";
import { ContentBatch } from "@/types/database";
import createPosts from "../handlers/openAi/createPosts";

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

router.post(
  "/posts",
  verifyFirebaseToken,
  async (req: Request, res: Response) => {
    const { batch } = req.body as { batch: ContentBatch };

    if (!batch) {
      return handleBadRequest(res, "Batch is required");
    }

    try {
      const posts = await createPosts(batch);
      if (!posts) throw new Error();

      res.json(posts);
    } catch (error) {
      console.error(error);
      return handleBadRequest(res, "Error creating posts");
    }
  }
);

export default router;
