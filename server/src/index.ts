import "dotenv/config";

import {
  connectToDatabase,
  globalErrorHandler,
  passportAuth,
} from "@middlewares";
import { authRouter } from "@routes";
import cors from "cors";

import express from "express";
import session from "express-session";

const app = express();
const { PORT, SESSION_SECRET } = process.env;

app.use((req, _res, next) => {
  console.debug(
    `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} `,
  );
  next();
});

app.use(
  session({
    resave: false,
    secret: SESSION_SECRET,
    saveUninitialized: false,
  }),
);

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
  console.log(`Server Started On http://localhost:${PORT} 🚀`),
);
