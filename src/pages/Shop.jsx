import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase/config"
import { Link } from "react-router-dom"

function Shop() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("All")

  const categories = ["All", "Bags", "Accessories", "Dresses", "Tops", "Bottoms", "Men"]

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"))
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setProducts(items)
      setLoading(false)
    }
    fetchProducts()
  }, [])

  const filtered = activeCategory === "All"
    ? products
    : products.filter(p => p.category === activeCategory)

  if (loading) return <div className="text-center py-20 text-amber-800">Loading products...</div>

  return (
    <div className="bg-amber-50 min-h-screen py-12 px-6">
      <h1 className="text-4xl font-bold text-amber-900 text-center mb-8">Our Shop 🛍️</h1>
      
      {/* Filter buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              activeCategory === cat
                ? "bg-orange-700 text-white"
                : "bg-orange-100 text-orange-700 hover:bg-orange-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {filtered.map(product => (
          <Link to={`/product/${product.id}`} key={product.id}>
            <div className="bg-white rounded-2xl shadow hover:shadow-lg overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover"/>
              <div className="p-4">
                <h2 className="text-xl font-bold text-amber-900">{product.name}</h2>
                <p className="text-amber-700 mt-1">{product.category}</p>
                <p className="text-orange-700 font-semibold mt-2">KSh {product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Shop
