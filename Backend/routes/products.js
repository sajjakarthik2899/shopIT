import express from "express";
import { createProduct, findProduct, findProductAndDelete, findProductAndUpdate, getProducts } from "../controller/productsController.js";

const router = express.Router();

router.route("/products").get(getProducts);
router.route("/products/:id").get(findProduct);
router.route("/products/:id").put(findProductAndUpdate);
router.route("/products/:id").delete(findProductAndDelete);
router.route("/admin/product").post(createProduct);
export default router;