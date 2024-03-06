const Message = require("../models/messageModel");
const Transaction = require("../models/transactions.model");
const AppError = require("../utils/appError");
const catchAsyncError = require("../utils/catchAsyncError");
const { createTransactionSchema } = require("../validations/agent.schema");

module.exports = {
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

        if (!content) {
            return next(new AppError("Invalid data pass to request", 400));
        }

        if (!isValidObjectId(req.params.chatId)) {
            return next(new AppError("Invalid chat ID. Please try again", 400));
        }
    }),
};
