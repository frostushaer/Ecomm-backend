import express from 'express';
import { signup, login, logout, forgotPassword, resetPassword } from '../controllers/auth.controller.js';
import {body} from "express-validator";

const router = express.Router();

router.post('/signup', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], signup);

router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;