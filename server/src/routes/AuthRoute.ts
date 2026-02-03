import express from "express";
import passport from "passport";

import {
  googleAuthFailure,
  googleAuthSuccess,
  login,
  register,
  verifyMail,
} from "@controllers";
import { isAuth } from "@middlewares";

const authRouter = express.Router();

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

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleAuthSuccess,
);

authRouter.get("/google/failure", googleAuthFailure);

export default authRouter;
