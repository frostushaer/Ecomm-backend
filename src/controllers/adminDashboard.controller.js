import models from "../models/index.model.js";

const { User, Product, Order, OrderItem, Category } = models;

// 📊 Total Sales
export const getTotalSales = async (req, res) => {
    try {
        const totalSales = await Order.sum('totalAmount', {
        where: { status: ['confirmed', 'shipped', 'delivered'] }
        });
    
        const totalOrders = await Order.count();
        const totalUsers = await User.count();
        const totalProducts = await Product.count();
    
        res.status(200).json({
        totalSales,
        totalOrders,
        totalUsers,
        totalProducts
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching total sales', error });
    }
  };
  
  // 📦 All Orders
  export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
        include: [
            { model: OrderItem, include: [Product] },
            { model: User, attributes: ['id', 'name', 'email'] }
        ],
        order: [['createdAt', 'DESC']]
        });
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
  };
  
  // 👤 All Users
  export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
        attributes: ['id', 'name', 'email', 'role', 'createdAt']
        });
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
  };
  
  // 🛍 All Products
  export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
  };
  
  // 🗂 Category Management
  export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await Category.create({ name });
        res.status(201).json(category);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating category', error });
    }
  };
  
  export const updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
    
        category.name = name;
        await category.save();
        res.status(200).json({ message: 'Category updated', category });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating category', error });
    }
  };
  
  export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
    
        await category.destroy();
        res.status(200).json({ message: 'Category deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting category', error });
    }
  };

  export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error });
    }
  };