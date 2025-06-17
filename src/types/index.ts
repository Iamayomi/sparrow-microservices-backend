import { Request } from "express";
import { Types, Document } from "mongoose";
import { IAuth, IAuthMethods } from "../models/interface";
import { Avatar } from "../lib";

// request
export interface CustomRequest extends Request {
  user: {
    userId: string;
  };
  session: {
    user: Document<unknown, {}, IAuth> & Omit<IAuth & { _id: Types.ObjectId }, keyof IAuthMethods> & IAuthMethods;
  };
  files: { avatar?: Avatar; [key: string]: any };
}
