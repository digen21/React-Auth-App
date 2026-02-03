import "dotenv/config";
import Joi from "joi";

const envSchema = Joi.object({
  PORT: Joi.number().default(3000),
  NODE_ENV: Joi.string()
    .valid("development", "production", "test")
    .default("development"),
  JWT_TOKEN: Joi.string().required(),
  EXPIRY_TIME: Joi.string().default("10d"),
  MONGO_URI: Joi.string().uri().required(),
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),
  GOOGLE_CALLBACK_URL: Joi.string().required(),
  MAIL_HOST: Joi.string().required(),
  MAIL_PORT: Joi.number().default(587),
  MAIL_USER: Joi.string().required(),
  MAIL_PASSWORD: Joi.string().required(),
  EMAIL_FROM: Joi.string(),
}).unknown();

const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const env = {
  NODE_ENV: envVars.NODE_ENV,
  PORT: envVars.PORT,
  MONGODB_URI: envVars.MONGODB_URI,
  GOOGLE_CLIENT_ID: envVars.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: envVars.GOOGLE_CLIENT_SECRET,
  SESSION_SECRET: envVars.SESSION_SECRET,
  GOOGLE_CALLBACK_URL: envVars.GOOGLE_CALLBACK_URL,
  isProd: envVars.NODE_ENV === "production",
  isDev: envVars.NODE_ENV === "development",
  JWT_TOKEN: envVars.JWT_TOKEN,
  SMTP_HOST: envVars.SMTP_HOST,
  SMTP_PORT: envVars.SMTP_PORT,
  SMTP_USER: envVars.SMTP_USER,
  SMTP_PASS: envVars.SMTP_PASS,
  SMTP_FROM_NAME: envVars.SMTP_FROM_NAME || "no-reply@travel-buddy",
  EXPIRY_TIME: envVars.EXPIRY_TIME || "10d",
};

export default env;
