import { Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const ProtectedRoute = ({children}) => {
    const [isAuthenticated,setIsAuthenticated] = useState(null);

    useEffect( () => {
        const checkAuth = async() => {
            try {
                const res = await axios.get("http://localhost:8000/api/users/isloggedin",{
                    withCredentials: true
                });
                setIsAuthenticated(true)   
            } catch (error) {
                console.log(error?.error.message);
                setIsAuthenticated(false);
            }
        }
        checkAuth();
    } ,[])

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // jab tak confirm nahi hota, loading
    }
    if (!isAuthenticated) {

        return <Navigate to="/login" />; // agar login nahi to login page
    }

    return children
}

export default ProtectedRoute