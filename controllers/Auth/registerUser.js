const { User } = require("../../models/user");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { HttpError, sendEmail } = require("../../helpers/index");
const { schemaValidationUser } = require("../../schemas/index");
const { v4: uuidv4 } = require("uuid");

const { BASE_URL } = process.env;

async function registerUser(req, res) {
  try {
    const validationResult = schemaValidationUser.validate(req.body);
    const { email, password } = req.body;

    if (validationResult.error) {
      throw HttpError(404, "missing or incorrect required field");
    }
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      throw HttpError(409, "Email already exist");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationCode = uuidv4();

    const newUser = await User.create({
      email,
      password: hashPassword,
      avatarURL,
      verificationCode,
    });

    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a target= "_blank"href="${BASE_URL}/api/users/verify/${verificationCode}">Confirm email </a>`,
    };

    await sendEmail(verifyEmail);

    res.status(201).json({
      email: newUser.email,
      avatarURL,
    });
  } catch (error) {
    console.log(error);
    res.status(error.status).json(error.message);
  }
}

module.exports = registerUser;
