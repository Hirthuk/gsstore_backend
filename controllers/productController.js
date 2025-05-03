import {v2 as cloudinary} from 'cloudinary';
import productModel from '../models/productModel.js';
// Function to add Product
const addProduct = async (req,res) => {
try{
    const {name, description, price, category, subCategory, sizes, bestSeller} = req.body;
    // Assigning image and verifying the element is true before accessing it
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 &&req.files.image2[0];
    const image3 = req.files.image3 &&req.files.image3[0];
    const image4 = req.files.image4&&req.files.image4[0];

    const images = [image1,image2,image3,image4].filter((item) =>  { return item !== undefined});
    // Converting Images to URL
    let imageURL = await Promise.all(
        images.map( async (item) => {
            let result = await cloudinary.uploader.upload(item.path, {resource_type: "image"});
            return result.secure_url;
        })
    )

    const productData = new productModel({
        name,
        description,
        price: Number(price), //converts to Number
        image: imageURL,
        category,
        subCategory,
        sizes: JSON.parse(sizes), // Convert Array sting to Array -> "["m","x"]" --> ["m","x"]
        bestSeller: bestSeller == "true" ? true : false ,//Converting to boolean based on whether true string entered
        date: Date.now()
    })

    const product = await productData.save();
    console.log(product);
    return res.json({success: true, message: "Product added"})
    // console.log(name, description, price, category, subCategory, sizes, bestSeller);
    // console.log(images);
    // console.log(imageURL);
}
catch(error){
    console.log(error);
    res.json({success: false, message: error.message})
}
}

// Function to remove Product
const removeProduct = async (req,res) => {

    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Product removed successfully"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }

}

// Function to list Product
const listProduct = async (req,res) => {
    try {
        const products = await productModel.find({});
      res.json({success: true, products});
    }
    catch(error){
        console.log(error);
        res.json({success: false, message: error.message});
    }
    const products = productModel.find({}); // Fetch all products
}

// Function to list single product info
const singleProduct = async (req,res) => {
 try {
    const {productId} = req.body;
    const product = await productModel.findById(productId);
    res.json({success: true, product});
    
 } catch (error) {
    console.log(error);
    res.json({success: false, message: error.message})
 }
}

export {addProduct,removeProduct,listProduct,singleProduct}