import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { updateProduct } from "../api/product";

const EditProduct = () => {
    
    const {id} = useParams();
    const navigate = useNavigate();
    const [errorMsg,setErrorMsg]= useState('');
    const [product, setProduct] = useState({
        name: '',
        price: '',
        category: ''
    });

    useEffect(()=> {
        const fetchProduct = async() => {
           try {
                const response = await axios.get(`http://localhost:8000/api/products/${id}`,{
                    withCredentials: true,
                })
                setProduct(response.data.data);
           } catch (error) {
                setErrorMsg("Product is not found")
                console.error("Failed to fetch product", err);
           }
        }
        fetchProduct();
    },[id])

    const handleChange = (e) => {
        setProduct({...product,[e.target.name]: e.target.value});
    }

    const handleSubmit = async(e) => {
        try {
            console.log("HandleSubmt ka Product",product,id);
            const response = await updateProduct(id,product);
            console.log("Handlesubmit ka response  ",response);
            navigate('/dashboard')
            
        } catch (error) {
              setErrorMsg("Update failed")
              console.error("Update failed", err);
        }
    }

    return (
        <div className="p-4 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
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
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
        </form>
        </div>
  
    );

}

export default EditProduct