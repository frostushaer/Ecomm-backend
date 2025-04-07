import models from "../models/index.model.js";

const { User, Product } = models;

export const getWishlist = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
        include: { model: Product, as: 'wishlist' }
        });
        res.status(200).json(user.wishlist);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching wishlist", error });
    }
  };
  
  export const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = await User.findByPk(req.user.id);
        const product = await Product.findByPk(productId);
        await user.addWishlist(product);
        res.status(200).json({ message: "Product added to wishlist" });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
  };
  
  export const removeFromWishlist = async (req, res) => {
    try {
        const { itemId } = req.params;
        const user = await User.findByPk(req.user.id);
        const product = await Product.findByPk(itemId);
        await user.removeWishlist(product);
        res.status(200).json({ message: "Product removed from wishlist" });
    }
    catch (error) {
        res.status(500).json({ message: "Error removing from wishlist", error });
    }
  };
  