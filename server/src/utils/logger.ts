import { createLogger, format, transports, addColors } from "winston";
import "winston-daily-rotate-file";
import path from "path";

const { combine, timestamp, json, printf, colorize, errors } = format;

const customColors = {
  info: "blue",
  error: "red",
  warn: "yellow",
  debug: "green",
};

addColors(customColors);

// Custom format for local development
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

const logger = createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }), // Log the full stack trace on errors
    process.env.NODE_ENV === "production"
      ? json()
      : combine(colorize(), logFormat),
    format.splat(),
    colorize({ all: true }),
  ),
  transports: [new transports.Console()],
});

// Only add file transports in production to avoid cluttering local dev with files
if (process.env.NODE_ENV === "production") {
  logger.add(
    new transports.DailyRotateFile({
      filename: path.join("logs", "error-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      level: "error",
      maxSize: "20m",
      maxFiles: "14d",
      zippedArchive: true,
    }),
  );

  logger.add(
    new transports.DailyRotateFile({
      filename: path.join("logs", "combined-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "14d",
      zippedArchive: true,
    }),
  );
}

export default logger;
