import { useState } from "react"
import { addProduct } from "../api/product";
import {useProduct} from "../context/ProductContext"
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [product,setProduct] = useState({name: '',price: '', category: ''});
    const {setProducts} = useProduct()
    const navigate = useNavigate();

    const handleChange = (e) => {
     setProduct(prev => ({
        ...prev,[e.target.name]:e.target.value
     }))
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await addProduct(product)
            setProducts(prev=>[...prev,response.data])
            setProduct({ name: "", price: "", category: "" });
            navigate('/dashboard')
        } catch (error) {
            console.log("Error messagae",error.message)
        }
    }

    return (
        <div className="p-4 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Add Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
        </form>
        </div>
    )

}

export default AddProduct