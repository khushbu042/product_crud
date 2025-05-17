import axios from "axios";


// Fetch all products
export const fetchAllProduct = async() => {
    const res = await axios.get("http://localhost:8000/api/products/");
    return res.data;
}

//add new products
export const addProduct = async(productData) => {
    const res = await axios.post("http://localhost:8000/api/products/",productData,{
        withCredentials:true
    });
    return res.data
}

//update Product 
export const updateProduct = async(productId, updatedData) => {
    
    const res = axios.put(`http://localhost:8000/api/products/${productId}`,updatedData,{
        withCredentials: true
    })
    console.log("update product ka response:", res);
    return res.data
}

//delete Product 
export const deleteProduct = async (productId) => {
    const res = axios.delete(`http://localhost:8000/api/products/${productId}`,{
        withCredentials: true
    })
    return res.data
}




