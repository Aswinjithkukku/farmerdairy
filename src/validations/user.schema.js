const Joi = require("joi");

module.exports = {
    // User signup validation.
    userSignUpSchema: Joi.object({
        email: Joi.string().email().required(),
        role: Joi.string().required().valid("farmer", "agent"),
        agent: Joi.when("role", {
            is: "farmer",
            then: Joi.string().required(),
            otherwise: Joi.string().allow("", null),
        }),
        password: Joi.string().required(),
        confirmPassword: Joi.string().required(),
    }),

    // User login validation.
    userSignInSchema: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),

    // Update Farmer
    updateUserSchema: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phoneNumber: Joi.number(),
        gender: Joi.string().valid("male", "female", "other"),
        state: Joi.string().allow("", null),
        area: Joi.string().allow("", null),
    }),
};
