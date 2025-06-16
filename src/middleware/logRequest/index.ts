import { NextFunction, Response } from "express";
import { logger } from "../../lib";
import { CustomRequest } from "types";

export const logRequests = (req: CustomRequest, _: Response, next: NextFunction) => {
  logger.info(` received a ${req.method} request to ${req.url}`);
  logger.info(`${req.body}`);
  next();
};
