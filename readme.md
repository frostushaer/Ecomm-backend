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