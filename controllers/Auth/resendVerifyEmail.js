const { User } = require("../../models/user");
const { sendEmail, HttpError } = require("../../helpers/index");
const { BASE_URL } = process.env;

const Joi = require("joi");

const resendVerifyEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const schema = Joi.object({
      email: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      throw HttpError(404, error.message);
    }

    if (!email) {
      res.status(400).json({ message: "Missing required field email" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "There is no such user in the system" });
    }
    if (user.verified) {
      res.status(400).json({ message: "Verification has already been passed" });
    }

    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a target= "_blank"href="${BASE_URL}/api/users/verify/${user.verificationCode}">Confirm email </a>`,
    };

    await sendEmail(verifyEmail);

    res.status(200).json({
      message: "Verification email sent",
    });
  } catch (error) {
    throw HttpError(error);
  }
};

module.exports = resendVerifyEmail;
