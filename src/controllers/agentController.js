const FarmReport = require("../models/farmReport.model");
const Transaction = require("../models/transactions.model");
const AppError = require("../utils/appError");
const catchAsyncError = require("../utils/catchAsyncError");
const { createTransactionSchema } = require("../validations/agent.schema");

module.exports = {
    getReportsToday: catchAsyncError(async (req, res, next) => {
        const today = new Date();
        const dayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        const report = await FarmReport.findOne({
            farmer: req.params.id,
            createdAt: { $gt: dayStart },
        }).lean();

        if (!report) {
            return next(new AppError("There is no report found today", 404));
        }

        res.status(200).json({
            status: "success",
            data: report,
        });
    }),
    acknowledgeReport: catchAsyncError(async (req, res, next) => {
        const report = await FarmReport.findByIdAndUpdate(
            req.params.id,
            { isAcknowledged: true },
            {
                new: true,
            }
        );

        if (!report) {
            return next(new AppError("There is no report found", 404));
        }

        res.status(200).json({
            status: "success",
            data: report,
        });
    }),

    createTradeToFarmer: catchAsyncError(async (req, res, next) => {
        const { _, error } = createTransactionSchema.validate(req.body);

        if (error) {
            return next(
                new AppError(error.details ? error?.details[0]?.message : error?.message, 400)
            );
        }

        const transaction = await Transaction.create({ ...req.body, agent: req.user._id });

        if (!transaction) {
            return next(new AppError("Create transaction failed", 500));
        }

        res.status(201).json({
            status: "success",
            message: "Transaction created successfully!",
            data: transaction,
        });
    }),
};
