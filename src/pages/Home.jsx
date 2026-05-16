
import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="bg-amber-50 min-h-screen">
      <div
        className="relative flex flex-col items-center justify-center text-center py-32 px-6"
        style={{
          backgroundImage: "url('https://adisacodes.github.io/cozy-loops-co/images/hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-black/40 absolute inset-0"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-amber-50 mb-4">Cozy Loops Co 🧶</h1>
          <p className="text-base md:text-xl text-amber-100 mb-8 max-w-xl">
            Handmade with love, one loop at a time.
            Turning yarn into cozy little treasures.
          </p>
          <Link
            to="/shop"
            className="bg-orange-700 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-800"
          >
            Shop Now
          </Link>
        </div>
      </div>

      <div className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-amber-900 mb-10">Our Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow hover:shadow-lg">
            <img src="https://adisacodes.github.io/cozy-loops-co/images/totebag2.webp" alt="Bags" className="w-full h-48 object-cover"/>
            <div className="bg-orange-100 p-4">
              <h3 className="text-xl font-bold text-amber-900">Bags</h3>
              <p className="text-amber-700 mt-1">Stylish handcrafted bags</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow hover:shadow-lg">
            <img src="https://adisacodes.github.io/cozy-loops-co/images/scrunchies.webp" alt="Accessories" className="w-full h-48 object-cover"/>
            <div className="bg-orange-100 p-4">
              <h3 className="text-xl font-bold text-amber-900">Accessories</h3>
              <p className="text-amber-700 mt-1">Scrunchies, keychains & more</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow hover:shadow-lg">
            <img src="https://adisacodes.github.io/cozy-loops-co/images/keychain.jpg" alt="Keychains" className="w-full h-48 object-cover"/>
            <div className="bg-orange-100 p-4">
              <h3 className="text-xl font-bold text-amber-900">Keychains</h3>
              <p className="text-amber-700 mt-1">Cute crochet keychains</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
