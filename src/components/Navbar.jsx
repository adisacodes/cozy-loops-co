import {Link, useNavigate} from "react-router-dom"
import {signOut} from "firebase/auth"
import {auth} from "../firebase/config"
import { useAuth } from "../context/AuthContext"

function Navbar() {
    const {user} = useAuth()
    const navigate = useNavigate()

    const handleLogout = async() => {
        await signOut(auth)
        navigate("/login")
    }

    return (
        <nav className="bg-amber-900 text-amber-50 px-8 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">Cozy Loops Co🧶</Link>
            <div className="flex gap-6 items-center">
                <Link to="/shop" className="hover:text-amber-200">Shop</Link>
                {user? (
                    <>
                    <Link to="/cart" className="hover:text-amber-200">Cart</Link>
                    <Link to="/dashboard" className="hover:text-amber-200">Dashboard</Link>
                    <button onClick={handleLogout} className="bg-orange-700 px-4 py-2 rounded-full hover:bg-orange-800">Logout</button>
                    </>
                ) :(
                    <Link to="/login" className="bg-orange-700 px-4 py-2 rounded-full hover:bg-orange-800">Login</Link>
                )}
            </div>

        </nav>
    )
}

export default Navbar