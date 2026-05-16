import { useEffect, useState } from "react"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../firebase/config"
import { useAuth } from "../context/AuthContext"

function Dashboard() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      const q = query(
        collection(db, "orders"),
        where("userId", "==", user.uid)
      )
      const querySnapshot = await getDocs(q)
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setOrders(items)
      setLoading(false)
    }
    fetchOrders()
  }, [user])

  if (loading) return <div className="text-center py-20 text-amber-800">Loading orders...</div>

  return (
    <div className="bg-amber-50 min-h-screen py-12 px-6">
      <h1 className="text-4xl font-bold text-amber-900 text-center mb-10">My Orders 📦</h1>
      {orders.length === 0 ? (
        <p className="text-center text-amber-700 text-xl">No orders yet! Go shop 🛍️</p>
      ) : (
        <div className="max-w-3xl mx-auto">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl shadow p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <p className="text-amber-700 text-sm">Order ID: {order.id.slice(0, 8)}...</p>
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {order.status}
                </span>
              </div>
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 mb-3">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl"/>
                  <div>
                    <p className="font-semibold text-amber-900">{item.name}</p>
                    <p className="text-amber-700">KSh {item.price} x {item.quantity}</p>
                  </div>
                </div>
              ))}
              <p className="text-xl font-bold text-orange-700 mt-4">Total: KSh {order.total}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard
