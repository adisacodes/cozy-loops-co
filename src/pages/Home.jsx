import {Link} from "react-router-dom"

function Home() {
    return (
    <div className="bg-amber-50 min-h-screen">
        {/*Hero Section*/}
        <div className="flex-flex-col items-center justify-center text-center py-20 px-6">
            <h1 className="text-5xl font-bold text-amber-900 mb-4">
                Handmade with Love, one loop at a time🧶
                Turning yarn into cozy little treasures.
            </h1>
            <p className="text-amber-700 text-lg mb-8 max-w-xl">
                Discover beautiful handcrafted crotchet pieces made with love just for you.
                From cozy blankets to stylish bags and so much more.
            </p>
            <Link
            to="/shop"
            className="bg-orange-700 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-800"
            >
                Shop Now
            </Link>
            </div>
    </div>
    )
}

export default Home