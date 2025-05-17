import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    return (
        <ProductContext.Provider value={{products,setProducts,loading,setLoading,error,setError}}>
            {children}
        </ProductContext.Provider>   
    )
}

export const useProduct = () => {
    return useContext(ProductContext)
}