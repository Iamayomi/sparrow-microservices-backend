import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { IAuth, IAuthModel } from "../interface";
import { envs } from "../../lib/config";

const authSchema = new mongoose.Schema<IAuth, IAuthModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

authSchema.pre("save", async function save(next) {
  const schema = this;
  if (!schema.isModified("password")) next();
  schema.password = await argon2.hash(schema.password);
});

authSchema.methods.verifyPassword = async function (candidatePassword: string) {
  return argon2.verify(this.password, candidatePassword);
};

authSchema.methods.createEmailVerificationToken = function (exp?: number) {
  return jwt.sign({ userId: this._id, email: this.email }, process.env.JWT_SECRET, {
    expiresIn: `${exp || "5m"}`,
  });
};

export const Auth = mongoose.model<IAuth, IAuthModel>("Auth", authSchema);
