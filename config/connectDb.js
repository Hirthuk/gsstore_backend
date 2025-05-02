import mongoose from "mongoose";

const connectDb = async () => {

    mongoose.connection.on('connected',() => {
        console.log("Database connected")
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`) 
    // Connect to E-commerce database.. if the database not present it will create automatically on first write
}

export default connectDb