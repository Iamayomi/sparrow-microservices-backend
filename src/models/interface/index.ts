import { Model } from "mongoose";

export interface IAuth {
  /** Auth's email */
  email: string;

  /** Auth's password */
  password: string;

  /** Url to avatar of user */
  isVerified: boolean;
}

/** Interface describing custom methods associated with the `Auth` model */
export interface IAuthMethods {
  /** Verifies the provided password by comparing it with the password of the user. */
  verifyPassword: (candidatePassword: string) => Promise<boolean>;

  /** Creates and returns a `jwt` access token encoded with the `userId` and `email` property */
  createAccessToken: (expiresAt?: number | string | undefined) => string;

  /** Creates and returns a `jwt` token encoded with the `userId` and `email` properties
   * @param expiresAt The lifespan of the code generated. Defaults to  15. Example: 1 = 1 minute, 15 = 15 minutes
   */
  createEmailVerificationToken: (expiresAt?: number) => {
    token: string;
    email: string;
  };
}

/** Interface describing the `Auth` model
 * @description Defines custom `static` methods on `Auth` model
 */
export interface IAuthModel extends Model<IAuth, {}, IAuthMethods> {}
