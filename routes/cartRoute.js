import express from 'express';
import {addToCart, updateCart, getUserCart, removeFromCart} from '../controllers/cartController.js'
import authUser from '../middleware/auth.js';
const cartRoutes = express.Router();

cartRoutes.post('/get', authUser, getUserCart);
cartRoutes.post('/add', authUser, addToCart);
cartRoutes.post('/update', authUser, updateCart);
cartRoutes.post('/remove', authUser, removeFromCart); // New route

export default cartRoutes;