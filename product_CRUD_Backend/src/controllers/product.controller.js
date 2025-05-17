const Product= require("../models/product.model.js");
const sendResponse = require("../utils/sendResponse.js");


// add Product 
const createProduct = async ( req,res) => {
    try {
        const{name, price, category} = req.body;
    
        if(!name){
            return sendResponse(res,false,"name is required",null, 401);
        }
    
        const newProduct  = await Product.create({
            name,
            price, 
            category,
            createdBy: req.user.userId
        })
    
        if(!newProduct){
            return sendResponse(res,false,"Product is not added",null, 401);
        }
    
        return sendResponse(res,true,"Product added Successfully",newProduct, 200);
    } catch (error) {
        console.error(error);
        return sendResponse(res, false, "Internal Server Error", null, 500);
    }
}

//get all Products
const getAllProducts =  async (req,res) => {
    console.log("Fetch all Product Function");
    try {
        const { page = 1, limit = 10, category } = req.query;
        const query = category ? { category } : {};
     
        const allProducts = await Product.find(query).skip((page -1)* limit).limit(Number(limit));
    
        return sendResponse(res,true,"Products fetch Successfully",allProducts,200);
    }catch (error) {
        console.error(error);
        return sendResponse(res, false, "Internal Server Error", null, 500);
    }
}

//get Single Product
const getSingleProduct = async (req,res) => {
   try {
     const { id } = req.params;
     const singleProduct = await Product.findById(id);
 
     if(!singleProduct){
         return sendResponse(res,false,"Product details not found", null, 404);
     }
     return sendResponse(res,true,"Product found Successfully", singleProduct, 200)
   } catch (error) {
        console.error(error);
        return sendResponse(res, false, "Internal Server Error", null, 500);
   }
}

const updateProduct = async (req,res) => {
    try {
       
        const { id } = req.params;
        console.log("update Product ki id:", id);
     
        const {name,price,category} =req.body
        console.log("update Product ki body:", name,price,category);
    
        const updatedProduct = await Product.findByIdAndUpdate(id, 
            {name,price,category},
            {new: true}
        )
        console.log("After updating ",updatedProduct)
    
        if (!updatedProduct) {
            return sendResponse(res, false, "Product not found", null, 404);
        }
      
        return sendResponse(res, true, "Product updated successfully", updatedProduct, 200);
    } catch (error) {
        console.error(error);
        return sendResponse(res, false, "Internal Server Error", null, 500);
    }
}

//deleteProduct
const deleteProduct = async (req,res) => {
    try {
        const {id} = req.params
        const deleted = await Product.findByIdAndDelete(id);
        if (!deleted) {
           return sendResponse(res, false, "Product not found", null, 404);
        }
         
        return sendResponse(res, true, "Product deleted successfully", null, 200);
    } catch (error) {
        console.error(error);
        return sendResponse(res, false, "Internal Server Error", null, 500);
    }
}

//getUserDashboard
const getUserDashboard =  async (req,res) => {
   
   try {
    const userId = req.user.userId;
    console.log("UserId",userId)
    if(!userId){
         return sendResponse(res,false,"Please login first",null,401)
    }
   const userProductDetail = await Product.find({createdBy : userId}).populate("createdBy","username")
   console.log("userProductDetails are :", userProductDetail)
 
   if(!userProductDetail){
     return sendResponse(res,false,"User not added any Product",null,401);
   }
   
    // return sendResponse(res,true,"Product Detail",null,200);
   return sendResponse(res,true,"products Details are :",{
     username: userProductDetail[0]?.createdBy?.username || "User",
     items: userProductDetail
   },200);

   } catch (error) {
        console.log(error);
        return sendResponse(res,false,"Internal Server Error",null,500)
   }

}

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    getUserDashboard 
}