import nodemailer from "nodemailer";

import { APP_NAME, envs } from "../../config";
import { MailOptions } from "../../types";

export class Email {
  constructor(private sender: string = `${APP_NAME} <${process.env.NODEMAILER_EMAIL}>`) {
    this.sender = sender;
  }

  /**
   * Sends emails using nodemailer and gmail as mail service
   * @param payload [MailOptions]
   */
  viaNodemailer = async (payload: MailOptions) => {
    const { from, html, text, subject, attachments, to } = payload;

    const transporter = nodemailer.createTransport({
      service: "Gmail",

      auth: {
        user: envs.google_auth_user,
        pass: envs.google_auth_password,
      },
    });

    const mailOptions = {
      from: from || this.sender,
      to,
      subject,
      html,
      text,
      attachments,
    };

    return await transporter.sendMail(mailOptions);
  };
}
