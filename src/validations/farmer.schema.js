const Joi = require("joi");

const today = new Date();
const dayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

module.exports = {
    farmerReportSubmitSchema: Joi.object({
        importDate: Joi.date().required(),
        exportDate: Joi.date().min(dayStart).required(),
        totalChicks: Joi.number().required(),
        removedChick: Joi.number().required(),
        foodStock: Joi.string().required(),
        medicineOne: Joi.string().allow("", null),
        medicineTwo: Joi.string().allow("", null),
    }),
};
