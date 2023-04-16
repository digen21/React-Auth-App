import bcrypt from "bcrypt";
import { UserModel } from "@models/userModel";
import { Request, Response } from "express";

interface IUser {
  username: String;
  email: String;
  password: String;
  verified: Boolean;
}

const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    let user = await UserModel.findOne({ email: email });
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
    const { password } = req.body;

    const user: any = await UserModel.findOne({
      email: req.body.email,
    });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        res.send({
          success: true,
          message: "Authenticated",
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

export { register, login };
