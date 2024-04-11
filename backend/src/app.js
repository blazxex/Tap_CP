import express from "express";
import cors from "cors";

import UserRoute from "./routes/userRoute.js";
import scoreBoardRoute from "./routes/scoreBoardRoute.js";

const app = express();

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// allow request from other origin (Frontend which is at different port)
app.use(cors());

// use routes

app.use("/users", UserRoute);
app.use("/board", scoreBoardRoute);

export default app;
