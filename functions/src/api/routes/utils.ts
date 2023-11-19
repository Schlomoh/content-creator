import { Response } from "express";

// A utility function to handle bad requests and reduce duplication
export const handleBadRequest = (res: Response, message: string): void => {
  res.status(400).json({ error: message });
};
