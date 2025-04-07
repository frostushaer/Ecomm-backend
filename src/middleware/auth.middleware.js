import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'; 

export const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
  
    if (!token) {
      return res.status(401).json({ message: "Access denied" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach user info to the request
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };

export const protect = async (req, res, next) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) 
      return res.status(401).json({ message: "Not authorized" });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findByPk(decoded.id);
      next();
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
    }
  };

// Middleware to check if user is admin
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }
};