import { transporter } from "@middlewares";
import TokenModel from "@models/tokenModel";
import { UserModel } from "@models/userModel";
import { logger, ServerError } from "@utils";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const { JWT_TOKEN, EXPIRY_TIME } = process.env;

interface IUser {
  username?: string;
  name?: string;
  city?: string;
  country?: string;
  password: string;
  id: string;
  _id: string;
  email: string;
  bio?: string;
  avatar?: string;
  phoneNumber?: string;
  isVerified: boolean;
}

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    let user = await UserModel.findOne({ email });
    if (user)
      throw new ServerError({
        message: "User Already Exists...",
        success: false,
        status: 400,
      });
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await UserModel.create({
      ...req.body,
      password: hashPassword,
    });

    await transporter(result, "verify-mail");

    if (result) {
      return res.status(200).send({
        success: true,
        message: "Registered Successfully...",
      });
    }

    throw new ServerError({
      success: false,
      message: "Check email or password",
      status: 400,
    });
  } catch (error) {
    logger.error(error);
    if (error instanceof ServerError) return next(error);
    return next(
      new ServerError({
        message: "Failed to register",
        success: false,
        status: 500,
      }),
    );
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password, email } = req.body;

    const user: IUser = await UserModel.findOne({
      email: email.trim().toLowerCase(),
    });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        if (user.isVerified) {
          const token = jwt.sign({ userId: user.id }, JWT_TOKEN!, {
            expiresIn: Number(EXPIRY_TIME),
          });

          return res.send({
            success: true,
            token: token,
          });
        } else {
          throw new ServerError({
            message: "Please Verify Your Email First...",
            success: false,
            status: 400,
          });
        }
      } else {
        throw new ServerError({
          message: "Unauthorized",
          success: false,
          status: 401,
        });
      }
    } else {
      throw new ServerError({
        message: "Invalid Credential",
        success: false,
        status: 400,
      });
    }
  } catch (error) {
    logger.error(error);

    if (error instanceof ServerError) next(error);

    return next(
      new ServerError({
        message: "Failed login",
        success: false,
        status: 500,
      }),
    );
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IUser;
    const { password, email } = req.body;

    if (email) {
      throw new ServerError({
        message: "Email is not allow to update",
        status: 400,
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
        status: 500,
      });
    }

    return res.send({
      success: true,
      message: "User updated successfully",
      data: updateUser,
    });
  } catch (error) {
    logger.error(error);
    if (error instanceof ServerError) return next(error);
    throw new ServerError({
      message: "Failed to update user",
      success: false,
      status: 500,
    });
  }
};

const verifyMail = async (req: Request, res: Response) => {
  try {
    const tokenDetails = await TokenModel.findOne({ token: req.body.token });
    if (tokenDetails) {
      await UserModel.findOneAndUpdate({
        id: tokenDetails.userId,
        isVerified: true,
      });

      await TokenModel.findOneAndDelete({
        token: req.body.token,
      });

      res.send({
        success: true,
        message: "Mail Verified",
      });
    } else {
      res.send({ success: false, message: "Invalid Token" });
    }
  } catch (error) {
    res.send({ success: false, message: "Invalid Token" });
  }
};

export { login, register, updateUser, verifyMail };
