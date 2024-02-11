process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception");
    console.log(err.name, err.message);
    console.log(err);
    process.exit(1);
});

const { app } = require("./app");
const { connectMongoDB } = require("./config/dbConfig");

const PORT = process.env.PORT || 8000;

connectMongoDB();

const server = app.listen(PORT, () => {
    console.log(`server is up and running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
    console.log(err.name, err.message);
    console.log("Unhandled Rejections!");
    server.close(() => {
        process.exit(1);
    });
});
