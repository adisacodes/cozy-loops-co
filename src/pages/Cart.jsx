import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"
import { db } from "../firebase/config"
import { collection, addDoc } from "firebase/firestore"

function Cart() {
  const { cart, removeFromCart, clearCart, total } = useCart()
  const { user } = useAuth()

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return
    try {
      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        userEmail: user.email,
        items: cart,
        total: total,
        status: "pending",
        createdAt: new Date()
      })
      clearCart()
      alert("Order placed successfully! 🎉")
    } catch (error) {
      console.error("Error placing order:", error)
    }
  }

  if (cart.length === 0) return (
    <div className="bg-amber-50 min-h-screen flex flex-col items-center justify-center">
      <p className="text-2xl text-amber-800 mb-4">Your cart is empty 🛒</p>
      <Link to="/shop" className="bg-orange-700 text-white px-6 py-3 rounded-full hover:bg-orange-800">
        Continue Shopping
      </Link>
    </div>
  )

  return (
    <div className="bg-amber-50 min-h-screen py-12 px-6">
      <h1 className="text-4xl font-bold text-amber-900 text-center mb-10">Your Cart 🛒</h1>
      <div className="max-w-3xl mx-auto">
        {cart.map(item => (
          <div key={item.id} className="bg-white rounded-2xl shadow p-4 mb-4 flex items-center gap-4">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl"/>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-amber-900">{item.name}</h2>
              <p className="text-amber-700">KSh {item.price} x {item.quantity}</p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:text-red-700 font-semibold"
            >
              Remove
            </button>
          </div>
        ))}
        <div className="bg-white rounded-2xl shadow p-6 mt-6">
          <p className="text-2xl font-bold text-amber-900">Total: KSh {total}</p>
          <button
            onClick={handlePlaceOrder}
            className="bg-orange-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-800 mt-4 w-full"
          >
            Place Order 🎉
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
