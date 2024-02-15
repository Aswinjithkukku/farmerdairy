const Farm = require("../models/farm.model");
const FarmReport = require("../models/farmReport.model");
const Transaction = require("../models/transactions.model");
const AppError = require("../utils/appError");
const catchAsyncError = require("../utils/catchAsyncError");
const { farmerReportSubmitSchema } = require("../validations/farmer.schema");

module.exports = {
    listFarms: catchAsyncError(async (req, res, next) => {
        const farms = await Farm.find({ farmer: req.user._id }).lean();

        res.status(200).json({
            status: "success",
            data: farms,
        });
    }),

    createFarmData: catchAsyncError(async (req, res, next) => {
        const { area } = req.body;

        if (!area) {
            return next(new AppError("Area of farm cannot be empty", 400));
        }

        const farm = await Farm.create({ area: area, farmer: req.user._id });

        res.status(200).json({
            status: "success",
            data: farm,
        });
    }),

    updateFarmData: catchAsyncError(async (req, res, next) => {
        const { area } = req.body;

        if (!area) {
            return next(new AppError("Area of farm cannot be empty", 400));
        }

        const farm = await Farm.findByIdAndUpdate(
            req.params.id,
            { area: area, farmer: req.user._id },
            {
                new: true,
                runValidators: true,
                upsert: true,
            }
        );

        res.status(200).json({
            status: "success",
            data: farm,
        });
    }),

    createFarmReport: catchAsyncError(async (req, res, next) => {
        const { _, error } = farmerReportSubmitSchema.validate(req.body);

        if (error) {
            return next(
                new AppError(error.details ? error?.details[0]?.message : error?.message, 400)
            );
        }

        const report = await FarmReport.create({
            ...req.body,
            farmer: req.user._id,
            farm: req.params.id,
        }).populate("farmer farm");

        if (!report) {
            return next(new AppError("Creating record failed.", 500));
        }

        res.status(201).json({
            status: "success",
            data: report,
        });
    }),

    listFarmReports: catchAsyncError(async (req, res, next) => {
        const reports = await FarmReport.find({
            farmer: req.user._id,
            farm: req.params.id,
        })
            .sort("createdAt")
            .lean();

        res.status(200).json({
            status: "success",
            data: reports,
        });
    }),

    listTransactions: catchAsyncError(async (req, res, next) => {
        const transaction = await Transaction.find({ farmer: req.user._id })
            .select("-__v -agent -farmer")
            .lean();

        res.status(200).json({
            status: "success",
            data: transaction,
        });
    }),
};
