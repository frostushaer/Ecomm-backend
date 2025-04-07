# 🛒 E-commerce Backend API (Node.js + Express + PostgreSQL)

This is a full-featured modular backend for an e-commerce platform built with **Node.js**, **Express**, **PostgreSQL**, **Sequelize**, **Redis**, **Cloudinary**, and **JWT Auth**.

---

## 🚀 Features

- Modular structure with separate folders for controllers, routes, and models.
- Auth & User Management (with JWT)
- Product Management with Cloudinary Image Upload
- Cart & Wishlist
- Orders & Checkout
- Reviews & Ratings
- Shipping & Admin Dashboard
- Payment Gateway Integration (Razorpay or Stripe)
- WebSocket for live notifications
- Redis for caching and session management

---

## 🔑 Authentication

| Endpoint | Method | Body / Params | Access |
|---------|--------|----------------|--------|
| `/api/auth/signup` | POST | `{ name, email, password }` | Public |
| `/api/auth/login` | POST | `{ email, password }` | Public |
| `/api/auth/logout` | POST | - | Auth |
| `/api/auth/forgot-password` | POST | `{ email }` | Public |
| `/api/auth/reset-password` | POST | `{ email, token, newPassword }` | Public |

---

## 👤 User Management

| Endpoint | Method | Body / Params | Access |
|---------|--------|----------------|--------|
| `/api/users/me` | GET | - | Auth |
| `/api/users/me` | PUT | `{ name? }` | Auth |
| `/api/users/change-password` | PUT | `{ oldPassword, newPassword }` | Auth |
| `/api/users` | POST | `{ name, email, password, role }` | Admin |
| `/api/users/:id` | DELETE | URL Param: `id` | Admin |

---

## 🛍️ Product Management

| Endpoint | Method | Body / Params | Access |
|---------|--------|----------------|--------|
| `/api/products` | GET | `?category=electronics&minPrice=1000` | Public |
| `/api/products/:id` | GET | URL Param: `id` | Public |
| `/api/products` | POST | `{ name, description, price, category, stock }` | Admin |
| `/api/products/:id` | PUT | `{ updated fields }` | Admin |
| `/api/products/:id` | DELETE | URL Param: `id` | Admin |
| `/api/products/:id/upload` | POST | FormData (Image) | Admin |

---

## 🛒 Cart Management

| Endpoint | Method | Body / Params | Access |
|---------|--------|----------------|--------|
| `/api/cart` | GET | - | Auth |
| `/api/cart` | POST | `{ productId, quantity }` | Auth |
| `/api/cart/:itemId` | PUT | `{ quantity }` | Auth |
| `/api/cart/:itemId` | DELETE | URL Param: `itemId` | Auth |
| `/api/cart` | DELETE | - | Auth |

---

## ❤️ Wishlist Management

| Endpoint | Method | Body / Params | Access |
|---------|--------|----------------|--------|
| `/api/wishlist` | GET | - | Auth |
| `/api/wishlist` | POST | `{ productId }` | Auth |
| `/api/wishlist/:itemId` | DELETE | URL Param: `itemId` | Auth |

---

## ⭐ Reviews & Ratings

| Endpoint | Method | Body / Params | Access |
|---------|--------|----------------|--------|
| `/api/products/:id/reviews` | GET | URL Param: `id` | Public |
| `/api/products/:id/reviews` | POST | `{ rating, comment }` | Auth |
| `/api/products/:id/reviews/:reviewId` | DELETE | URL Params: `id`, `reviewId` | Auth (Reviewer or Admin) |

---

## 📦 Order & Checkout

| Endpoint | Method | Body / Params | Access |
|---------|--------|----------------|--------|
| `/api/orders` | POST | - (uses cart) | Auth |
| `/api/orders` | GET | - | Auth |
| `/api/orders/:id` | GET | URL Param: `id` | Auth |
| `/api/orders/:id` | DELETE | URL Param: `id` | Auth |
| `/api/orders/:id/status` | PUT | `{ status }` | Admin |

---

## 🚚 Shipping

| Endpoint | Method | Body / Params | Access |
|---------|--------|----------------|--------|
| `/api/shipping/:orderId` | GET | URL Param: `orderId` | Auth |
| `/api/shipping/:orderId` | PUT | `{ status, courier, trackingNumber }` | Admin |

---

## 💳 Payment Gateway

| Endpoint | Method | Body / Params | Access |
|---------|--------|----------------|--------|
| `/api/payment` | POST | `{ amount }` | Auth |
| `/api/payment/verify` | POST | `{ paymentId, orderId, signature }` | Auth |

---

## 📊 Admin Dashboard

| Endpoint | Method | Body / Params | Access |
|---------|--------|----------------|--------|
| `/api/admin/sales` | GET | - | Admin |
| `/api/admin/orders` | GET | - | Admin |
| `/api/admin/users` | GET | - | Admin |
| `/api/admin/products` | GET | - | Admin |
| `/api/admin/categories` | POST | `{ name }` | Admin |
| `/api/admin/categories` | PUT | `{ id, name }` | Admin |
| `/api/admin/categories` | DELETE | `{ id }` | Admin |
| `/api/admin/categories` | GET | - | Admin |

---

## 🧱 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL + Sequelize ORM
- **Auth**: JWT + bcrypt
- **Cache**: Redis
- **Image Upload**: Cloudinary

---

