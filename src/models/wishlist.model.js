import { DataTypes } from 'sequelize';
import { sequelize } from "../config/db.js";

const Wishlist = sequelize.define('Wishlist', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      }
    }, {
      timestamps: true,
    });
  
  export default Wishlist;
  