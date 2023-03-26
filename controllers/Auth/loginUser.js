const { User } = require("../../models/user");
const bcrypt = require("bcrypt");
const { HttpError } = require("../../helpers/HttpError");
const jwt = require("jsonwebtoken");
const { schemaValidationUser } = require("../../schemas");
const { SECRET_KEY } = process.env;

const loginUser = async (req, res) => {
  try {
    const { error } = schemaValidationUser.validate(req.body);
    const { email, password } = req.body;

    if (error) {
      throw HttpError(404, "missing or incorrect required field");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password invalid");
    }

    const passswordCompare = await bcrypt.compare(password, user.password);
    if (!passswordCompare) {
      throw HttpError(401, "Email or password invalid");
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    await User.findByIdAndUpdate(user._id, { token });
    res.status(200).json({
      token: token,
      user: {
        email: email,
        subscription: "starter",
      },
    });
  } catch (error) {
    console.log(error);
    res.status(error.status).json(error.message);
  }
};

module.exports = loginUser;
