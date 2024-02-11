const mongoose = require("mongoose");

const mongoUrl = process.env.MONGODB_URL;

const connectMongoDB = async () => {
    try {
        mongoose.connect(mongoUrl);

        mongoose.connection.on("connected", () => {
            console.log("Database connected successfully.");
        });

        mongoose.connection.on("disconnected", () => {
            console.log("Database disconnected");
            return;
        });
    } catch (error) {
        throw error;
    }
};

module.exports = { connectMongoDB };
