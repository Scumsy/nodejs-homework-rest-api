const express = require("express");

// const {validateBody} = require('middlewares')??????
const { schemaValidationUser } = require("../../schemas/index");
const { authenticate } = require("../../middlewares/index");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
} = require("../../controllers/Auth/index");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", authenticate, getCurrentUser);
router.post("/logout", authenticate, logoutUser);

module.exports = router;
