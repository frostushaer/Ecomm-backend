import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Shipping = sequelize.define('Shipping', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  orderId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Packed', 'Shipped', 'Delivered', 'Cancelled'),
    defaultValue: 'Pending',
  },
  trackingNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  courier: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  estimatedDeliveryDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  timestamps: true,
});

export default Shipping;
