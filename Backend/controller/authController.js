import catchAsyncError from "../middlewares/catchAsyncError.js";
import users from "../models/users.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";
import crypto from "crypto";

export const registerUser = catchAsyncError(async (req, res, next) => {
  console.log("Inside registerUser controller");
  const { name, email, password } = req.body;

  const user = await users.create({
    name,
    email,
    password,
  });

  sendToken(user, 201, res);
});
export const loginUser = catchAsyncError(async (req, res, next) => {
    const {email, password} = req.body;
    if( !email || !password){
        return next(new ErrorHandler("Please enter email and password", 400))
    }
    const user = await users.findOne({ email }).select("password")
    if(!user){
        return next(new ErrorHandler("Invalid email or password", 401))
    }
    const isPasswordMatched = await user.comparePassword(password)
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid password", 401))
    }

    sendToken(user, 200, res)
}); 
export const logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});
export const getUserProfile = catchAsyncError(async(req, res, next) => {
  console.log("Hi")
  const user = await users.findById(req?.user?._id)
  res.status(200).json({
    user
  })
})
// Update Password --> /api/v1/password/update
export const updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await users.findById(req?.user?._id).select("+password");
  console.log("user details", user)
  // Check the previous user password
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old Password is incorrect", 400));
  }

  user.password = req.body.password;
  await user.save();

  res.status(200).json({
    success: true,
  });
});
// Update User Profile  --> /api/v1/me/update
export const updateProfile = catchAsyncError(async (req, res, next) => {
  console.log(req, "HIIIIi")
  const newUserData = {
    name: req.body.name
  };

  const user = await users.findByIdAndUpdate(req.user._id, newUserData, {
    new: true,
  });

  res.status(200).json({
    user,
  });
});

// Get all Users – ADMIN  =>  /api/v1/admin/users
export const allUsers = catchAsyncError(async (req, res, next) => {
  const allusers = await users.find();

  res.status(200).json({
    allusers,
  });
});

// Get User Details – ADMIN  =>  /api/v1/admin/users/:id
export const getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await users.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User not found with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    user,
  });
});

// Update User Details – ADMIN => /api/v1/admin/users/:id
export const updateUserDetails = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await users.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
  });

  res.status(200).json({
    user,
  });
});

export const deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await users.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User not found with id: ${req.params.id}`, 404)
    );
  }

  // TODO – Remove user avatar from cloudinary

  await user.deleteOne();

  res.status(200).json({
    success: true,
  });
});


