import catchAsyncError from "../middlewares/catchAsyncError.js";
import users from "../models/users.js";
import ErrorHandler from "../utils/errorHandler.js";

export const registerUser = catchAsyncError(async (req, res, next) => {
    const {name, email, password} = req.body;

    const user = await users.create({
        name, email, password
    })
    const token = user.getJwtToken()
    res.status(201).json({
        token
    });
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

    const token = user.getJwtToken()
    res.status(200).json({
        token
    });
}); 