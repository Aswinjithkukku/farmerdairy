const { Schema, model } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name cannot be empty."],
            minlength: [4, "Name must have minimum 4 characters"],
        },
        email: {
            type: String,
            required: [true, " Email cannot be empty."],
            unique: true,
            lowercase: true,
            trim: true,
            validate: [validator.isEmail, "Please provide a valid email"],
        },
        phoneNumber: {
            type: Number,
            validate: {
                validator: function (value) {
                    return /^\d{10}$/.test(value);
                },
                message: "Phone Number must have exactly 10 digits.",
            },
        },
        admissionNumber: {
            type: Number,
        },
        admissionYear: {
            type: Number,
        },
        avatar: {
            type: String,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        password: {
            type: String,
            required: [true, "Provide password."],
            minlength: [4, "Password must contain 4 characters."],
            select: false,
        },
        confirmPassword: {
            type: String,
            required: [true, "Provide confirm password."],
            validate: {
                validator: function (value) {
                    return value === this.password;
                },
                message: "Passwords are not the same!",
            },
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmPassword = undefined;
    next();
});

// check for correct password.
userSchema.methods.checkPasswordCorrect = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = model("User", userSchema);

module.exports = User;
