const crypto = require("crypto");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

const sendEmail = require("../utils/sendMail");

//@desc register new user
//@route POST /api/auth
//@access Protected
exports.register = async (request, response, next) => {
  const { name, email, phone, permission } = await request.body;
  try {
    const user = await User.create({
      name,
      email,
      phone,
      permission,
    });

    inviteToken = user.getInviteToken();

    await user.save();

    const inviteUrl = `${process.env.URL}/newaccount/${inviteToken}`;

    try {
      await sendEmail({
        to: user.email,
        subject: "Setup your account",
        template: "admin-invite",
        templateVars: {
          userName: user.name,
          inviteLink: inviteUrl,
        },
      });

      sendToken(user, 201, response);
    } catch (error) {
      await User.deleteOne({ _id: user._id });
      return next(new ErrorResponse("There was an error adding admin", 500));
    }
  } catch (error) {
    next(error);
  }
};

exports.newaccount = async (request, response, next) => {
  const inviteToken = crypto
    .createHash("sha256")
    .update(request.params.inviteToken)
    .digest("hex");

  const { password, passwordConfirmation } = request.body;

  if (password !== passwordConfirmation) {
    return next(new ErrorResponse("Passwords mismatch", 400));
  }

  try {
    const user = await User.findOne({
      inviteToken,
      // resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(
        new ErrorResponse(
          "This invitation link isn't valid. Perhaps you already used it?",
          400
        )
      );
    }

    user.password = password;
    user.inviteToken = undefined;
    await user.save();
    return response.status(201).json({
      status: "success",
      message: "Account activated successfully",
      user,
    });
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

    const resetUrl = `${process.env.URL}/resetpassword/${resetToken}`;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset",
        template: "password-reset",
        templateVars: {
          resetLink: resetUrl,
        },
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

  const { password, passwordConfirmation } = request.body;
  if (password !== passwordConfirmation) {
    return next(new ErrorResponse("Passwords mismatch", 400));
  }
  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(
        new ErrorResponse("Password Reset link Expired try a new request", 400)
      );
    }

    user.password = password;
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
