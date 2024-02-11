const AppError = require("./appError");

const handleCastError = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
};

const handleDuplicateFieldError = (err) => {
    const message = `Duplicate field value: ${JSON.stringify(
        err.keyValue
    )}. Please use another value`;
    return new AppError(message, 400);
};

const handleValidationError = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data. ${errors.join(". ")}`;
    return new AppError(message, 400);
};

const handleJwtError = (err) => {
    return new AppError("Invalid token!! Please try again.", 401);
};

const handleJwtExpireError = (err) => {
    return new AppError("Your token has been expired. Please login again!.", 401);
};

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack,
    });
};

const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        console.error("ERROR", err);

        err.status(500).json({
            status: " error",
            message: "Something went wrong!!",
        });
    }
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    if (process.env.NODE_ENV === "development") {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === "production") {
        let error = { ...err };
        // handling cast error in db with unknown id
        if (error.name === "CastError") {
            error = handleCastError(error);
        }
        // handing duplicate field error in db
        if (error.code === 11000) {
            error = handleDuplicateFieldError(error);
        }
        // handling validation error in db
        if (error.name === "ValidationError") {
            error = handleValidationError(error);
        }
        // handling jwt error
        if (error.name === "JsonWebTokenError") {
            error = handleJwtError(error);
        }
        // handling jwt expiring error
        if (error.name === "TokenExpiredError") {
            error = handleJwtExpireError(error);
        }
        sendErrorProd(error, res);
    }
};
