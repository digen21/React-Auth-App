import express from "express";
import mongoose from "mongoose";

import connectToDatabase from "../middlewares/connectToDatabase";
import globalErrorHandler from "../middlewares/globalErrorHandler";
import isAuth from "../middlewares/isAuth";
import passportAuth from "../middlewares/passportAuth";
import { UserModel } from "../models/userModel";
import authRouter from "../routes/AuthRoute";
import userRouter from "../routes/UserRoute";

export const app = express();
app.use(express.json());
passportAuth(app); // Initialize Passport with JWT strategy
app.use("/auth", authRouter);
app.use("/user", isAuth, userRouter);
app.use(globalErrorHandler);

// Connect to test database before tests
export const setupDatabase = () => {
  beforeAll(async () => {
    await connectToDatabase();
    // Ensure clean database
    await UserModel.deleteMany({});
  });

  // Clean up after each test
  afterEach(async () => {
    await UserModel.deleteMany({});
  });

  // Close database connection after all tests
  afterAll(async () => {
    await mongoose.connection.close();
  });
};
