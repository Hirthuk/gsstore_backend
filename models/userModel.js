import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required:true},
    email: {type: String, required:true, unique: true},
    password: {type: String, required: true},
    cartData: {type: Object, default: {}}
},{minimize: false})
// Usually Moongoose will ignore empty object--> To make it not do that for CART Data we are setting minimize - false

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;