const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config({
    path: path.join(__dirname, "../.env"),
});

const AppError = require("./utils/appError");
const globalErrorHandler = require("./utils/globalErrorHandler");

const userRouter = require("./routes/userRouter");
const farmerRouter = require("./routes/farmerRouter");

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(
    express.urlencoded({
        extended: true,
        limit: "50mb",
    })
);
app.use(cors());
app.use("/public", express.static("public"));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/farmer", farmerRouter);

app.get("/hello", async (req, res) => {
    try {
        res.status(200).json({ message: "success" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});

app.use(globalErrorHandler);

module.exports = { app };
