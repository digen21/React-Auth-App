import mongoose from "mongoose";

import { logger } from "@utils";

const { MONGO_URI } = process.env;

export default () => {
  try {
    mongoose
      .connect(MONGO_URI)
      .then(() => {
        logger.info("Connected To Database...💾");
      })
      .catch((e) =>
        logger.error("Failed To Connect: ", {
          error: e,
          context: "Database connection",
        }),
      );
  } catch (error) {
    logger.error("Error Occurred While connecting database: ", { error });
    process.exit();
  }
};
