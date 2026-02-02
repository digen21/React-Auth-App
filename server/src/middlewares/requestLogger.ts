import { logger } from "@utils";
import { NextFunction, Request, Response } from "express";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const message = `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`;

    if (res.statusCode >= 400) {
      logger.error("Message From requestLogger:: %s", message);
    } else {
      logger.info(message);
    }
  });

  next();
};

export default requestLogger;
