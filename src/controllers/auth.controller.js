import models from '../models/index.model.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import {sendEmail} from '../utils/sendMail.js';
import {generateToken}  from '../utils/generateToken.js';

const { User } = models;

const tokenStore = {}; // Temporary store for tokens, use a database in production

// Signup
const signup = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Check if user already exists
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Create a new user
      const user = await User.create({ name, email, password });
  
      // Generate JWT token
      const token = generateToken(user);
  
      res.status(201).json({ message: "User registered successfully", token });
    } catch (err) {
      res.status(500).json({ error: err.message || "Server error" });
    }
  };
  
  // Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
          return res.status(400).json({ message: "Invalid credentials" });
        }
    
        // Compare passwords
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          return res.status(400).json({ message: "Invalid credentials" });
        }
    
        // Generate JWT token
        const token = generateToken(user);
    
        res.status(200).json({ message: "Login successful", token });
      } catch (err) {
        res.status(500).json({ error: "Server error" });
      }
};

const logout = async (req, res) => {
  // For JWT, logout is handled client-side by removing the token
  res.status(200).json({ message: "Logged out" });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(404).json({ message: "User not found" });

  const token = crypto.randomBytes(32).toString("hex");
  tokenStore[email] = token;

  await sendEmail(email, "Password Reset", `Token: ${token}`);
  console.log(`Reset token: ${token}`); // For debugging, remove in production
  
  res.json({ message: "Reset token sent to email" });
};

const resetPassword = async (req, res) => {
  const { email, token, newPassword } = req.body;
  if (tokenStore[email] !== token) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  const user = await User.findOne({ where: { email } });
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  delete tokenStore[email];
  res.json({ message: "Password updated" });
};

export { signup, login, logout, forgotPassword, resetPassword };