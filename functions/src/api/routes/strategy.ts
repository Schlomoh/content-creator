import { Router } from "express";
import { Request, Response } from "firebase-functions/v1";

import createContentStrategy from "../handlers/openAi/contentStrategy";
import verifyFirebaseToken from "../../middleware/verifyFirebaseToken";
import { handleBadRequest } from "./utils";

const router = Router();

router.post(
  "/contentGuides",
  verifyFirebaseToken,
  async (req: Request, res: Response) => {
    const { persona, generalTopics } = req.body;

    console.log("persona", persona, "topics:", generalTopics);

    if (!persona) {
      return handleBadRequest(res, "Persona is required");
    }

    const postGuides = await createContentStrategy(persona, generalTopics);

    if (!postGuides) {
      return handleBadRequest(res, "Error creating guides.");
    }

    res.status(200).json({
      persona,
      generalTopics,
      structures: postGuides.contentStrategy,
    });
  }
);

export default router;
