import { Router } from "express";
import { Request, Response } from "firebase-functions/v1";

import mapTopics from "../handlers/openAi/mapTopics";
import fetchHeadlinesByTopic from "../handlers/news/fetchHeadlinesByTopic";
import verifyFirebaseToken from "../../middleware/verifyFirebaseToken";
import { handleBadRequest } from "./utils";

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

export default router;
