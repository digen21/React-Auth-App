import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: "string",
      trim: true, // will remove white space
    },
    name: {
      type: "string",
      trim: true, // will remove white space
    },
    email: {
      type: "string",
      required: true,
    },
    phoneNumber: {
      type: "string",
    },
    bio: {
      type: "string",
    },
    avatar: {
      type: "string",
    },
    city: {
      type: "string",
    },
    country: {
      type: "string",
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
  { timestamps: true },
);

export default model("User", userSchema, "users");
