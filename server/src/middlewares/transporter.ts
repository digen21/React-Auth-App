import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

import TokenModel from "@models/tokenModel";

const {
  MAIL_HOST,
  MAIL_PORT,
  MAIL_USER,
  MAIL_PASSWORD,
  EMAIL_FROM,
  FRONTEND_URL,
}: any = process.env;

export default async (data, mailType) => {
  try {
    const transporter = nodemailer.createTransport({
      host: MAIL_HOST,
      port: MAIL_PORT,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD,
      },
    });

    const verifyToken = await bcrypt.hash(data.id.toString(), 10);

    const token = new TokenModel({
      userId: data.id,
      token: verifyToken,
    });
    console.log("Token Data: ", token);

    await token.save();
    console.log("Verify Token", verifyToken);

    const options = {
      from: EMAIL_FROM,
      to: data.email,
      subject: "Verification Email",
      html: ` <a href="http://localhost:3000/verify?token=${verifyToken}">Click Here To Verify Mail</a>`,
    };

    const sendMail = await transporter.sendMail(options);
    console.log(nodemailer.getTestMessageUrl(sendMail));
  } catch (error) {
    console.log(error);
  }
};
