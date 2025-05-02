import express from 'express';
import {loginUser,registerUser,adminLogin} from '../controllers/userController.js'

const userRoute = express.Router();

userRoute.post('/login',loginUser);
userRoute.post('/register',registerUser);
userRoute.post('/adminlogin',adminLogin);

export default userRoute;