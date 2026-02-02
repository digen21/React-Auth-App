import { logger } from "@utils";
import mongoose from "mongoose";

const { MONGO_URI } = process.env;

export default () => {
  try {
    mongoose
      .connect(MONGO_URI)
      .then(() => {
        logger.info("Connected To Database...💾");
      })
      .catch((e) => logger.error("Failed To Connect: ", e));
  } catch (error) {
    logger.error("Error Occurred While connecting database: ", error);
    process.exit();
  }
};
