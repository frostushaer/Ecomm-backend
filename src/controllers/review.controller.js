import models from "../models/index.model.js";

const { Review, Product } = models;

export const getProductReviews = async (req, res) => {
    try {
        const { id } = req.params;
        const reviews = await Review.findAll({
        where: { ProductId: id },
        include: ['User'],
        order: [['createdAt', 'DESC']],
        });
        res.status(200).json(reviews);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching reviews", error });
    }
  };
  
  export const postReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const { id: productId } = req.params;
    
        const existing = await Review.findOne({
        where: { UserId: req.user.id, ProductId: productId }
        });
        if (existing) {
        return res.status(400).json({ message: "You've already reviewed this product" });
        }
    
        const review = await Review.create({
        rating,
        comment,
        UserId: req.user.id,
        ProductId: productId
        });
    
        res.status(201).json({ message: "Review submitted", review });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
  };
  
  export const deleteReview = async (req, res) => {
    try {
        const { id:productId, reviewId } = req.params;
        const review = await Review.findByPk(reviewId);

        // if (!review) {
        // return res.status(404).json({ message: "Review not found" });
        // } else if (review.ProductId !== productId) {
        // return res.status(404).json({ message: "Product not found" });
        // } else if (review.UserId !== req.user.id) {
        // return res.status(403).json({ message: "Unauthorized" });
        // }
    
        if (!review || review.ProductId !== productId || review.UserId !== req.user.id) {
        return res.status(404).json({ message: "Review not found or unauthorized" });
        }
    
        await review.destroy();
        res.status(200).json({ message: "Review deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting review", error });
    }
  };