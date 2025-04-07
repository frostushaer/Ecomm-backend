import models from "../models/index.model.js";

const { Shipping, Order } = models;

// ✅ Get Shipping Details
export const getShippingDetails = async (req, res) => {
    try {
      const { orderId } = req.params;
      const shipping = await Shipping.findOne({ where: { orderId } });
  
      if (!shipping) {
        return res.status(404).json({ error: 'Shipping details not found' });
      }
  
      res.status(200).json(shipping);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // ✅ Admin: Update Shipping Status
  export const updateShippingStatus = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status, trackingNumber, courier, estimatedDeliveryDate } = req.body;
  
      const shipping = await Shipping.findOne({ where: { orderId } });
      if (!shipping) return res.status(404).json({ error: 'Shipping not found' });
  
      shipping.status = status || shipping.status;
      shipping.trackingNumber = trackingNumber || shipping.trackingNumber;
      shipping.courier = courier || shipping.courier;
      shipping.estimatedDeliveryDate = estimatedDeliveryDate || shipping.estimatedDeliveryDate;
  
      await shipping.save();
  
      res.status(200).json({ message: 'Shipping updated', shipping });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };