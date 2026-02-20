import { RequestHandler } from "express";
import passport from "passport";

const isAuth: RequestHandler = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, _info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    req.user = user;
    next();
  })(req, res, next);
};

export default isAuth;
