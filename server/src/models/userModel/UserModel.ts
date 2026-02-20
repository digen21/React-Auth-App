import { PaginateModel, Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

import { IUserDoc } from "@types";

const UserSchema = new Schema<IUserDoc>(
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
    },
    isVerified: {
      type: "boolean",
      default: false,
    },
    provider: {
      type: "string",
      required: true,
      default: "local",
    },
    providerId: {
      type: "string",
    },
  },
  { timestamps: true },
);

UserSchema.plugin(mongoosePaginate);

const UserModel = model<IUserDoc, PaginateModel<IUserDoc>>("User", UserSchema);

export default UserModel;
