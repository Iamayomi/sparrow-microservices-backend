import Redis from "ioredis";
import { Auth } from "../models";
import { publishEvent, emailQueue, imgQueue, sendError } from "../lib";

/** Auth service class. */
export class AuthService {
  constructor(private authModel = Auth) {}

  /** Creates and returns a new user document */
  public async createAccount(data: any) {
    const { email, avatar, password, bio, username } = data;
    // step 1: check for duplicate account
    const accountExists = await this.authModel.findOne({
      email: data?.email,
    });

    if (accountExists) sendError.duplicateRequestError("Email already in use.");

    // step 2: create a new account
    const newUser = await this.authModel.create({ email, avatar, password, username });

    const token = newUser.createEmailVerificationToken();

    await emailQueue.add(
      "send-email",
      {
        email: email,
        username: username,
        token: token,
      },
      {
        attempts: 3,
        backoff: { type: "exponential", delay: 3000 },
        removeOnComplete: true,
        removeOnFail: true,
      }
    );

    if (avatar) {
      await imgQueue.add(
        "avatar-upload",
        { imagePath: avatar, userId: newUser._id },
        {
          attempts: 3,
          backoff: { type: "exponential", delay: 3000 },
          removeOnComplete: true,
          removeOnFail: true,
        }
      );
    }

    await publishEvent("user.created", {
      _id: newUser._id,
      username,
      email,
      ...(bio && { bio }),
    });

    return newUser;
  }
}

/**
 * Instance of the AuthService class used to handle auth-related database queries
 * @instance {AuthService} */
export const authService = new AuthService();

// export const registerUser = async (
//   email: string,
//   password: string,
//   username: string,

//   avatar?: string,
//   bio?: string
// ) => {
//   try {
//     const existingUser = await Auth.findOne({ email });
//     if (existingUser) {
//       throw new Error("User already exists");
//     }

//     const user = new Auth({
//       password,
//       email,
//       isVerified: false,
//     });

//     const token = generateMailToken(user._id, email);

//     await emailQueue.add(
//       "send-email",
//       {
//         email: email,
//         username: username,
//         token: token,
//       },
//       {
//         attempts: 3,
//         backoff: { type: "exponential", delay: 3000 },
//         removeOnComplete: true,
//         removeOnFail: true,
//       }
//     );

//     await user.save();

//     if (avatar) {
//       await queue.add(
//         "avatar-upload",
//         { imagePath: avatar, userId: user._id },
//         {
//           attempts: 3,
//           backoff: { type: "exponential", delay: 3000 },
//           removeOnComplete: true,
//           removeOnFail: true,
//         }
//       );
//     }

//     await publishEvent("user.created", {
//       _id: user._id,
//       username,
//       email,
//       ...(bio && { bio }),
//     });

//     return user;
//   } catch (error) {
//     logger.error(error);
//     throw error;
//   }
// };

// export const verifyEmailService = async (token: string) => {
//   try {
//     const decodedToken = decodeEmailToken(token);
//     if (!decodedToken) {
//       throw new Error("Invalid or expired verification link");
//     }

//     const { userId } = decodedToken;

//     const user = await Auth.findById(userId);

//     if (!user) {
//       throw new Error("User not found");
//     }

//     if (user.isVerified) {
//       throw new Error("User already verified");
//     }

//     user.isVerified = true;

//     await user.save();

//     return;
//   } catch (error) {
//     throw error;
//   }
// };

// export const LoginService = async (email: string, password: string, redisClient: Redis) => {
//   try {
//     const user = await Auth.findOne({ email });

//     if (!user) {
//       throw new Error("invalid credentials");
//     }

//     const isValid = await user.comparePassword(password);
//     const generatedOtp = crypto.randomInt(100000, 999999);
//     const expiryTime = 5 * 60;

//     if (isValid) {
//       await redisClient.set(`otp:${user.email}`, generatedOtp, "EX", expiryTime);

//       await sendOtpMail(user.email, generatedOtp);
//     } else {
//       throw new Error("invalid credentials");
//     }

//     return true;
//   } catch (error) {
//     throw error;
//   }
// };

// export const resendOtpService = async (email: string, redisClient: Redis) => {
//   try {
//     const exisitingOtp = await redisClient.get(`otp:${email}`);

//     if (exisitingOtp) {
//       const ttl = await redisClient.ttl(`otp:${email}`);

//       throw new Error(`An OTP was recently sent. Please wait ${ttl} seconds before retrying.`);
//     }
//     const generatedOtp = crypto.randomInt(100000, 999999);
//     const expiryTime = 5 * 60;

//     const otp = await redisClient.set(`otp:${email}`, generatedOtp, "EX", expiryTime);

//     if (otp === "OK") {
//       await sendOtpMail(email, generatedOtp);
//     }
//     return;
//   } catch (error) {
//     logger.error(error);
//     throw error;
//   }
// };
