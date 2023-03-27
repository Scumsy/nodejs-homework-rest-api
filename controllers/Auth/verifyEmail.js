const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");

const verifyEmail = async (req, res) => {
  try {
    const { verificationCode } = req.params;

    const user = await User.findOne({ verificationCode });
    if (!user) {
      throw HttpError(404, "User not found");
    } else {
      await User.findByIdAndUpdate(user._id, {
        verified: true,
        verificationCode: "",
      });
      res.status(200).json({
        message: "Verification successful",
      });
    }
  } catch (error) {
    throw HttpError(error);
  }
};

module.exports = verifyEmail;
