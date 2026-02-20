import Joi from "joi";
import joiObjectId from "joi-objectid";

import { TripStatus, TripType } from "@types";

const JoiObjectId = joiObjectId(Joi);

export const createTripValidator = Joi.object({
  body: Joi.object({
    name: Joi.string().trim().min(1).max(50),
    source: Joi.string().trim().min(1).max(20),
    destination: Joi.string().trim().min(1).max(20),
    startDate: Joi.date().required(),
    endDate: Joi.date().min(Joi.ref("startDate")).required().messages({
      "date.min": "endDate must be greater than or equal to startDate",
    }),
    type: Joi.string()
      .required()
      .valid(...Object.values(TripType)),
    initialBudget: Joi.number().optional().default(0),
    tripImageUrl: Joi.string().uri().optional(),
  }),
});

export const updateTripValidator = Joi.object({
  body: Joi.object({
    name: Joi.string().trim().min(1).max(50).optional(),
    startDate: Joi.date().optional(),
    endDate: Joi.date()
      .min(Joi.ref("startDate"))
      .messages({
        "date.min": "endDate must be greater than or equal to startDate",
      })
      .optional(),
    source: Joi.string().trim().min(1).max(20).optional(),
    destination: Joi.string().trim().min(1).max(20).optional(),
    status: Joi.string()
      .valid(...Object.values(TripStatus))
      .optional(),
    initialBudget: Joi.number().optional(),
    tripImageUrl: Joi.string().uri().optional(),
  }),
  params: {
    id: JoiObjectId().required(),
  },
});

export const getTripsValidator = Joi.object({
  query: Joi.object({
    take: Joi.number().integer().min(1).max(100).default(20),
    skip: Joi.number().integer().min(0).default(0),
  }).unknown(false),
});
