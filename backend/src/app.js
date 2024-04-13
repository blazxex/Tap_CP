import express from "express";
import cors from "cors";

import UserRoute from "./routes/userRoute.js";
import scoreBoardRoute from "./routes/scoreBoardRoute.js";
import attackRoute from "./routes/attackRoute.js";
import bossRoute from "./routes/bossRoute.js";

const app = express();

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// allow request from other origin (Frontend which is at different port)
app.use(cors());

// use routes

app.use("/users", UserRoute);
app.use("/board", scoreBoardRoute);
app.use("/boss", bossRoute);
app.use("/attack", attackRoute);
//TODO : can i get boss Route🥺

export default app;
