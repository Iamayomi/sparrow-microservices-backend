import { Queue, Worker } from "bullmq";
import { Types } from "mongoose";
import { cloudinary } from "../../cloudinary";
import { redisClient } from "../../cache";
import { logger } from "../../logger";
import { sendVerificationMail } from "../../email";
import { publishEvent } from "../../queue";
import { Email } from "../../email";

export const emailQueue = new Queue("send-email", {
  connection: redisClient,
});

const sendEmail = async (email: string, username: string, token: string) => {
  try {
    const mailOptions = await sendVerificationMail(username, token);

    const mail = new Email().viaNodemailer({ ...mailOptions, to: email });

    if (mail) {
      logger.info("Mail successfully sent");
    }
  } catch (error) {
    logger.error(error);
  }
};

export const initalizeEmailWorker = () => {
  const worker = new Worker(
    "send-email",
    async (job: { data: { email: string; username: string; token: string } }) => {
      const { email, username, token } = job.data;
      await sendEmail(email, username, token);
    },
    {
      connection: redisClient,
    }
  );

  worker.on("failed", (job, err) => {
    logger.error(`Image upload job failed for job ${job}:`, err);
  });

  return worker;
};

export const imgQueue = new Queue("upload-avatar", {
  connection: redisClient,
});

export const uploadToCloudinary = async (imagePath: string, userId: Types.ObjectId) => {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: "user_avatars",
      public_id: `profileImg_${userId}`,
    });

    logger.info("image uploaded successfully");
    publishEvent("avatar.uploaded", {
      result: result.secure_url,
      userId,
    });
  } catch (error) {
    logger.error(error);
  }
};

export const initalizeImageWorker = () => {
  const worker = new Worker(
    "upload-avatar",
    async (job: { data: { imagePath: string; userId: Types.ObjectId } }) => {
      const { imagePath, userId } = job.data;
      await uploadToCloudinary(imagePath, userId);
    },
    {
      connection: redisClient,
    }
  );

  worker.on("failed", (job: any, err) => {
    logger.error(`Image upload job failed for job ${job.id}:`, err);
  });

  return worker;
};

/**
 * Function obscures an email address
 * @param email string
 * @example 's******@gmail.com'
 * @returns Obscured email
 */
export const obscureEmail = (email: string) => {
  if (email) {
    const [name, domain] = email.split("@");
    const l = name.length;
    if (l > 2) {
      return `${name[0]}${new Array(l - 1).join("*")}${name[l - 1]}@${domain}`;
    } else {
      return `${name[0]}${new Array(l).join("*")}@${domain}`;
    }
  }
};
