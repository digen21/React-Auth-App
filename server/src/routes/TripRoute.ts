import express from "express";

import { getTripImageUploadSignature, updateUser } from "@controllers";
import { isAuth, validate } from "@middlewares";
import { createTripValidator } from "src/validators/tripValidators";

const tripRouter = express.Router();

tripRouter.post("/", isAuth, validate(createTripValidator), updateUser);
tripRouter.get("/upload-signature", isAuth, getTripImageUploadSignature);

export default tripRouter;
