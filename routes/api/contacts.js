const express = require("express");

const router = express.Router();
const { authenticate } = require("../../middlewares/index");

const {
  getContacts,
  getContactByID,
  addNewContact,
  deleteContact,
  editContact,
  updateStatusContact,
} = require("../../controllers/Contacts/index");

router.get("/", authenticate, getContacts);
router.get("/:contactId", authenticate, getContactByID);
router.post("/", authenticate, addNewContact);
router.delete("/:contactId", authenticate, deleteContact);
router.put("/:contactId", authenticate, editContact);
router.patch("/:contactId", authenticate, updateStatusContact);

module.exports = router;
