import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import { Profile } from "passport-google-oauth20";

import { env } from "@config";
import { transporter } from "@middlewares";
import TokenModel from "@models/tokenModel";
import { UserModel } from "@models/userModel";
import { IUser, UserWithToken } from "@types";
import { catchAsync, logger, ServerError } from "@utils";

const { JWT_TOKEN, EXPIRY_TIME } = env;

export const register = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let user = await UserModel.findOne({ email });
  if (user)
    throw new ServerError({
      message: "User Already Exists...",
      success: false,
      status: httpStatus.BAD_REQUEST,
    });
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await UserModel.create({
    ...req.body,
    password: hashPassword,
  });

  // avoid breaking the code if send verification mail is failed
  try {
    await transporter(result, "verify-mail");
  } catch (error) {
    logger.error("Failed to send verification mail: ", {
      error,
      context: "Nodemailer",
    });
  }

  if (result) {
    return res.status(httpStatus.CREATED).send({
      success: true,
      message: "Registered Successfully...",
      status: httpStatus.CREATED,
    });
  }

  throw new ServerError({
    success: false,
    message: "Check email or password",
    status: httpStatus.BAD_REQUEST,
  });
});

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { password, email } = req.body;

    const user: IUser = await UserModel.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user) {
      throw new ServerError({
        message: "Invalid Credential",
        success: false,
        status: httpStatus.BAD_REQUEST,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ServerError({
        message: "Unauthorized",
        success: false,
        status: httpStatus.UNAUTHORIZED,
      });
    }

    if (!user.isVerified) {
      throw new ServerError({
        message: "Please verify your email first",
        success: false,
        status: httpStatus.BAD_REQUEST,
      });
    }

    const token = jwt.sign({ userId: user.id }, JWT_TOKEN!, {
      expiresIn: env.EXPIRY_TIME,
    });

    return res.status(httpStatus.OK).send({
      success: true,
      token,
      status: httpStatus.OK,
      message: "Login Successfully",
    });
  },
);

export const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUser;
    const { password, email } = req.body;

    if (email) {
      throw new ServerError({
        message: "Email is not allow to update",
        status: httpStatus.BAD_REQUEST,
        success: false,
      });
    }

    let hashedPassword: string;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
      req.body.password = hashedPassword;
    }

    const updateUser = await UserModel.findByIdAndUpdate(user.id, req.body, {
      new: true,
    });

    if (!updateUser) {
      throw new ServerError({
        message: "Failed to update user",
        success: false,
        status: httpStatus.BAD_REQUEST,
      });
    }

    return res.send({
      success: true,
      message: "User updated successfully",
      data: updateUser,
      status: httpStatus.OK,
    });
  },
);

export const verifyMail = catchAsync(async (req: Request, res: Response) => {
  const tokenDetails = await TokenModel.findOne({ token: req.body.token });

  if (!tokenDetails) {
    logger.error("Token Details not found", { context: "Database" });
    throw new ServerError({
      message: "Invalid Token",
      status: httpStatus.BAD_REQUEST,
      success: false,
    });
  }

  await UserModel.findOneAndUpdate({
    id: tokenDetails.userId,
    isVerified: true,
  });

  await TokenModel.findOneAndDelete({
    token: req.body.token,
  });

  return res.send({
    success: true,
    message: "Mail Verified",
    status: httpStatus.OK,
  });
});

export const googleAuthSuccess = catchAsync(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new ServerError({
        message: "Authentication failed",
        status: httpStatus.UNAUTHORIZED,
        success: false,
      });
    }
    return res.json({
      user: req.user,
      status: httpStatus.OK,
      message: "Google authentication successful",
    });
  },
);

export const googleAuthFailure = catchAsync(
  async (_req: Request, res: Response) => {
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: "Google authentication failed",
      status: httpStatus.UNAUTHORIZED,
      success: false,
    });
  },
);

export const findOrCreateGoogleUser = async (
  profile: Profile,
): Promise<UserWithToken> => {
  let user = await UserModel.findOne({
    providerId: profile.id,
    provider: "google",
  });

  if (!user) {
    user = await UserModel.create({
      username: profile.displayName,
      email: profile.emails[0].value,
      avatar: profile.photos[0].value,
      provider: "google",
      providerId: profile.id,
      name: `${profile?.name?.givenName} ${profile?.name?.familyName}`,
      isVerified: profile?.emails?.[0].verified,
    });
  }

  const token = await jwt.sign({ userId: user.id }, JWT_TOKEN!, {
    expiresIn: EXPIRY_TIME,
  });

  return {
    ...user.toObject(),
    token,
  };
};
