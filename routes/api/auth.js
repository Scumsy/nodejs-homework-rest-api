const express = require("express");
const { authenticate, upload } = require("../../middlewares/index");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
} = require("../../controllers/Auth/index");

router.post("/register", registerUser);
router.get("/verify/:verificationCode", verifyEmail);
router.post("/verify", resendVerifyEmail);
router.post("/login", loginUser);
router.get("/current", authenticate, getCurrentUser);
router.post("/logout", authenticate, logoutUser);
router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

module.exports = router;
