const Contact = require("../../models/contact");

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

module.exports = getContactByID;
