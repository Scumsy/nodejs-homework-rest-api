const Contact = require("../../models/contact");

const {
  schemaValidationAddContact,
} = require("../../schemas/schemaValidation");

async function addNewContact(req, res) {
  try {
    const { name, email, phone, favorite } = req.body;
    const { error, value } = schemaValidationAddContact.validate(req.body);
    if (!error && value) {
      await Contact.create({ name, email, phone, favorite });
      return res.status(201).json(value);
    } else {
      res.status(400).json({
        message: error.message,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = addNewContact;