## 📂 Environment variables (.env)
- **PORT**
- **DB_NAME**
- **DB_USER**
- **DB_PASSWORD**
- **DB_HOST**
- **DB_DIALECT**
- **DB_PORT**
- **JWT_SECRET**
- **EMAIL_USER**
- **EMAIL_PASS**
- **CLOUDINARY_CLOUD_NAME**
- **CLOUDINARY_API_KEY**
- **CLOUDINARY_API_SECRET**
- **RAZORPAY_KEY_ID**
- **RAZORPAY_KEY_SECRET**

# 📦 E-Commerce Platform - Database Design

This document outlines the complete database design for an E-Commerce platform, using **PostgreSQL** and **Sequelize ORM**.

---

## 🧑 Users Table
| Field      | Type       | Notes                    |
|------------|------------|--------------------------|
| id         | UUID (PK)  | Primary key              |
| username   | STRING     | Unique, not null         |
| email      | STRING     | Unique, not null         |
| password   | STRING     | Hashed                   |
| role       | ENUM       | 'user' or 'admin'        |
| createdAt  | TIMESTAMP  |                          |
| updatedAt  | TIMESTAMP  |                          |

---

## 📦 Products Table
| Field        | Type       | Notes             |
|--------------|------------|-------------------|
| id           | UUID (PK)  | Primary key       |
| name         | STRING     |                   |
| description  | TEXT       |                   |
| categoryId   | UUID (FK)  | FK to Category    |
| price        | FLOAT      |                   |
| stock        | INTEGER    |                   |
| imageUrl     | STRING     | Cloudinary link   |
| createdAt    | TIMESTAMP  |                   |
| updatedAt    | TIMESTAMP  |                   |

---

## 🗂️ Categories Table
| Field | Type      | Notes      |
|-------|-----------|------------|
| id    | UUID (PK) |            |
| name  | STRING    | Unique     |

---

## 🛒 Cart Table
| Field   | Type      | Notes               |
|---------|-----------|---------------------|
| id      | UUID (PK) |                     |
| userId  | UUID (FK) | One-to-one with User|

---

## 🛍️ CartItems Table
| Field     | Type      | Notes         |
|-----------|-----------|---------------|
| id        | UUID (PK) |               |
| cartId    | UUID (FK) | Belongs to Cart|
| productId | UUID (FK) | FK to Product |
| quantity  | INTEGER   |               |

---

## ❤️ Wishlist Table
| Field   | Type      | Notes               |
|---------|-----------|---------------------|
| id      | UUID (PK) |                     |
| userId  | UUID (FK) | One-to-one with User|

---

## ⭐ WishlistItems Table
| Field      | Type      | Notes         |
|------------|-----------|---------------|
| id         | UUID (PK) |               |
| wishlistId | UUID (FK) | FK to Wishlist|
| productId  | UUID (FK) | FK to Product |

---

## 📝 Reviews Table
| Field     | Type      | Notes          |
|-----------|-----------|----------------|
| id        | UUID (PK) |                |
| userId    | UUID (FK) | FK to User     |
| productId | UUID (FK) | FK to Product  |
| rating    | INTEGER   | 1–5 stars      |
| comment   | TEXT      | Optional       |

---

## 📦 Orders Table
| Field         | Type       | Notes                     |
|---------------|------------|---------------------------|
| id            | UUID (PK)  |                           |
| userId        | UUID (FK)  | FK to User                |
| status        | ENUM       | pending, paid, shipped... |
| totalPrice    | FLOAT      |                           |
| paymentStatus | ENUM       | pending, success, failed  |
| createdAt     | TIMESTAMP  |                           |
| updatedAt     | TIMESTAMP  |                           |

---

## 📦 OrderItems Table
| Field     | Type      | Notes                          |
|-----------|-----------|--------------------------------|
| id        | UUID (PK) |                                |
| orderId   | UUID (FK) | FK to Orders                   |
| productId | UUID (FK) | FK to Product                  |
| quantity  | INTEGER   |                                |
| price     | FLOAT     | Price at time of order         |

---

## 🚚 ShippingDetails Table
| Field       | Type       | Notes                         |
|-------------|------------|-------------------------------|
| id          | UUID (PK)  |                               |
| orderId     | UUID (FK)  | One-to-one with Order         |
| address     | TEXT       |                               |
| city        | STRING     |                               |
| postalCode  | STRING     |                               |
| country     | STRING     |                               |
| status      | ENUM       | pending, shipped, delivered   |

---

## 💳 Payments Table *(Optional)*
| Field         | Type       | Notes                         |
|---------------|------------|-------------------------------|
| id            | UUID (PK)  |                               |
| orderId       | UUID (FK)  | FK to Orders                  |
| transactionId | STRING     | Razorpay/Stripe/etc.          |
| amount        | FLOAT      |                               |
| status        | ENUM       | success, failed, pending      |

---

## 🔗 RELATIONSHIPS
- **User → Cart**: One-to-One
- **User → Wishlist**: One-to-One
- **User → Orders**: One-to-Many
- **User → Reviews**: One-to-Many
- **Cart → CartItems**: One-to-Many
- **Wishlist → WishlistItems**: One-to-Many
- **Order → OrderItems**: One-to-Many
- **Order → ShippingDetails**: One-to-One
- **Order → Payments**: One-to-One
- **Product → Reviews / CartItems / OrderItems / WishlistItems**: One-to-Many

