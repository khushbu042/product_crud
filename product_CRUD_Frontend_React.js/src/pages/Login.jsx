import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
     
    const [email, setEmail] =useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const {setIsLoggedIn} = useAuth();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/users/login",
              { email, password },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
                withCredentials: true, // 👈 ye important hai agar tum token cookie mein store karna chah rahi ho
              }
            )
            console.log('Login Success:', response.data)
            alert("Login Successfully !")
            setIsLoggedIn(true);
            navigate('/dashboard');
        } catch (error) {
            console.error('Login Error:', error.response ? error.response.data : error.message);
        }
    }
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
  
  export default Login;
  
