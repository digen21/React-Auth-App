import express from "express";

import { getUserImageUploadSignature, updateUser } from "@controllers";
import { validate } from "@middlewares";
import { updateUserValidator } from "@validators";

const userRouter = express.Router();

userRouter.put("/update", validate(updateUserValidator), updateUser);
userRouter.put("/upload-signature", getUserImageUploadSignature);

export default userRouter;
