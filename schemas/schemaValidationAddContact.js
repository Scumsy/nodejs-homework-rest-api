const Joi = require("joi");

const schemaValidationAddContact = Joi.object({
  name: Joi.string().required().messages({ "any.required": "Invalid name" }),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required()
    .messages({ "any.required": "Invalid email" }),

  phone: Joi.string().min(5).max(14).required(),

  favorite: Joi.boolean(),
});

module.exports = schemaValidationAddContact;
