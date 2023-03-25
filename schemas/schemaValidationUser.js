const Joi = require("joi");

const schemaValidationUser = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
});

module.exports = schemaValidationUser;
