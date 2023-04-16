import mongoose from "mongoose";

const { MONGO_URI } = process.env;

export default () => {
  try {
    mongoose
      .connect(MONGO_URI)
      .then(() => {
        console.log("Connected To Database...💾");
      })
      .catch(() => console.log("Failed To Connect"));
  } catch (error) {
    console.log("Error Occurred", error);
    process.exit();
  }
};
