const express = require("express");

const router = express.Router();

const {
  getContacts,
  getContactByID,
  addNewContact,
  deleteContact,
  editContact,
  updateStatusContact,
} = require("../../controllers/controllers");

router.get("/", getContacts);
router.get("/:contactId", getContactByID);
router.post("/", addNewContact);
router.delete("/:contactId", deleteContact);
router.put("/:contactId", editContact);
router.patch("/:contactId", updateStatusContact);

module.exports = router;
