import { sequelize } from "../config/db.js";
import { Sequelize, DataTypes } from "sequelize";

import User from "./user.model.js";
import Product from "./product.model.js";
import Cart from "./cart.model.js";
import CartItem from "./cartItem.model.js";
import Order from "./order.model.js";
import OrderItem from "./orderItem.model.js";
import Category from "./category.model.js";
import Wishlist from "./wishlist.model.js";
import Review from "./review.model.js";
import Shipping from "./shipping.model.js";

// setting up associations
// User <-> Product
User.hasMany(Product, { foreignKey: 'userId', onDelete: 'CASCADE' });
Product.belongsTo(User, { foreignKey: 'userId' });

// User <-> Cart
User.hasOne(Cart, { foreignKey: 'userId', onDelete: 'CASCADE' });
Cart.belongsTo(User, { foreignKey: 'userId' });

// Cart <-> CartItem
Cart.hasMany(CartItem, { foreignKey: 'cartId', onDelete: 'CASCADE' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });

// Product <-> CartItem
Product.hasMany(CartItem, { foreignKey: 'productId' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });

// User <-> Order
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

// Order <-> OrderItem
Order.hasMany(OrderItem, { foreignKey: 'orderId', onDelete: 'CASCADE' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

// Product <-> OrderItem
Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

// category <-> product
Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

// User <-> Wishlist
User.belongsToMany(Product, { through: 'Wishlist', as: 'wishlist' });
Product.belongsToMany(User, { through: 'Wishlist', as: 'wishlistedBy' });

// User <-> Review
User.hasMany(Review);
Review.belongsTo(User);

// Product <-> Review
Product.hasMany(Review, { onDelete: 'CASCADE' });
Review.belongsTo(Product);

// User <-> Shipping
Order.hasOne(Shipping, { foreignKey: 'orderId', onDelete: 'CASCADE' });
Shipping.belongsTo(Order, { foreignKey: 'orderId' });


const models = {
    User,
    Product,
    Cart,
    CartItem,
    Sequelize,
    sequelize,
    Order,
    OrderItem,
    Category,
    Wishlist,
    Review,
    Shipping,
}

export default models;