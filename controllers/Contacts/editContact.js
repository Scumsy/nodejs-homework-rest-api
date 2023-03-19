const Contact = require("../../models/contact");

const {
  schemaValidationEditContact,
} = require("../../schemas/schemaValidation");

async function editContact(req, res) {
  const id = req.params.contactId;
  const { name, email, phone, favorite } = req.body;
  if (!req.body) {
    res.status(400).json({
      message: "missing fields",
    });
  } else {
    const { error, value } = schemaValidationEditContact.validate(req.body);

    if (!error && value) {
      await Contact.findOneAndUpdate(
        { _id: id },
        { name, email, phone, favorite }
      );
      res.status(200).json(value);
    } else {
      res.status(400).json({
        message: error.message,
      });
    }
  }
}

module.exports = editContact;
