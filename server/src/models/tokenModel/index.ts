import { Document, PaginateModel, Schema, model } from "mongoose";

import { IToken, ITokenDoc } from "@types";

const tokenSchema = new Schema<ITokenDoc>(
  {
    userId: {
      type: "string",
      trim: true, // will remove white space
      required: true,
    },
    token: {
      type: "string",
      trim: true,
      required: true,
    },
  },
  { timestamps: true },
);

export default model<ITokenDoc, PaginateModel<ITokenDoc>>(
  "Token",
  tokenSchema,
  "tokens",
);
