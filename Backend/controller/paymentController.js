import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Stripe from "stripe";
import catchAsyncError from "../middlewares/catchAsyncError.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config({ path: path.resolve(__dirname, "../config/config.env") });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeCheckoutSession = catchAsyncError(async (req, res, next) => {
  const body = req.body;
  console.log("Request Body:", body);
  const shipping_rate = body?.itemsPrice > 200
    ? "shr_1RjEFr2U4c5bShpAG0NU5v3D"
    : "shr_1RjEGT2U4c5bShpAHRefXkfs";
    const shipping_info = body?.shippingInfo
  const line_items = body?.orderItems.map((item) => ({
    price_data: {
      currency: "usd", 
      product_data: {
        name: item.name,
        images: [item.image],
      },
      unit_amount: Math.round(item.price * 100), 
    },
    quantity: item.quantity,
    tax_rates: ["txr_1RjFsX2U4c5bShpAn3W2G3bu"],
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    metadata: { ...shipping_info, itemsPrice: body.itemsPrice },
    success_url: `${process.env.FRONTEND_URL}/order/getOrderDetails`,
    cancel_url: `${process.env.FRONTEND_URL}/`,
    customer_email: req.user.email,
    client_reference_id: req.user._id.toString(),
    shipping_options: [{ shipping_rate }],
    line_items, 
  });

  res.status(200).json({
    success: true,
    url: session.url,
  });
});
