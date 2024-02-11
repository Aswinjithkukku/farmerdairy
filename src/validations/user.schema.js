const joi = require("joi");

module.exports = {
    // User signup validation.
    userSignUpSchema: joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
        confirmPassword: joi.string().required(),
    }),

    // User login validation.
    userSignInSchema: joi.object({
        email: joi.string().email().required(),
        password: joi.string().required(),
    }),

    // Update user
    updateMeSchema: joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        phoneNumber: joi.number(),
        admissionNumber: joi.number(),
        admissionYear: joi.number(),
        avatar: joi.string().allow("", null),
    }),
};
