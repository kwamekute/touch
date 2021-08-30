const crypto = require("crypto");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

const sendEmail = require("../utils/sendMail");

//@desc register new user
//@route POST /api/auth
//@access Protected
exports.register = async (request, response, next) => {
  const { name, email, password } = await request.body;
  try {
    const user = await User.create({
      name,
      email,
      password,
    });

    sendToken(user, 201, response);
  } catch (error) {
    next(error);
  }
};

//@desc login user
//@route POST /api/auth
//@access public
exports.login = async (request, response, next) => {
  const { email, password } = request.body;

  if (!email || !password) {
    return next(new ErrorResponse("provide email and password", 400));
  }
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }
    sendToken(user, 200, response);
  } catch (error) {
    next(error);
  }
};

//@desc send forgot Password request
//@route POST /api/auth/forgotpassword
//@access public
exports.forgotpassword = async (request, response, next) => {
  const { email } = await request.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("Email not sent", 404));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save();

    const resetUrl = `http://localhost:3000/resetpassword/${resetToken}`;

    const message = `
    <h1>Password Reset Request</h1>
    <p>Your are recieving this email beacause of a password reset request with your acount with us</p><br>
    <p>Please go to the link below to reset your password</p><br>
    <a href=${resetUrl} clicktracking=off>CLICK HERE</a>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset",
        text: message,
      });

      response.status(200).json({
        status: "success",
        message: "Email Sent Successfully",
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (error) {
    next(error);
  }
};

//@desc send forgot Password request
//@route POST /api/auth/forgotpassword
//@access public
exports.resetpassword = async (request, response, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(request.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Invalid reset token", 400));
    }

    user.password = request.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    return response.status(201).json({
      status: "success",
      message: "Password reset successful",
    });
  } catch (error) {
    next(error);
  }
};

//generate token function
const sendToken = (user, statusCode, response) => {
  const token = user.getSignedToken();
  response.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};
