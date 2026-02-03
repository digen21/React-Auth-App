import express from "express";

import { updateUser } from "@controllers";

const userRouter = express.Router();

userRouter.put("/update", updateUser);

export default userRouter;
