const { User } = require("../../models/user");

const logoutUser = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.json({ message: "Logout success" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = logoutUser;
