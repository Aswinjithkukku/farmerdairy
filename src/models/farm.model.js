const { Schema, model } = require("mongoose");

const farmSchema = new Schema(
    {
        area: {
            type: String,
            required: true,
        },
        farmer: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    },
    { timestamps: true }
);

const Farm = model("Farm", farmSchema);

module.exports = Farm;
