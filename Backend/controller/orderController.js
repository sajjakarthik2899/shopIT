import catchAsyncError from "../middlewares/catchAsyncError.js";
import orders from "../models/orders.js";
import products from "../models/products.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createOrder = catchAsyncError(async (req, res, next) => {
    console.log(req.body,"req.body")
  const {
    shippingInfo,
    orderItems,
    paymentMethod,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (!paymentMethod) {
    return next(new ErrorHandler("Payment method is required", 400));
  }

  const order = await orders.create({
    shippingInfo,
    orderItems,
    paymentMethod,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});
export const getAllOrders = catchAsyncError(async (req, res, next) => {
  const allOrders = await orders.find().populate("user", "name email");

  res.status(200).json({
    success: true,
    count: allOrders.length,
    orders: allOrders,
  });
});
export const getOrderDetails = catchAsyncError(async (req, res, next) => {
    console.log("getOrderDetails")
  const order = await orders.findById(req.params.id).populate("user", "name email");

  if (!order) {
    return next(new ErrorHandler("Order not found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});
export const getMyOrders = catchAsyncError(async (req, res, next) => {
  // req.user._id comes from isAuthenticatedUser middleware
  const userId = req.user._id;

  const myOrders = await orders.find({ user: userId });

  if (!myOrders || myOrders.length === 0) {
    return next(new ErrorHandler("You have not placed any orders yet", 404));
  }

  res.status(200).json({
    success: true,
    count: myOrders.length,
    orders: myOrders,
  });
});
export const updateOrder = catchAsyncError(async (req, res, next) => {
  const orderId = req.params.id;
  const order = await orders.findById(orderId);

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  if (order.orderStatus && order.paymentInfo.status === "Delivered") {
    return next(new ErrorHandler("Order has already been delivered", 400));
  }

  // Reduce stock using product name (since _id doesn't match)
  for (let item of order.orderItems) {
    const product = await products.findOne({ name: item.name });
    if (!product) {
      return next(new ErrorHandler(`Product not found for: ${item.name}`, 404));
    }

    product.stock -= item.quantity;

    if (product.stock < 0) {
      return next(new ErrorHandler(`Insufficient stock for ${product.name}`, 400));
    }

    await product.save({ validateBeforeSave: false });
  }

  order.orderStatus = req.body.status;
  order.paymentInfo.status = req.body.status;
  if (req.body.status === "Delivered") {
    order.deliveredAt = new Date();
  }

  await order.save();

  res.status(200).json({
    success: true,
    message: "Order status updated and stock adjusted",
    order,
  });
});
export const deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await orders.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
  });
});