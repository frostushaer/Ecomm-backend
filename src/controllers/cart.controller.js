import models from "../models/index.model.js";

const { Cart, Product, CartItem } = models;

// 🔹 Get user cart
export const getCart = async (req, res) => {
    const cart = await Cart.findOne({
      where: { userId: req.user.id },
      include: {
        model: CartItem,
        include: [Product],
      },
    });
  
    res.json(cart || { message: "Cart is empty" });
  };
  
  // 🔹 Add to cart
  export const addToCart = async (req, res) => {
    try {
      const { productId, quantity } = req.body;
    
      let cart = await Cart.findOne({ where: { userId: req.user.id } });
      if (!cart) cart = await Cart.create({ userId: req.user.id });
    
      let cartItem = await CartItem.findOne({
        where: { cartId: cart.id, productId },
      });
    
      if (cartItem) {
        cartItem.quantity += quantity;
        await cartItem.save();
      } else {
        cartItem = await CartItem.create({ cartId: cart.id, productId, quantity });
      }
    
      res.status(201).json({ message: "Product added to cart", cartItem });
    }
    catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // 🔹 Update cart item quantity
  export const updateCartItem = async (req, res) => {
    try {
      const { itemId } = req.params;
      const { quantity } = req.body;
    
      const cartItem = await CartItem.findByPk(itemId);
      if (!cartItem) return res.status(404).json({ message: "Cart item not found" });
    
      cartItem.quantity = quantity;
      await cartItem.save();
    
      res.json({ message: "Cart item updated", cartItem });
    }
    catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // 🔹 Remove item from cart
  export const removeCartItem = async (req, res) => {
    const { itemId } = req.params;
  
    const cartItem = await CartItem.findByPk(itemId);
    if (!cartItem) return res.status(404).json({ message: "Cart item not found" });
  
    await cartItem.destroy();
    res.json({ message: "Item removed from cart" });
  };
  
  // 🔹 Clear all items
  export const clearCart = async (req, res) => {
    const cart = await Cart.findOne({ where: { userId: req.user.id } });
  
    if (!cart) return res.status(404).json({ message: "Cart not found" });
  
    await CartItem.destroy({ where: { cartId: cart.id } });
    res.json({ message: "Cart cleared" });
  };