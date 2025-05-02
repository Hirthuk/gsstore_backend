import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDb from './config/connectDb.js';
import connectCloudinary from './config/cloudinary.js';
import userRoute from './routes/userRoutes.js';
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

app.get('/',(req,res) => {
    res.send("API is working")
})

// Initialize express server

app.listen(port,() => console.log("Server is running in port " + port))