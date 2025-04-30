import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDb from './config/connectDb.js';

// Express App configuration
const app = express();
const port = process.env.PORT || 4000;

// Middleware configuration
app.use(express.json());
app.use(cors());
// Checking database connection
connectDb();

// Api Endpoints
app.get('/',(req,res) => {
    res.send("API is working")
})

// Initialize express server

app.listen(port,() => console.log("Server is running in port " + port))