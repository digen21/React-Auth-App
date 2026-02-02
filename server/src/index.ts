import "dotenv/config";

import {
  connectToDatabase,
  globalErrorHandler,
  passportAuth,
  requestLogger,
} from "@middlewares";
import { authRouter } from "@routes";
import { logger } from "@utils";
import cors from "cors";
import express from "express";

const app = express();
const { PORT } = process.env;

app.use(requestLogger);
app.use(express.json());
app.use(cors());

app.get("/health", (_req, res) => {
  return res.send({
    status: "UP",
    code: 200,
  });
});

app.use("/auth", authRouter);

connectToDatabase();
passportAuth(app);

app.use(globalErrorHandler);

app.listen(PORT, () =>
  logger.info(`Server Started On http://localhost:${PORT} 🚀`),
);
