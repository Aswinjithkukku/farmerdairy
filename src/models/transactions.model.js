const { Schema, model } = require("mongoose");

const transationSchema = new Schema(
    {
        amount: {
            type: Number,
            required: [true, "Provide amount of transaction."],
        },
        agent: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        farmer: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        farm: {
            type: Schema.Types.ObjectId,
            ref: "Farm",
            required: true,
        },
        isAcknowledged: {
            type: Boolean,
            default: false,
            required: true,
        },
        isComplete: {
            type: Boolean,
            default: false,
            required: true,
        },
    },
    { timestamps: true }
);

const Transaction = model("Transaction", transationSchema);

module.exports = Transaction;
