const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "please provide a name"],
  },

  email: {
    type: String,
    trim: true,
    required: [true, "please provide a email address"],
    unique: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },

  password: {
    type: String,
    minlength: 6,
    select: false,
  },

  phone: {
    type: String,
    required: [true, "Please provide phone number"],
    minlength: 10,
  },

  avartar: {
    type: String,
    default: null,
  },

  inviteToken: {
    type: String,
    default: null,
  },

  permission: {
    type: String,
    default: "Admin",
    required: [true, "Please provide user permission"],
  },

  resetPasswordToken: {
    type: String,
    default: null,
  },
  resetPasswordExpire: { type: Date, default: null },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

  return resetToken;
};

UserSchema.methods.getInviteToken = function () {
  const token = crypto.randomBytes(20).toString("hex");

  this.inviteToken = crypto.createHash("sha256").update(token).digest("hex");

  return token;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
