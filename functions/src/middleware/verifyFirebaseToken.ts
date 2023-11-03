import { NextFunction, Request, Response } from "express";
import adminApp from "../api/setup/setupFirebase";

// Utility function to handle unauthorized access
const handleUnauthorized = (res: Response): void => {
  res.status(403).send("Unauthorized");
};

const verifyFirebaseToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split("Bearer ")[1] || "";

  if (!token) {
    return handleUnauthorized(res);
  }

  adminApp
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      req.user = decodedToken;
      next();
    })
    .catch((error) => {
      console.error(error);
      handleUnauthorized(res);
    });
};

export default verifyFirebaseToken;
