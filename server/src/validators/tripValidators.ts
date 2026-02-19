import { TripType } from "@models/tripModel";
import Joi from "joi";

export const createTripValidator = Joi.object({
  body: Joi.object({
    name: Joi.string().trim().min(1).max(50).optional(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    type: Joi.string()
      .required()
      .valid(...Object.values(TripType)),
    initialBudget: Joi.number().optional(),
    tripImageUrl: Joi.string().uri().optional(),
  }),
});
