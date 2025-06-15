import mongoose from "mongoose";
import logger from "../logger";
import { MONGODB_URI } from "../config";

const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(MONGODB_URI);
    logger.info(`connected to mongo db ${connection.connection.host}`);
  } catch (error) {
    logger.error(`mongo db failed to connect ${error}`);
    // process.exit(1);
  }
};

export default connectDatabase;
