const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const AppError = require("../utils/appError");
const catchAsyncError = require("../utils/catchAsyncError");
const { createTransactionSchema } = require("../validations/agent.schema");

module.exports = {
    // Chat controllers.
    accessChat : catchAsyncError(async(req, res, next) => {
        
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

        const message = await Message.create({
            sender: req.user._id,
            content: content,
            chat: chatId,
        }).then((msg) => {
            msg.populate("sender", "name email phoneNumber").populate("chat");
        });

        await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

        res.status(201).json({
            status: "success",
            data: message,
        });
    }),
};
