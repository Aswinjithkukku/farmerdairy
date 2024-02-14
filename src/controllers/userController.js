const jwt = require("jsonwebtoken");
const catchAsyncError = require("../utils/catchAsyncError");
const User = require("../models/user.model");
const AppError = require("../utils/appError");
const {
    userSignInSchema,
    userSignUpSchema,
    updateUserSchema,
} = require("../validations/user.schema");

const signToken = (id) => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendCookie = (user, statusCode, res) => {
    const token = signToken(user._id);

    res.cookie("jwt", token, {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60),
        secure: false,
        httpOnly: true,
    });
    res.status(statusCode).json({
        status: "success",
        token: token,
        data: user,
    });
};

module.exports = {
    doUserSignup: catchAsyncError(async (req, res, next) => {
        const { _, error } = userSignUpSchema.validate(req.body);

        if (error) {
            return next(
                new AppError(error.details ? error?.details[0]?.message : error?.message, 400)
            );
        }

        const user = await User.create(req.body);

        if (!user) {
            return next(new AppError("User Signup failed. Please try again", 500));
        }

        createSendCookie(user, 201, res);
    }),

    doSignIn: catchAsyncError(async (req, res, next) => {
        const { email, password } = req.body;

        const { _, error } = userSignInSchema.validate(req.body);

        if (error) {
            return next(
                new AppError(error.details ? error?.details[0]?.message : error?.message, 400)
            );
        }

        let user = await User.findOne({ email: email }).select("+password");

        const isCorrect = await user.checkPasswordCorrect(password, user.password);

        if (!user || !isCorrect) {
            return next(new AppError("Invalid email or password.", 401));
        }

        createSendCookie(user, 200, res);
    }),

    myAccount: catchAsyncError(async (req, res, next) => {
        const user = await User.findById(req.user._id).populate("agent");

        if (!user) {
            return next(new AppError("Sorry no user found", 403));
        }

        res.status(200).json({
            status: "success",
            data: user,
        });
    }),

    listAgents: catchAsyncError(async (req, res, next) => {
        const agents = await User.find({ role: "agent" }).select("name email gender");

        res.status(200).json({
            status: "success",
            data: agents,
        });
    }),

    updateUser: catchAsyncError(async (req, res, next) => {
        const { _, error } = updateUserSchema.validate(req.body);

        if (error) {
            return next(
                new AppError(error.details ? error?.details[0]?.message : error?.message, 400)
            );
        }

        const user = await User.findByIdAndUpdate(req.user._id, req.body, {
            new: true,
            runValidators: true,
        })
            .select("-__v -createdAt -updatedAt")
            .populate("agent");

        res.status(200).json({
            status: true,
            data: user,
        });
    }),
};
