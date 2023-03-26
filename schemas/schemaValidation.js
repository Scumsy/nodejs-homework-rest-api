const Joi = require("joi");

// const schemaValidationAddContact = Joi.object({
//   name: Joi.string().required().messages({ "any.required": "Invalid name" }),

//   email: Joi.string()
//     .email({
//       minDomainSegments: 2,
//       tlds: { allow: ["com", "net"] },
//     })
//     .required()
//     .messages({ "any.required": "Invalid email" }),

//   phone: Joi.string().min(5).max(14).required(),

//   favorite: Joi.boolean(),
// });

// const schemaValidationEditContact = Joi.object({
//   name: Joi.string().messages({ "any.required": "Invalid name" }),

//   email: Joi.string()
//     .email({
//       minDomainSegments: 2,
//       tlds: { allow: ["com", "net"] },
//     })

//     .messages({ "any.required": "Invalid email" }),

//   phone: Joi.string().min(5).max(14),

//   favorite: Joi.boolean(),
// });

// const schemaValidationUser = Joi.object({
//   password: Joi.string().min(6).required(),
//   email: Joi.string().required(),
// });

// module.exports = {
//   schemaValidationAddContact,
//   schemaValidationEditContact,
//   schemaValidationUser,
// };
