import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
      maxLength: [50, "Your name cannot exceed 50 character"]
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String
      },
      url: {
        type: String
      },
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    resetPasswordToken: String,
    resetPasswordExpired: Date
  },
  {
    timestamps: true,
  }
);
// encrypting before saving it into the DB
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})
userSchema.methods.getJwtToken = function() {
    return jwt.sign({ id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}
export default mongoose.model("User", userSchema);
