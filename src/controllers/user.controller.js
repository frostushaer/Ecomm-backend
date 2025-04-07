import models from '../models/index.model.js';
import bcrypt from 'bcryptjs';

const { User } = models;

export const getMe = (req, res) => {
    res.json(req.user);
  };
  
export const updateMe = async (req, res) => {
    const { name, email } = req.body;
    req.user.name = name || req.user.name;
    req.user.email = email || req.user.email;
    await req.user.save();
    
    res.json({ message: "Profile updated", user: req.user });
  };
  
export const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!(await req.user.comparePassword(oldPassword))) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }
  
    req.user.password = await bcrypt.hash(newPassword, 10);
    await req.user.save();
    res.json({ message: "Password updated" });
  };
  
export const adminCreateUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    const user = await User.create({ name, email, password, role });
    res.status(201).json({ message: "User created", user });
  };
  
export const adminDeleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      // console.log(id);
      
      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      await user.destroy();
      res.json({ message: "User deleted" });
    }
    catch (error) {
      res.status(500).json({ message: error.message });
    }
};