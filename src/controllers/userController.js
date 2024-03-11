const jwt = require("jsonwebtoken");
const catchAsyncError = require("../utils/catchAsyncError");
const User = require("../models/user.model");
const AppError = require("../utils/appError");
const {
    userSignInSchema,
    userSignUpSchema,
    updateUserSchema,
} = require("../validations/user.schema");

// This function is to generate token.
const signToken = (id) => {
    // assigning id of user and protect with secret key stored in .env file, and setting expiry time.
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

// This function is to set cookie and send user response.
const createSendCookie = (user, statusCode, res) => {
    // signtoken function written above are called and generted token here.
    const token = signToken(user._id);

    //setting cookie
    res.cookie("jwt", token, {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60),
        secure: false,
        httpOnly: true,
    });
    // sending response
    res.status(statusCode).json({
        status: "success",
        token: token,
        data: user,
    });
};

module.exports = {
    doUserSignup: catchAsyncError(async (req, res, next) => {
        // userSignUpSchema this is written in validation file of user.schema.js
        // the data given there is validated accordingly.
        // if the data recieved is correct it will pass. if any data is mismatched or wrong. it generate error
        const { _, error } = userSignUpSchema.validate(req.body);

        // if error found in validation. throwing error and return fro, this  function
        if (error) {
            return next(
                new AppError(error.details ? error?.details[0]?.message : error?.message, 400)
            );
        }

        if (req.body.role === "farmer") {
            const isAgent = await User.findOne({ role: "agent", _id: req.body.agent });
            if (!isAgent) {
                return next(new AppError("No agent found with this Id.", 404));
            }
        }

        // database operation. the data we pass are added to mongodb database.
        // User is table name &  create is a mongoose operation to add a data to user table.
        const user = await User.create(req.body);

        // if user is created the user variable will contain user data.
        //else if no user found in the user variable. that means the create method in mongodb fails.
        // So return from function and throw an error.
        if (!user) {
            return next(new AppError("User Signup failed. Please try again", 500));
        }

        // This function is written above.
        createSendCookie(user, 201, res);
    }),

    doSignIn: catchAsyncError(async (req, res, next) => {
        // Taking body which we pass from frontend.
        const { email, password } = req.body;

        // validating the body and if any error occur return from function and throw error.
        const { _, error } = userSignInSchema.validate(req.body);

        if (error) {
            return next(
                new AppError(error.details ? error?.details[0]?.message : error?.message, 400)
            );
        }

        // findOne is momngoose operation that find the data from database with the condition matches.
        // here we added email is found in table.
        let user = await User.findOne({ email: email }).select("+password");

        // checking the psssword given and password stored in database are the same.
        // user.checkPasswordCorrect is written in models/user.model.js file.
        const isCorrect = await user.checkPasswordCorrect(password, user.password);

        // if not correct or user is not found we throw error.
        if (!user || !isCorrect) {
            return next(new AppError("Invalid email or password.", 401));
        }

        // function written above of this file
        createSendCookie(user, 200, res);
    }),

    myAccount: catchAsyncError(async (req, res, next) => {
        // Finding the user with logged user id.
        // populate agent means - if the user is farmer then there will be agent id with it.
        // with populate method we can make that id as the full details of that agent. similiar of leftjoin used in sequalise database.
        const user = await User.findById(req.user._id).populate("agent");

        // if no user found throws error.
        if (!user) {
            return next(new AppError("Sorry no user found", 403));
        }

        // sending response.
        res.status(200).json({
            status: "success",
            data: user,
        });
    }),

    listAgents: catchAsyncError(async (req, res, next) => {
        // listing all agents present user table.
        // finding with role  === agent
        // select method is used to take only name, email, gender and _id as default.
        const agents = await User.find({ role: "agent" }).select("name email gender");

        res.status(200).json({
            status: "success",
            data: agents,
        });
    }),

    updateUser: catchAsyncError(async (req, res, next) => {
        // similiar validations as wirtten above.
        const { _, error } = updateUserSchema.validate(req.body);

        if (error) {
            return next(
                new AppError(error.details ? error?.details[0]?.message : error?.message, 400)
            );
        }

        // findByIdAndUpdate is the method . first argument should be id which we have to find from that table.
        // second argument should be the data to be updated and third would be additional options.
        //  new : true is added because to return back the updated data. else it return previous data before update affect.
        // runValidators is for checking all validation in the model are checked.
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

    fetchUsers: catchAsyncError(async (req, res, next) => {
        const keyword = req.query.search
            ? {
                  $or: [
                      { name: { $regex: req.query.search, $options: "i" } },
                      { email: { $regex: req.query.search, $options: "i" } },
                  ],
              }
            : {};

        const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
        res.status(200).json({
            status: true,
            data: users,
        });
    }),
};
