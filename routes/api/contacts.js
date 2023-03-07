const express = require("express");

const router = express.Router();

const Joi = require("joi");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res) => {
  res.status(200).json(await listContacts());
});

router.get("/:contactId", async (req, res) => {
  const contact = await getContactById(req.params.contactId);
  if (contact.length >= 1) {
    res.status(200).json(contact);
  } else {
    res.json({
      code: 404,
      message: "Not found",
    });
  }
});

router.post("/", async (req, res) => {
  const { name, email, phone } = req.body;

  if (name && email && phone) {
    const newContact = await addContact(name, email, phone);

    const shema = Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().min(5).max(14).required(),
    });

    const { error, value } = shema.validate(newContact);

    if (error) {
      console.log(error.message);
    }

    if (!error && value) {
      res.status(201).json(value);
    } else {
      res.status(404).json({
        message: "Not found",
      });
    }
  } else {
    res.status(400).json({
      status: "fail",
      code: 400,
      message: "missing required name field",
    });
  }
});

router.delete("/:contactId", async (req, res) => {
  const deletedContact = await removeContact(req.params.contactId);
  if (deletedContact.length >= 1) {
    res.status(200).json({
      message: `contact deleted`,
    });
  } else {
    res.json({
      code: 404,
      message: "Not found",
    });
  }
});

router.put("/:contactId", async (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "missing fields",
    });
  } else {
    const contacts = await updateContact(req.params.contactId, req.body);
    const shema = Joi.object({
      id: Joi.string(),
      name: Joi.string(),
      email: Joi.string().email(),
      phone: Joi.string().min(5).max(14),
    }).required();

    const { error, value } = shema.validate(contacts);

    if (error) {
      console.log(error.message);
    }

    if (!error && value) {
      res.status(200).json(value);
    } else {
      res.status(404).json({
        message: "Not found",
      });
    }
  }
});

module.exports = router;
