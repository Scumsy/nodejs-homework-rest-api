const Contact = require("../../models/contact");

async function getContacts(req, res) {
  const { favorite } = req.query;
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  if (favorite) {
    const result = await Contact.find({ owner, favorite: favorite });
    if (result.length >= 1) {
      res.json({
        status: "success",
        code: 200,
        data: {
          result,
        },
      });
    }
    res.status(404).json({
      status: "success",
      code: 404,
      message: "Not found",
    });
  }
  res.status(200).json(
    await Contact.find({ owner }, "-createdAt -updatedAt", {
      skip,
      limit,
    })
  );
}

module.exports = getContacts;
