import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase/config"

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setProduct({ id: docSnap.id, ...docSnap.data() })
      }
      setLoading(false)
    }
    fetchProduct()
  }, [id])

  if (loading) return <div className="text-center py-20 text-amber-800">Loading...</div>
  if (!product) return <div className="text-center py-20 text-amber-800">Product not found!</div>

  return (
    <div className="bg-amber-50 min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        <img src={product.image} alt={product.name} className="w-full md:w-1/2 h-80 object-cover"/>
        <div className="p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-amber-900">{product.name}</h1>
          <p className="text-amber-600 mt-2">{product.category}</p>
          <p className="text-gray-600 mt-4">{product.description}</p>
          <p className="text-2xl font-bold text-orange-700 mt-4">KSh {product.price}</p>
          <button className="bg-orange-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-800 mt-6">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
