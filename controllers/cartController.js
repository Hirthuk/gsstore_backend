import userModel from '../models/userModel.js'

// Controller function to add items to user's cart
const addToCart = async (req, res) => {
    try {
        // 1. Destructure required data from request body
        const { userId, itemId, size } = req.body;

        // 2. Find user document in database
        const userData = await userModel.findById(userId);
        
        // 3. Get existing cart data from user document
        let cartData = await userData.cartData;

        // 4. Check if item already exists in cart
        if (cartData[itemId]) {
            // 4a. If item exists, check if same size already exists
            if (cartData[itemId][size]) {
                // Increment quantity if same size exists
                cartData[itemId][size] += 1;
            } else {
                // Add new size entry if size doesn't exist
                cartData[itemId][size] = 1;
            }
        } else {
            // 4b. If item doesn't exist in cart at all
            // Create new entry for item
            cartData[itemId] = {};
            // Add size with quantity 1
            cartData[itemId][size] = 1;
        }

        // 5. Update user document with modified cart data
        await userModel.findByIdAndUpdate(userId, { cartData });

        // 6. Send success response (you might want to add this)
        res.json({ success: true, message: "Item added to cart" });
    }
    catch (error) {
        // 7. Handle errors and send error response
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Update User Cart

const updateCart = async (req,res) => {
    try {
        const {userId, itemId, size, quantity} = req.body;

        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity

        await userModel.findByIdAndUpdate(userId, {cartData});
        res.json({success: true, message: "Cart Updated"})
    } catch (error) {
        console.error(error.message);
        res.json({success: false, message: error.message});
    }
}

// Get user cart detatils

const getUserCart = async (req,res) => {

    try {
        const {userId} = req.body;
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        res.json({success: true, cartData})
    } catch (error) {
        console.error(error.message);
        res.json({success: false, message: error.message});
    }
}

export {addToCart, updateCart, getUserCart}