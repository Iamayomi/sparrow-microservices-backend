import { NextFunction, Response } from "express";
import { ObjectSchema } from "joi";
import { CustomRequest } from "../../types";
import { sendError } from "../../lib";

/**
 * This middleware validates ***request body*** (ie payload) against the provided *Joi* ***ObjectSchema*** representing the required payload structure and types. If `payload` passes validation, its validated values are then spread into `req.body` after which control is passed to the respective `controller` or `handler` from where these sanitized/validated request `payload` can be accessed for further operations.
 * @param {ObjectSchema} fieldsSchema
 * @param {ObjectSchema} fileSchema (optional)
 */
export const validateRequest = (fieldsSchema: ObjectSchema, fileSchema?: ObjectSchema) => (req: CustomRequest, _: Response, next: NextFunction) => {
  let payload = req.body;

  const { error, value } = fieldsSchema.validate(payload);

  if (error) sendError.BadRequestError(error.message);

  req.body = { ...payload, ...value };

  if (fileSchema) {
    const { error, value: files } = fileSchema.validate(req.files);

    if (error) sendError.BadRequestError(error.message);

    req.files = { ...req.files, ...files };
  }

  next();
};
