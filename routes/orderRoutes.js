import express from 'express'
import {placeOrder, placeOrderRazorPay, placeOrderStripe, allOrders, updateStatus, userOrders} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js'
const orderRoutes = express.Router();

// Admin features
orderRoutes.post('list',adminAuth, allOrders);
orderRoutes.post('/status', adminAuth, updateStatus);

// Payment features
orderRoutes.post('/place',authUser,placeOrder );
orderRoutes.post('/stripe',authUser, placeOrderStripe);
orderRoutes.post('/razorpay',authUser, placeOrderRazorPay);

// User feature orders
orderRoutes.post('/userOrders',authUser,userOrders);

export default orderRoutes;