import express from "express";
import { createOrUpdateReview, createProduct, deleteMyReview, findProduct, findProductAndDelete, findProductAndUpdate, getProductReviews, getProducts } from "../controller/productsController.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.route("/products").get(getProducts);
router.route("/products/:id").get(findProduct);
router.route("/products/:id").put(isAuthenticatedUser, authorizeRoles('admin'), findProductAndUpdate);
router.route("/products/:id").delete(isAuthenticatedUser, authorizeRoles('admin'), findProductAndDelete);
router.route("/admin/product").post(isAuthenticatedUser, authorizeRoles('admin'), createProduct);
router.route("/review/product/:id").put(isAuthenticatedUser, createOrUpdateReview);
router.route("/getallreviews").get(getProductReviews);
router.route("removereview").delete(isAuthenticatedUser, deleteMyReview)
export default router;