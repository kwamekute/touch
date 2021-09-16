const express = require("express");
const router = express.Router();
const {
  register,
  login,
  forgotpassword,
  resetpassword,
  newaccount,
  getadmins,
} = require("../controllers/auth");
const { protect } = require("../middleware/auth");

router.route("/register").post(protect, register);

router.route("/admins").get(protect, getadmins);

router.route("/login").post(login);

router.route("/forgotpassword").post(forgotpassword);

router.route("/resetpassword/:resetToken").put(resetpassword);

router.route("/newaccount/:inviteToken").put(newaccount);

module.exports = router;
