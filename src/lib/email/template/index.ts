export const sendVerificationMail = async (username: string, token: string) => {
  return {
    subject: "Email verification required",

    text: `Hello ${username}! Welcome to the Sparrow Chat family. We are so thrilled to have you onboard! Please verify your email.`,

    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0;">
  
  
      <h2 style="color: #333;">Hey ${username},</h2>
      
      <p style="font-size: 16px; color: #555;">Welcome to <strong>Sparrow Chat</strong> 🎉</p>
      
      <p style="font-size: 16px; color: #555;">
        We’re thrilled to have you on board. To get started, please verify your email address by clicking the button below:
      </p>
  
      <div style="text-align: center; margin: 30px 0;"> 
        <a href="http://localhost:3000/auth/callback/verify-email?token=${token}" 
           style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-size: 16px;">
           Verify Email
        </a>
      </div>
  
      <p style="font-size: 14px; color: #999;">
        If the button doesn’t work, copy and paste the following link into your browser:
        <br/>
        <a href="http://localhost:3000/auth/callback/verify-email?token=${token}" style="color: #4CAF50;">http://localhost:3003/callback/verify-email?token=${token}</a>
      </p>
  
      <hr style="margin: 40px 0; border: none; border-top: 1px solid #ddd;" />
  
      <p style="font-size: 12px; color: #aaa; text-align: center;">
        &copy; ${new Date().getFullYear()} Sparrow Chat. All rights reserved.
      </p>
    </div>
  `,
  };
};

export const sendCodeMail = async (subject?: string, username?: string, code?: number | string) => {
  return {
    subject: subject || `[${code}] Activate your account`,

    text: `Hello ${username}, please use the code, ${code}, to activate your account.`,

    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0;">
  
      <h2 style="color: #333;">Hey there,</h2>
      
      <p style="font-size: 16px; color: #555;">Welcome to <strong>Sparrow Chat</strong> 🎉</p>
      
      <p style="font-size: 16px; color: #555;">
        We’ve received a request to verify your email address. To proceed, please use the OTP below:
      </p>
  
      <div style="text-align: center; margin: 30px 0;">
        <h3 style="background-color: #4CAF50; color: white; padding: 12px 24px; border-radius: 5px; font-size: 24px;">
          ${code}
        </h3>
      </div>
  
      <p style="font-size: 14px; color: #999;">
        If the OTP doesn’t work, make sure to copy and paste the code manually. If you didn’t request this, you can ignore this message.
      </p>
  
      <hr style="margin: 40px 0; border: none; border-top: 1px solid #ddd;" />
  
      <p style="font-size: 12px; color: #aaa; text-align: center;">
        &copy; ${new Date().getFullYear()} Sparrow Chat. All rights reserved.
      </p>
    </div>
  `,
  };
};
