import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize, connectDB } from './src/config/db.js';
import authRoutes from './src/routes/auth.route.js';
import userRoutes from './src/routes/user.route.js';
import productRoutes from './src/routes/product.route.js';
import cartRoutes from './src/routes/cart.route.js';
import orderRoutes from './src/routes/order.route.js';
import adminDashboardRoutes from './src/routes/adminDashboard.route.js';
import wishlistRoutes from './src/routes/wishlist.route.js';
import paymentRoutes from './src/routes/payment.route.js';
import shippingRoutes from './src/routes/shipping.route.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminDashboardRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/shipping', shippingRoutes);

// for local uploads
// app.use('/src/uploads', express.static('uploads'));

// Connect to the database
sequelize.sync({ alter: true })
    .then(() => console.log('Database synced successfully'))
    .catch((error) => console.error('Error syncing database:', error));
connectDB();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
    }
);