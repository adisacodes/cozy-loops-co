import {auth, provider} from "../firebase/config"
import { signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom"

function Login() {
    const navigate = useNavigate()

    const handleGoogleLogin = async () =>{
        try {
            await signInWithPopup(auth, provider)
            navigate("/")
        } catch (error) {
            console.error("Login failed:", error)
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-amber-50">
            <div className="bg-cream p-10 rounded-2xl shadow-lg text-center">
                <h1 className="text-3xl font-bold text-amber-900 mb-2">Cozy Loops Co🧶</h1>
                <p className="text-amber-700 mb-6">Sign in to start shopping</p>
                <button
                onClick={handleGoogleLogin}
                className="bg-orange-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-800"
                >
                    Sign in with Google
                </button>
            </div>
        </div>
    )
}

export default Login