import express, { Express } from "express";

import { isAuth } from "@middlewares";
import authRouter from "./AuthRoute";
import tripRouter from "./TripRoute";
import userRouter from "./UserRoute";

const API_PREFIX = "/api";

const useRouter = (app: Express) => {
  const apiRouter = express.Router();

  apiRouter.use("/auth", authRouter);
  apiRouter.use("/users", isAuth, userRouter);
  apiRouter.use("/trips", tripRouter);

  app.use(API_PREFIX, apiRouter);
};

export default useRouter;
