 import { useEffect } from "react"
import { useProduct } from "../context/ProductContext"
import { deleteProduct, fetchAllProduct } from "../api/product"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const ProductList = () => {
    const {products,setProducts,loading,setLoading,error,setError} = useProduct()
    const navigate = useNavigate();

    useEffect(()=> {
        console.log("product List page is load");
        const getProducts = async() => {
            try {
                setError('')
                const response  = await fetchAllProduct() 
                setProducts(response.data); 
                // console.log("data are :",response.data);  
            }
            catch(error){
                setError("Failed to load products")
            }
            finally{
                setLoading(false)
            }
        }
        getProducts()
    
    },[]);

    // useEffect(() => {
    //     console.log("Products are:", products)
    // },[products])

    const handleDelete = async(id) => {
    try {
        const response = await deleteProduct(id)
        if(response.success){
            toast.success("Product deleted");
            setProducts(products.filter(product => product._id != id))
        }
        navigate('/dashboard');
    } catch (error) {
        toast.error("Delete failed");
        console.error(error);
    }
    }

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-red-500 text-center">{error}</p>;

    

    return (
        <>
            <input
                type="text"
                placeholder="Search by name or category"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-1/2 p-2 border rounded mb-4"
            />
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {
            products.length>0 ? (products.map((product) => (
                <div key={product._id} className="bg-white shadow-md rounded-lg p-4">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600">Price: ₹{product.price}</p>
                    <p className="text-gray-600">Category: {product.category}</p>
                    {/* You can also add edit/delete buttons here later */}
                    <Link to={`/edit/${product._id}`}>
                        <button className="bg-yellow-400 text-white px-3 py-1 rounded">Edit</button>
                    </Link>
                    <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
              ))) : (<p>No products found</p>)
        }
      </div>
        </>
        
       
    );
}

export default ProductList