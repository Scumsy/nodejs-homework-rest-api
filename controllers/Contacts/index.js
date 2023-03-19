const getContacts = require("./getContacts");
const getContactByID = require("./getContactByID");
const addNewContact = require("./addNewContact");
const deleteContact = require("./deleteContact");
const editContact = require("./editContact");
const updateStatusContact = require("./updateStatusContact");

module.exports = {
  getContacts,
  getContactByID,
  deleteContact,
  editContact,
  addNewContact,
  updateStatusContact,
};
