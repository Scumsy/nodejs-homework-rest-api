const { User } = require("../../models/user");
const bcrypt = require("bcrypt");

const { HttpError } = require("../../helpers/HttpError");
const { schemaValidationUser } = require("../../schemas/index");

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

    const { error, value } = schemaValidationUser.validate(req.body);
    if (!error && value) {
      const newUser = await User.create({
        ...req.body,
        password: hashPassword,
      });
      res.status(201).json({
        email: newUser.email,
      });
    } else {
      res.status(400).json({
        message: error.message,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(error.status).json(error.message);
  }
}

module.exports = registerUser;
