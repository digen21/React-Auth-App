import { NextFunction, Request, RequestHandler, Response } from "express";
import passport from "passport";
import { ExtractJwt } from "passport-jwt";
const { JWT_TOKEN } = process.env;

const options = {
  secretOrKey: JWT_TOKEN,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const isAuth: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = options.jwtFromRequest(req);
  console.log("Passport", token);

  if (token) {
    const auth = passport.authenticate("jwt", { session: true })(
      req,
      res,
      next
    );
  } else {
    next();
  }
};

export default isAuth;
