import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;

import { connectToDatabase } from "@middlewares";
import { authRouter } from "@routes";

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);

app.get("/getData", (req, res) => {
  res.send("Hello");
});

connectToDatabase();
app.listen(PORT, () =>
  console.log(`Server Started On http://localhost:${PORT} 🚀`)
);
