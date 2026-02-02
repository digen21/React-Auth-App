import express from "express";
const authRouter = express.Router();

import { register, login, updateUser, verifyMail } from "@controllers";
import { isAuth } from "@middlewares";

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/verify-mail", verifyMail);

authRouter.get("/profile", isAuth, (req, res) => {
  return res.status(200).send({
    success: true,
    user: req.user,
    status: 200,
  });
});

authRouter.put("/update", isAuth, updateUser);

export default authRouter;
