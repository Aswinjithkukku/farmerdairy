const { isValidObjectId } = require("mongoose");
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const User = require("../models/user.model");
const AppError = require("../utils/appError");
const catchAsyncError = require("../utils/catchAsyncError");

module.exports = {
    // Chat controllers.
    accessChat: catchAsyncError(async (req, res, next) => {
        const { userId } = req.params;

        if (!isValidObjectId(userId)) {
            return next(new AppError("Invalid chat ID. Please try again", 400));
        }

        var chat;

        chat = await Chat.findOne({
            $and: [
                { users: { $elemMatch: { $eq: req.user._id } } },
                { users: { $elemMatch: { $eq: userId } } },
            ],
        })
            .populate("users")
            .populate("latestMessage");

        chat = await User.populate(chat, {
            path: "latestMessage.sender",
            select: "name email phoneNumber",
        });

        if (!chat) {
            chat = await Chat.create({
                chatName: "sender",
                users: [req.user._id, userId],
            }).then((data) => data.populate("users"));
        }

        res.status(200).json({
            status: "success",
            data: chat,
        });
    }),

    fetchChats: catchAsyncError(async (req, res, next) => {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "name email phoneNumber",
                });

                res.status(200).json({
                    status: "success",
                    data: results,
                });
            });
    }),

    // Message controllers.
    allMessages: catchAsyncError(async (req, res, next) => {
        const messages = await Message.find({ chat: req.params.chatId })
            .populate("sender", "name email phoneNumber")
            .populate("chat");

        res.status(200).json({
            status: "success",
            data: messages,
        });
    }),

    sendMessage: catchAsyncError(async (req, res, next) => {
        const { content } = req.body;
        const { chatId } = req.params;

        if (!content) {
            return next(new AppError("Invalid data pass to request", 400));
        }

        if (!isValidObjectId(chatId)) {
            return next(new AppError("Invalid chat ID. Please try again", 400));
        }

        var message = await Message.create({
            sender: req.user._id,
            content: content,
            chat: chatId,
        });

        await message.populate("sender", "name email phoneNumber");
        await message.populate("chat");

        message = await User.populate(message, {
            path: "chat.users",
            select: "name email phoneNumber",
        });
        console.log(message);

        await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

        res.status(201).json({
            status: "success",
            data: message,
        });
    }),
};
