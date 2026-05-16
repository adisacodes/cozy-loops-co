import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../firebase/config"
import { useAuth } from "../context/AuthContext"

function Navbar() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    await signOut(auth)
    navigate("/login")
  }

  return (
    <nav className="bg-amber-900 text-amber-50 px-6 py-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Cozy Loops Co 🧶</Link>
        
        <button
          className="md:hidden text-amber-50 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
        
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/shop" className="hover:text-amber-200">Shop</Link>
          {user ? (
            <>
              <Link to="/cart" className="hover:text-amber-200">Cart</Link>
              <Link to="/dashboard" className="hover:text-amber-200">Dashboard</Link>
              <button onClick={handleLogout} className="bg-orange-700 px-4 py-2 rounded-full hover:bg-orange-800">Logout</button>
            </>
          ) : (
            <Link to="/login" className="bg-orange-700 px-4 py-2 rounded-full hover:bg-orange-800">Login</Link>
          )}
        </div>
      </div>
      
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4">
          <Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
          {user ? (
            <>
              <Link to="/cart" onClick={() => setMenuOpen(false)}>Cart</Link>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <button onClick={handleLogout} className="bg-orange-700 px-4 py-2 rounded-full text-left">Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)} className="bg-orange-700 px-4 py-2 rounded-full text-center">Login</Link>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
