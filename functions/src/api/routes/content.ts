import { Router } from "express";
import { Request, Response } from "firebase-functions/v1";

import mapTopics from "../handlers/openAi/mapTopics";
import fetchHeadlinesByTopic from "../handlers/news/fetchHeadlinesByTopic";
import verifyFirebaseToken from "../../middleware/verifyFirebaseToken";

const router = Router();

// A utility function to handle bad requests and reduce duplication
const handleBadRequest = (res: Response, message: string): void => {
  res.status(400).json({ error: message });
};

router.get(
  "/news",
  verifyFirebaseToken,
  async (req: Request, res: Response) => {
    const { topic, thoughts } = req.query;

    if (!topic) {
      return handleBadRequest(res, "Topic is required");
    }

    // Since we've already checked for the existence of topic, we can safely use non-null assertion
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
