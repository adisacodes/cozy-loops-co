import { useState } from "react"
import { auth, provider } from "../firebase/config"
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState("")

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider)
      navigate("/")
    } catch (error) {
      setError(error.message)
    }
  }

  const handleEmailAuth = async () => {
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
      navigate("/")
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center w-full max-w-md">
        <h1 className="text-3xl font-bold text-amber-900 mb-2">Cozy Loops Co 🧶</h1>
        <p className="text-amber-700 mb-6">{isSignUp ? "Create an account" : "Sign in to start shopping"}</p>
        
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border rounded-xl p-3 w-full mb-3"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border rounded-xl p-3 w-full mb-4"
        />

        <button
          onClick={handleEmailAuth}
          className="bg-orange-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-800 w-full mb-4"
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>

        <p className="text-amber-700 mb-4">or</p>

        <button
          onClick={handleGoogleLogin}
          className="border-2 border-orange-700 text-orange-700 px-6 py-3 rounded-full font-semibold hover:bg-orange-50 w-full mb-4"
        >
          Sign in with Google
        </button>

        <p className="text-amber-700 text-sm">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <span
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-orange-700 font-semibold cursor-pointer"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login
