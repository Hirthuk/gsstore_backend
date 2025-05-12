import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDb from './config/connectDb.js';
import connectCloudinary from './config/cloudinary.js';
import userRoute from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoute.js';
import orderRoutes from './routes/orderRoutes.js';
// Express App configuration
const app = express();
const port = process.env.PORT || 4000;

// Middleware configuration
app.use(express.json());
app.use(cors());
// Checking database connection
connectDb();
// Using Cloudinary
connectCloudinary();
// Api Endpoints
app.use('/api/user',userRoute);
app.use('/api/product',productRoutes);
app.use('/api/cart', cartRoutes)
app.use('/api/order',orderRoutes);

app.get('/',(req,res) => {
    res.send("API is working")
})

// Initialize express server

app.listen(port,() => console.log("Server is running in port " + port))