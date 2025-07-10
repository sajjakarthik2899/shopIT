import express from "express";
import { allUsers, deleteUser, getUserDetails, getUserProfile, loginUser, logoutUser, registerUser, updatePassword, updateProfile, updateUserDetails } from "../controller/authController.js";
import { authorizeRoles, forgotPassword, isAuthenticatedUser, resetPassword } from "../middlewares/auth.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.route("/myprofile").get(isAuthenticatedUser, getUserProfile);
router.route("/myprofile/update").put(isAuthenticatedUser, updateProfile)
router.route("/password/update").put(isAuthenticatedUser, updatePassword)
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles('admin'),allUsers)
router.route("/admin/users/:id").get(isAuthenticatedUser, authorizeRoles('admin') ,getUserDetails)
router.route("/admin/users/:id").put(isAuthenticatedUser, authorizeRoles('admin') ,updateUserDetails)
router.route("/admin/users/:id").delete(isAuthenticatedUser, authorizeRoles('admin') ,deleteUser)
export default router;