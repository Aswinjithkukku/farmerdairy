const Joi = require("joi");

module.exports = {
    farmerReportSubmitSchema: Joi.object({
        importDate: Joi.date().min(new Date()).required(),
        exportDate: Joi.date().min(new Date()).required(),
        totalChicks: Joi.number().required(),
        removedChick: Joi.number().required(),
        foodStock: Joi.string().required(),
        medicineOne: Joi.string().required(),
        medicineTwo: Joi.string().required(),
    }),
};
