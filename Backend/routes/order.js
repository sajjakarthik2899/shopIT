import express from "express";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";
import { createOrder, deleteOrder, getAllOrders, getMyOrders, getOrderDetails, updateOrder } from "../controller/orderController.js";

const router = express.Router();
router.route("/order/create").post(isAuthenticatedUser, authorizeRoles("admin"), createOrder);
router.route("/order/getOrderDetails/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getOrderDetails)
router.route("/order/getOrderDetails").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders)
router.route("/order/getuserorders").get(isAuthenticatedUser, getMyOrders);
router.route("/order/updateorder/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
router.route("/deleteorder/:id").delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);
export default router;