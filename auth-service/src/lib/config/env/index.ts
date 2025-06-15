export const envs = {
  env: process.env.NODE_ENV as "development" | "production" | "test",

  port: process.env.PORT as string,

  MONGODB_URI: process.env.MONGODB_URI as string,

  jwtSecret: process.env.JWT_SECRET as string,
  jwtExpiration: process.env.JWT_EXPIRATION as string,

  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME as string,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY as string,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET as string,
};
