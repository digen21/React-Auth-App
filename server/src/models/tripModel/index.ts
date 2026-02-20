import mongoose, { PaginateModel, Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

import { ITripDoc, TripStatus, TripType } from "@types";

const TripSchema = new Schema<ITripDoc>(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    name: {
      type: "string",
      required: true,
      trim: true,
    },
    source: {
      type: "string",
      required: true,
      trim: true,
    },
    destination: {
      type: "string",
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    type: {
      type: "string",
      enum: Object.values(TripType),
      required: true,
    },
    initialBudget: {
      type: "number",
    },
    tripImageUrl: {
      type: "string",
    },
    status: {
      type: "string",
      enum: Object.values(TripStatus),
      required: true,
      default: TripStatus.PLANNING,
    },
  },
  { timestamps: true },
);

TripSchema.plugin(mongoosePaginate);
const TripModel = model<ITripDoc, PaginateModel<ITripDoc>>(
  "Trips",
  TripSchema,
  "trips",
);
export default TripModel;
