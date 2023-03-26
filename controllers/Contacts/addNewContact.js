const Contact = require("../../models/contact");

const { schemaValidationAddContact } = require("../../schemas/index");

async function addNewContact(req, res) {
  try {
    const { _id: owner } = req.user;
    const { name, email, phone, favorite } = req.body;
    const { error, value } = schemaValidationAddContact.validate(req.body);
    if (!error && value) {
      await Contact.create({ name, email, phone, favorite, owner });
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
