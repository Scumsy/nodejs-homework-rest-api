const Contact = require("../../models/contact");

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

module.exports = deleteContact;
