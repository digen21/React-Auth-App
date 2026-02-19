import mongoose, { Schema, model } from "mongoose";

export const TripType = {
  GROUP: "GROUP",
  SPLIT: "SPLIT",
};

const TripSchema = new Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
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
  },
  { timestamps: true },
);

const TripModel = model("Trips", TripSchema, "trips");
export default TripModel;
