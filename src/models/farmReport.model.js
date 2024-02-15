const { Schema, model } = require("mongoose");

const farmReportSchema = new Schema(
    {
        importDate: {
            type: Date,
            required: true,
        },
        exportDate: {
            type: Date,
            required: true,
        },
        totalChicks: {
            type: Number,
            required: true,
        },
        removedChick: {
            type: Number,
        },
        foodStock: {
            type: String,
        },
        medicineOne: {
            type: String,
        },
        medicineTwo: {
            type: String,
        },
        isAcknowledged: {
            type: Boolean,
            default: false,
            required: true,
        },
        farmer: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        farm: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Farm",
        },
    },
    { timestamps: true }
);

const FarmReport = model("FarmReport", farmReportSchema);

module.exports = FarmReport;
