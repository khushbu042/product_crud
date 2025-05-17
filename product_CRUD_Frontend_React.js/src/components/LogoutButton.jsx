import { useNavigate } from "react-router-dom"

const LogoutButton = () => {

    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:8000/api/users/logout",
                { withCredentials: true }
            )
            navigate('/login')
        } catch (error) {
            console.error(error.response?.data?.message || "Logout failed");
        }

    }
    return (
        <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
        Logout
        </button>
    );
}

export default LogoutButton