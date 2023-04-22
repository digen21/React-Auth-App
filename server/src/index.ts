import "dotenv/config";
import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";

const app = express();
const { PORT, SESSION_SECRET } = process.env;

import { connectToDatabase, passportAuth } from "@middlewares";
import { authRouter } from "@routes";

app.use(
  session({
    resave: false,
    secret: SESSION_SECRET,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);

connectToDatabase();
passportAuth(app);

app.listen(PORT, () =>
  console.log(`Server Started On http://localhost:${PORT} 🚀`)
);
