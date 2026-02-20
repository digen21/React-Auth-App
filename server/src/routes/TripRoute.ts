import express from "express";

import {
  createTrip,
  getTripImageUploadSignature,
  getTrips,
  updateTrip,
} from "@controllers";
import { isAuth, validate } from "@middlewares";
import {
  createTripValidator,
  getTripsValidator,
  updateTripValidator,
} from "@validators";

const tripRouter = express.Router();

tripRouter.post("/", isAuth, validate(createTripValidator), createTrip);
tripRouter.get("/", isAuth, validate(getTripsValidator), getTrips);
tripRouter.put("/:id", isAuth, validate(updateTripValidator), updateTrip);
tripRouter.get("/upload-signature", isAuth, getTripImageUploadSignature);

export default tripRouter;
