import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: "string",
      trim: true, // will remove white space
      required: true,
    },
    email: {
      type: "string",
      required: true,
    },
    password: {
      type: "string",
      trim: true,
      required: true,
    },
    isVerified: {
      type: "boolean",
      default: false,
    },
  },
  { timestamps: true }
);

export default model("users", userSchema);
