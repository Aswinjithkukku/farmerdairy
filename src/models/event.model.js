const { Schema, model } = require("mongoose");

//title, descrioption, images, date, location
const eventSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Must provide title for the event."],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Must provide description for the event"],
        },
        eventDate: {
            type: Date,
            required: [true, "Must provide date for the event"],
        },
        location: {
            type: String,
            required: [true, "Must provide loaction of the event happening."],
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Event must be registered by an individual."],
        },
        isApproved: {
            type: Boolean,
            required: true,
            default: false,
        },
        isRejected: {
            type: Boolean,
            required: true,
            default: false,
        },
        images: {
            type: [
                {
                    isApproved: {
                        type: Boolean,
                        required: true,
                        default: false,
                    },
                    image: {
                        type: String,
                        required: true,
                    },
                },
            ],
        },
    },
    { timestamps: true }
);

const Event = model("Event", eventSchema);

module.exports = Event;
