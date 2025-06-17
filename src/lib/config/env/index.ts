export const envs = {
  env: process.env.NODE_ENV as "development" | "production" | "test",

  port: process.env.PORT as string,

  mongodb_uri: process.env.MONGODB_URI as string,

  jwtSecret: process.env.JWT_SECRET as string,

  google_auth_user: process.env.GOOGLE_AUTH_USER as string,
  google_auth_password: process.env.GOOGLE_AUTH_PASSWORD as string,

  rabbitmqUrl: process.env.RABBITMQ_URL as string,

  jwtExpiration: process.env.JWT_EXPIRATION as string,

  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME as string,

  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY as string,

  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET as string,
};
