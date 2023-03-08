const express = require("express");

const router = express.Router();

const {
  getContacts,
  getContact,
  addNewContact,
  deleteContact,
  editContact,
} = require("../../controllers/controllers");

router.get("/", getContacts);
router.get("/:contactId", getContact);
router.post("/", addNewContact);
router.delete("/:contactId", deleteContact);
router.put("/:contactId", editContact);

module.exports = router;
