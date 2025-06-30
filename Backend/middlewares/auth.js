import ErrorHandler from "../utils/errorHandler.js";
import User from "../models/users.js";
import jwt from "jsonwebtoken";
import catchAsyncError from "./catchAsyncError.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
// Checks if user is authenticated or not
export const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    console.log("🔐 isAuthenticatedUser middleware reached");

  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Login first to access this resource", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);

  next();
});

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`User role ${req.user.role} is not authorized to access this resource`, 403));
        }
    next();
    }
}
export const forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = user.getResetPasswordToken();
    console.log("resetToken", resetToken)
    await user.save({ validateBeforeSave: false });

    // const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const resetUrl = `http://localhost:3000/password-reset.html?token=${resetToken}`;

    const message = `Click the link to reset your password:\n\n${resetUrl}`;

    await sendEmail({
      email: user.email,
      subject: "Password Reset",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}`,
    });
  } catch (err) {
    console.error("🔥 Forgot Password Error:", err); // <--- IMPORTANT
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

export const resetPassword = async (req, res, next) => {
    console.log(req.params, "Reset req params")
    // Hash the token in the URL to match with DB
    const resetTokenHashed = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
    console.log("Hashed Token:", resetTokenHashed);
    const user = await User.findOne({
    resetPasswordToken: resetTokenHashed,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({ success: true, message: "Password reset successful" });
};

