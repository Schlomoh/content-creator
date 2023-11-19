import express from "express";
import cors from "cors";
import morgan from "morgan";
import functions from "firebase-functions";
import * as dotenv from "dotenv";
dotenv.config();

import { contentRoutes, strategyRoutes } from "./api/routes";

const app = express();

const corsOptions = {
  allowedHeaders: ["Content-Type", "Authorization"],
  origin: "https://content-creator-x.web.app",
};

// Middleware Stack
app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));
app.use(cors(corsOptions));

app.use(express.json());

const contentApp = app.use(contentRoutes);
const strategyApp = app.use(strategyRoutes);

// Export the Express server as a Firebase function
exports.content = functions.https.onRequest(contentApp);
exports.strategy = functions.https.onRequest(strategyApp);
