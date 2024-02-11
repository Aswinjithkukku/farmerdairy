const { promisify } = require("util");
const AppError = require("../utils/appError");
const catchAsyncError = require("../utils/catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports = catchAsyncError(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(new AppError("Please login to get access.", 401));
    }

    // verifying token.
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
        return next(new AppError("The token belonging to this user doesnot exist.", 401));
    }

    req.user = user;
    next();
});
