import express from 'express'
import  {addProduct,removeProduct,listProduct,singleProduct} from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRoutes = express.Router();
// Using upload middleware to get the files and add it in the request data that we can get later
productRoutes.post('/addProduct',adminAuth, upload.fields([{name: "image1",maxCount: 1},{name: "image2",maxCount: 1},{name: "image3",maxCount: 1},{name: "image4",maxCount: 1}]) , addProduct);
productRoutes.post('/removeProduct',adminAuth, removeProduct);
productRoutes.post('/singleProduct',singleProduct);
productRoutes.get('/listProduct',listProduct);

export default productRoutes;