const express = require("express");
const productRouter = express.Router();
const authMiddleware = require("../middlewares/auth.middleware.js")
const {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    getUserDashboard
} = require("../controllers/product.controller");

// 👇 Only logged-in users can add, update, delete
productRouter.post('/', authMiddleware, createProduct);
productRouter.delete('/:id',authMiddleware, deleteProduct);
productRouter.put('/:id',authMiddleware, updateProduct);
productRouter.get('/dashboard',authMiddleware,getUserDashboard)

// 👇 Public routes
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getSingleProduct);

module.exports = productRouter