const Joi = require("joi");

module.exports = {
    createTransactionSchema: Joi.object({
        amount: Joi.number().greater(0).required(),
        farmer: Joi.string().required(),
        farm: Joi.string().required(),
        isAcknowledged: Joi.boolean().required(),
        isComplete: Joi.boolean().required(),
    }),
};
