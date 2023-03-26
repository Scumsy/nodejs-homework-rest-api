const Joi = require("joi");

const schemaValidationEditContact = Joi.object({
  name: Joi.string().messages({ "any.required": "Invalid name" }),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })

    .messages({ "any.required": "Invalid email" }),

  phone: Joi.string().min(5).max(14),

  favorite: Joi.boolean(),
});

module.exports = schemaValidationEditContact;
