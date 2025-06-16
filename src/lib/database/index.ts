import mongoose from "mongoose";
import { logger } from "../logger";
import { envs } from "../../lib";

export const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(envs.mongodb_uri);
    logger.info(`connected to mongo db ${connection.connection.host}`);
  } catch (error) {
    logger.error(`mongo db failed to connect ${error}`);
    // process.exit(1);
  }
};
