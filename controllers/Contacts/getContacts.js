const Contact = require("../../models/contact");

async function getContacts(req, res) {
  res.status(200).json(await Contact.find());
}

module.exports = getContacts;
