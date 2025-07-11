import express from "express";
import { allUsers, deleteUser, getUserDetails, getUserProfile, loginUser, logoutUser, registerUser, updatePassword, updateProfile, updateUserDetails } from "../controller/authController.js";
import { authorizeRoles, forgotPassword, isAuthenticatedUser, resetPassword } from "../middlewares/auth.js";
import { stripeCheckoutSession } from "../controller/paymentController.js";

const router = express.Router();

router.route("/payment/checkout_session").post(isAuthenticatedUser, stripeCheckoutSession);
export default router;