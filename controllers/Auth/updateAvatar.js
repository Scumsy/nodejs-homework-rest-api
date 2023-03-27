const path = require("path");
const fs = require("fs/promises");
const { User } = require("../../models/user");
const { HttpError } = require("../../helpers/index");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", filename);

    Jimp.read(avatarURL)
      .then((avatar) => {
        console.log("jimp worked");

        return avatar.resize(250, 250).write(resultUpload);
      })
      .catch((err) => {
        console.error(err);
      });

    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({ avatarURL });
  } catch (error) {
    throw HttpError(401, error.message);
  }
};

module.exports = updateAvatar;
