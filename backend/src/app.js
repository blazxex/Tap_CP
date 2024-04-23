import express from "express";
import cors from "cors";
import { EventEmitter } from "events"; // Import EventEmitter for managing SSE
import { getScoreBoard } from "./controllers/scoreBoardController.js"; // Import your controller function

import UserRoute from "./routes/userRoute.js";
import scoreBoardRoute from "./routes/scoreBoardRoute.js";
import attackRoute from "./routes/attackRoute.js";
import bossRoute from "./routes/bossRoute.js";
import itemRoute from "./routes/itemRoute.js";

const app = express();
//Who send the data(new thing for SSE)
const eventEmitter = new EventEmitter(); // Create EventEmitter instance

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allow requests from other origins (frontend at different port)
app.use(cors());

// Use routes
app.use("/users", UserRoute);
app.use("/board", scoreBoardRoute);
app.use("/boss", bossRoute);
app.use("/attack", attackRoute);
app.use("/items", itemRoute);

// SSE endpoint
app.get("/events", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // Function to periodically send scoreboard data
    const sendScoreboardData = () => {
        getScoreBoard(null, res) // Call your controller function
            .then(scoreboardData => {
                const formattedData = { scoreboard: scoreboardData }; // Format data as needed
                res.write(`data: ${JSON.stringify(formattedData)}\n\n`); // Send data to client
            })
            .catch(error => {
                console.error("Error sending scoreboard data:", error);
            });
    };

    // Send scoreboard data every second
    const intervalId = setInterval(sendScoreboardData, 1000);

    // Remove interval when the client closes the connection
    req.on("close", () => {
        clearInterval(intervalId);
    });
});

// Example endpoint to trigger SSE events(no need)
// app.post("/trigger-event", (req, res) => {
//     const eventData = req.body; // Data to be sent to clients
//     eventEmitter.emit("newEvent", eventData); // Emit event to all connected clients
//     res.send("Event triggered successfully");
// });

export default app;
