import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "@models/userModel";

const { JWT_TOKEN, EXPIRY_TIME } = process.env;

interface IUser {
  username: string;
  password: string;
  id: string;
  _id: string;
  email: string;
}

const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    let user = await UserModel.findOne({ email });
    if (user)
      res.status(200).send({
        success: false,
        message: "User Already Exists...",
      });
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await UserModel.create({
      ...req.body,
      password: hashPassword,
    });
    if (result) {
      res.status(200).send({
        success: true,
        message: "Registered Successfully...",
      });
    } else {
      res.status(200).send({
        success: false,
        message: "Check Email OR Password",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;

    const user: IUser = await UserModel.findOne({
      email,
    });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = jwt.sign({ userId: user.id }, JWT_TOKEN, {
          expiresIn: EXPIRY_TIME,
        });

        res.send({
          success: true,
          message: "Authenticated",
          token: token,
        });
      } else {
        res.send({
          success: false,
          message: "Unauthorized",
        });
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { email, curPassword, password } = req.body;

    const user: IUser = await UserModel.findOne({ email });

    if (user) {
      const isMatch = await bcrypt.compare(curPassword, user.password);

      if (isMatch) {
        const hashPassword = await bcrypt.hash(password, 10);
        const update = await UserModel.findByIdAndUpdate(user.id, {
          password: hashPassword,
        });
        await update.save();
        res.status(200).send({
          message: "Password Updated Successfully...",
          success: true,
        });
      } else {
        res.status(400).send({
          message: "Password Does not match with current password",
          success: false,
        });
      }
    } else {
      res.status(400).send({
        message: "Password Does not match with current password",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export { register, login, updateUser };
