import crypto from "crypto";
import { razorpay } from "../config/rajorpay.js";

export const initiatePayment = async (req, res) => {
  const { amount, currency = "INR", receipt } = req.body;

  try {
    const options = {
      amount: amount * 100, // in paise
      currency,
      receipt,
    };

    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const verifyPayment = (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            return res.status(200).json({ message: "Payment verified successfully" });
        } else {
            return res.status(400).json({ error: "Invalid signature" });
        }
    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }

};
