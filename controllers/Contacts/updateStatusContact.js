const Contact = require("../../models/contact");

const Joi = require("joi");

async function updateStatusContact(req, res) {
  const id = req.params.contactId;
  const { favorite } = req.body;
  if (!req.body) {
    res.status(400).json({
      message: "missing field favorite",
    });
  } else {
    const schema = Joi.object({
      favorite: Joi.boolean().required(),
    });
    const { error, value } = schema.validate(req.body);
    if (!error && value) {
      const updateStatus = await Contact.findOneAndUpdate(
        { _id: id },
        { favorite }
      );
      console.log(updateStatus);
      return res.status(200).json(updateStatus);
    } else {
      res.status(400).json({
        message: error.message,
      });
    }
  }
}

module.exports = updateStatusContact;
