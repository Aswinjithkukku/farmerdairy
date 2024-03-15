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

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: `http://localhost:${PORT}`,
        // credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    });

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });
});

process.on("unhandledRejection", (err) => {
    console.log(err.name, err.message);
    console.log("Unhandled Rejections!");
    server.close(() => {
        process.exit(1);
    });
});
