import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import { v2 as cloudinary } from "cloudinary";

import { corsOptions, connectDatabase, connectToRabbitMq, logger, initalizeImageWorker, initalizeEmailWorker, initializeCloudinary } from "./lib";
import { errorHandler, logRequests, limiter } from "./middleware";
import authRoutes from "./routes";

import "dotenv/config";

export const app = express();

initializeCloudinary();

app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: "5mb" }));
const PORT = process.env.PORT || 3001;

app.use(limiter);

app.use(errorHandler);
app.use(logRequests);

app.use("/api/v1/auth", authRoutes);

export const server = app.listen(PORT, async () => {
  logger.info(`auth service is running on port ${PORT}`);
  await connectDatabase();
  await connectToRabbitMq();
  initalizeImageWorker();
  initalizeEmailWorker();
});

process.on("unhandledRejection", (error) => {
  console.error(`unhandled rejection ${error}`);
  process.exit(1);
});
