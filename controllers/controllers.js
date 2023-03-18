const Joi = require("joi");
const {
  schemaValidationAddContact,
  schemaValidationEditContact,
} = require("../schemas/schemaValidation");

const Contact = require("../models/contact");

async function getContacts(req, res) {
  res.status(200).json(await Contact.find());
}

async function getContactByID(req, res) {
  try {
    const id = req.params.contactId;

    const contact = await Contact.findById({ _id: id });

    if (contact) {
      res.status(200).json(contact);
    } else {
      res.json({
        code: 404,
        message: "Not found",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
}

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

async function deleteContact(req, res) {
  const id = req.params.contactId;

  const deletedContact = await Contact.findOneAndRemove({ _id: id });

  if (deletedContact) {
    res.status(200).json({
      message: `contact deleted`,
    });
  } else {
    res.json({
      code: 404,
      message: "Not found",
    });
  }
}

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

module.exports = {
  getContacts,
  getContactByID,
  deleteContact,
  editContact,
  addNewContact,
  updateStatusContact,
};
