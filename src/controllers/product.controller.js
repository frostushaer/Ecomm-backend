import models from "../models/index.model.js";
import { Op } from "sequelize";

const { Product } = models;

// Get All Products (with filter/search)
export const getAllProducts = async (req, res) => {
    try {
      const { category, minPrice, maxPrice } = req.query;
      const where = {};
  
      if (category) where.category = category;
      if (minPrice || maxPrice) {
        where.price = {};
        if (minPrice) where.price[Op.gte] = parseFloat(minPrice);
        if (maxPrice) where.price[Op.lte] = parseFloat(maxPrice);
      }
  
      const products = await Product.findAll({ where });
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Get Product by ID
  export const getProductById = async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json({ message: "Product not found" });
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Create Product (Admin Only)
  export const createProduct = async (req, res) => {
    try {
      const { name, description, category, price, stock } = req.body;
      const newProduct = await Product.create({ name, description, category, price, stock });
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Update Product (Admin Only)
  export const updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product) return res.status(404).json({ message: "Product not found" });

      const allowedFields = ["name", "description", "category", "price", "stock"];

      const updates = {};

      for (const field of allowedFields) {
        if (req.body[field] !== undefined) {
          updates[field] = req.body[field];
        }
      }

      const updatedProduct = await product.update(updates);
  
      res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Delete Product (Admin Only)
  export const deleteProduct = async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json({ message: "Product not found" });
  
      await product.destroy();
      res.json({ message: "Product deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

//   // Upload Product Image (Cloudinary)
export const uploadProductImage = async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json({ message: "Product not found" });
  
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
      }
  
      const imageUrls = req.files.map(file => file.path); // file.path contains Cloudinary URL
  
      return res.status(200).json({
        message: "Images uploaded successfully",
        imageUrls,
      });
      
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  
  // Upload Product Image locally
  export const uploadLocallyProductImage = async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json({ message: "Product not found" });
  
      product.imageUrl = req.file.path; // or cloudinary URL
      await product.save();
  
      res.json({ message: "Image uploaded successfully", imageUrl: product.imageUrl });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };