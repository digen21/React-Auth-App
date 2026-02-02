import { ServerError } from "@utils";
import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (
  err: Error | ServerError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ServerError) {
    return res
      .status(err.status)
      .json({ message: err.message, status: err.status });
  }
  return res
    .status(500)
    .json({ message: "Internal Server Error", status: 500 });
};

export default globalErrorHandler;
