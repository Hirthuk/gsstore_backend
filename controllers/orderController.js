

// Function to place order using cash on delivery

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const placeOrder = async (req,res) => {
    try{
        const {userId, items, amount, address} = req.body;
        
        const orderData = {
            userId,
            items,
            amount,
            address,
            status: "Order placed",
            paymentMethod: 'COD',
            payment: false,
            data: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, {cartData: {}})

         res.json({success: true, message: "Order Placed"})
    }
    catch(error){
        res.json({success: false, message: error.message})
    }
}

// Function to place order using Stripe

const placeOrderStripe = async (req,res) => {
    
}

// Function to place order using RazorPay

const placeOrderRazorPay = async (req,res) => {
    
}

// Function to get all orders detail for admin panel

const allOrders = async (req,res) => {
    
}

// Function to get all orders of user to frontend

const userOrders = async (req,res) => {
    try {
        
        const { userId } = req.body;
        const orders = await orderModel.find({userId});
        res.json({success: true, orders})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

// / Function to update the orders from the admin panel -by detail - Order placed
const updateStatus = async (req,res) => {
    
}

export {placeOrder, placeOrderRazorPay, placeOrderStripe, allOrders, updateStatus, userOrders}