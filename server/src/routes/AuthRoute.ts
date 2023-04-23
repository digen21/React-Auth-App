import express from "express";
const authRouter = express.Router();

import { register, login, updateUser } from "@controllers";
import { isAuth } from "@middlewares";

authRouter.post("/register", register);
authRouter.post(
  "/login",

  login
);
authRouter.get("/dashboard", isAuth, (req, res) => {
  res.send({
    success: true,
    data: req.user,
  });
});

authRouter.post("/update", isAuth, updateUser);

export default authRouter;
