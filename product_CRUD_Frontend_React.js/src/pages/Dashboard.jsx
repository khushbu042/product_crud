import React from "react"
import ProductList from "../components/ProductList";


const Dashboard = () => {
    return (
    <div>
      <h2 className="text-2xl font-bold text-center my-4">All Products</h2>
      <ProductList />
    </div>
    )
}

export default Dashboard