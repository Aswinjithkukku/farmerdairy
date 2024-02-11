const AppError = require("../utils/appError");

module.exports = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError("You dont have permission to access this action.", 403));
        }

        next();
    };
};
