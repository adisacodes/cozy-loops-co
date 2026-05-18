import { useState, useEffect } from "react"
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase/config"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

function Admin() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ name: "", price: "", category: "", description: "", image: "" })
  const [editId, setEditId] = useState(null)

  const ADMIN_EMAIL = "marianavugwe@gmail.com"

  useEffect(() => {
    if (!user || user.email !== ADMIN_EMAIL) {
      navigate("/")
      return
    }
    fetchProducts()
  }, [user])

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"))
    const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    setProducts(items)
    setLoading(false)
  }

  const handleSubmit = async () => {
    if (!form.name || !form.price) return
    if (editId) {
      await updateDoc(doc(db, "products", editId), { ...form, price: Number(form.price) })
      setEditId(null)
    } else {
      await addDoc(collection(db, "products"), { ...form, price: Number(form.price) })
    }
    setForm({ name: "", price: "", category: "", description: "", image: "" })
    fetchProducts()
  }

  const handleEdit = (product) => {
    setForm({ name: product.name, price: product.price, category: product.category, description: product.description, image: product.image })
    setEditId(product.id)
  }

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "products", id))
    fetchProducts()
  }

  if (loading) return <div className="text-center py-20">Loading...</div>

  return (
    <div className="bg-amber-50 min-h-screen py-12 px-6">
      <h1 className="text-4xl font-bold text-amber-900 text-center mb-10">Admin Panel 🔧</h1>

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-6 mb-10">
        <h2 className="text-2xl font-bold text-amber-900 mb-4">{editId ? "Edit Product" : "Add New Product"}</h2>
        <div className="grid grid-cols-1 gap-4">
          <input placeholder="Product Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="border rounded-xl p-3 w-full"/>
          <input placeholder="Price (KSh)" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="border rounded-xl p-3 w-full" type="number"/>
          <input placeholder="Category" value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="border rounded-xl p-3 w-full"/>
          <input placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="border rounded-xl p-3 w-full"/>
          <input placeholder="Image URL" value={form.image} onChange={e => setForm({...form, image: e.target.value})} className="border rounded-xl p-3 w-full"/>
          <button onClick={handleSubmit} className="bg-orange-700 text-white py-3 rounded-full font-semibold hover:bg-orange-800">
            {editId ? "Update Product" : "Add Product"}
          </button>
          {editId && <button onClick={() => { setEditId(null); setForm({ name: "", price: "", category: "", description: "", image: "" }) }} className="bg-gray-400 text-white py-3 rounded-full font-semibold hover:bg-gray-500">Cancel</button>}
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-2xl shadow p-4 mb-4 flex items-center gap-4">
            <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-xl"/>
            <div className="flex-1">
              <h3 className="font-bold text-amber-900">{product.name}</h3>
              <p className="text-amber-700">KSh {product.price}</p>
            </div>
            <button onClick={() => handleEdit(product)} className="bg-amber-500 text-white px-4 py-2 rounded-full hover:bg-amber-600">Edit</button>
            <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600">Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Admin
