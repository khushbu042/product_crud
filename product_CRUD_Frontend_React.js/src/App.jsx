import React, { useEffect } from "react"
import {BrowserRouter, Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Navbar from "./components/Navbar"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import { useAuth } from "./context/AuthContext"
import EditProduct from "./pages/EditProduct"
import AddProduct from "./pages/AddProduct"

function App() {

  //  const {setIsLoggedIn} = useAuth();

  //  useEffect(()=>{
  //   const checkAuthentication = async () => {
  //     try {
  //       await axios.get("http://localhost:8000/api/users/isLoggedIn",{
  //         withCredentials: true
  //       })
  //       setIsLoggedIn(true)
  //     } catch (error) {
  //        console.log('User not logged in');
  //        setIsLoggedIn(false);
  //     }
  //   }
  //   checkAuthentication();
  //  },[setIsLoggedIn])
  return (
    <BrowserRouter>
      <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}> </Route>
      <Route path="/login" element={<Login/>}> </Route>
      <Route path="/register" element={<Register/>}> </Route>
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>
      }> </Route>
      <Route path="/edit/:id" element={
        <ProtectedRoute>
           <EditProduct />
        </ProtectedRoute>
       }></Route>
      <Route path="/add" element={<AddProduct/>}> </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App