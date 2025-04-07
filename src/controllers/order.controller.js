import models from "../models/index.model.js";

const { Order, OrderItem, Cart, CartItem, Product } = models;

export const createOrder = async (req, res) => {
    try {
      const { shippingAddress, paymentMethod } = req.body;
      const userId = req.user.id;
  
      const cart = await Cart.findOne({ where: { userId }, include: [CartItem] });
      if (!cart || cart.CartItems.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }
  
      let totalAmount = 0;
      const orderItems = await Promise.all(cart.CartItems.map(async (item) => {
        const product = await Product.findByPk(item.productId);
        totalAmount += product.price * item.quantity;
  
        return {
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
        };
      }));
  
      const order = await Order.create({ userId, shippingAddress, paymentMethod, totalAmount });
  
      await Promise.all(orderItems.map(item => {
        return OrderItem.create({ ...item, orderId: order.id });
      }));
  
      await CartItem.destroy({ where: { cartId: cart.id } });
  
      res.status(201).json({ message: "Order placed successfully", orderId: order.id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
        where: { userId: req.user.id },
        include: [{ model: OrderItem, include: [Product] }],
        order: [['createdAt', 'DESC']],
        });
        res.status(200).json(orders);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
  };
  
  export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id, {
        include: [{ model: OrderItem, include: [Product] }],
        });
    
        if (!order || order.userId !== req.user.id) {
        return res.status(404).json({ message: "Order not found" });
        }
    
        res.status(200).json(order);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
  };
  
  export const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order || order.userId !== req.user.id) {
        return res.status(404).json({ message: "Order not found" });
        }
    
        if (order.status === 'shipped' || order.status === 'delivered') {
        return res.status(400).json({ message: "Cannot cancel after shipment" });
        }
    
        order.status = 'cancelled';
        await order.save();
    
        res.json({ message: "Order cancelled" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
  };
  
  export const adminUpdateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });
    
        order.status = req.body.status;
        await order.save();
    
        res.json({ message: "Order status updated", status: order.status });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
  };