import userModel from "../models/userModel.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// Route for user Login

// with the provided id string token will be created it can be any string
const createToken = (id) => {
   return jwt.sign({id},process.env.JSON_SECRET);
}
const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body;
        const exist = await userModel.findOne({email});
        // If User not exist
        if(!exist){
            return res.json({success:false, message: "User doesn't exist"})
        }
        const isMatch = await bcrypt.compare(password,exist.password);
        const token = createToken(exist._id);
        if(isMatch){
            return res.json({success:true, token})
        }
        else{
            return res.json({success:false, message: "Incorrect password"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
        
    }

}

// Route for User Registration
const registerUser = async (req,res) => {
 try {
    const {name,email,password} = req.body;

    // Checking User already exists
    const exits = await userModel.findOne({email}); //async function returns promise which will be true always
    // have to use await

    if(exits){
        return res.json({success:false, message:"User already exists"})
    }
    // Verify the mail is valid using validator
    if(!validator.isEmail(email)){
        return res.json({success:false, message:"Please enter valid email"})
    }

    if(password.length < 8){
        return res.json({success:false, message:"Please enter Strong password"})
    }

    // Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    
    // Creating new document using this model and given data
    const newUser = new userModel({
        name,
        email,
        password: hashedPassword
    })

    // Save the document to the collection and same time user will have the values of the document stored in user
    // varialbe _id for the document already created by the mongodb
    const user = await newUser.save();
    const token =  createToken(user._id);
    return res.json({success: true, token})
    
 } catch (error) {
    console.log(error);
    res.json({success:false, message: error.message})
 }
}

// Route for admin login
const adminLogin = async (req,res) => {

    try{
        const {email, password} = req.body;
        if (email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JSON_SECRET);
            res.json({success: true, token})
            
        } else{
            return res.json({success:false, message: "Incorrect password"})
        }
    }
    catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
     }
}


export {loginUser,registerUser,adminLogin}