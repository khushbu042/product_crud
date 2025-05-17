import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const {isLoggedIn, setIsLoggedIn}= useAuth();
 
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/api/users/logout', {}, { withCredentials: true });
      setIsLoggedIn(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleAddProduct = () => {
      navigate('/add')
  }

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">Lost & Found Hub</Link>

        <div className="flex space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">Home</Link>

          {isLoggedIn ? (<>
            <button
              onClick={handleAddProduct}
              className="text-white hover:text-gray-300"
            >
              Add Product
            </button>
            <button
              onClick={handleLogout}
              className="text-white hover:text-gray-300"
            >
              Logout
            </button>
            </> 
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
              <Link to="/register" className="text-white hover:text-gray-300">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

