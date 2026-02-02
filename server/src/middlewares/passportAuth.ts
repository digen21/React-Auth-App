import "dotenv/config";
import { ExtractJwt, Strategy } from "passport-jwt";
import passport from "passport";
import { Express } from "express";

import { UserModel } from "@models/userModel";
const { JWT_TOKEN } = process.env;

interface IUser {
  id: string;
  userId: string;
}

export default (app: Express) => {
  const options = {
    secretOrKey: JWT_TOKEN,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  try {
    passport.use(
      new Strategy(options, async (payload: IUser, done: Function) => {
        if (!payload) {
          return done(null, false);
        }
        const userId = payload?.userId;
        const user = await UserModel.findById(userId);

        return done(null, user || false);
      }),
    );

    passport.serializeUser((user: IUser, done: Function) => {
      done(null, user.id);
    });

    passport.deserializeUser(async (id: IUser, done: Function) => {
      const user = await UserModel.findById(id);
      done(null, user);
    });

    app.use(passport.initialize());
    app.use(passport.session());
  } catch (error) {
    throw new Error(error);
  }
};
