import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { addToCart } from "../features/cart/cartSlice";
import { addToWishlist } from "../features/wishlist/wishlistSlice";

import banner from "../assets/banner.png";

function Products() {
  const dispatch = useDispatch();

  const wishlist = useSelector((state) => state.wishlist.items);

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        setGames(response.data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <h1 className="text-3xl text-white font-bold">
          Loading Games...
        </h1>
      </div>
    );
  }

  return (
    <div className="bg-linear-to-br from-black via-purple-900 to-zinc-950">
      <div className="bg-black/70 py-16 px-10">

        <div className="flex justify-center mb-2 -mt-16">
          <img
            src={banner}
            alt="AAA Games"
            className="w-96 object-contain"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {games.map((game) => {

            const isWishlisted = wishlist.some(
              (item) => item._id === game._id
            );

            return (
              <div
                key={game._id}
                className="group bg-gray-900 border border-purple-600 rounded-xl shadow-lg overflow-hidden hover:-translate-y-2 hover:shadow-purple-500/50 duration-300"
              >

                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-64 object-cover"
                />

                <div className="p-5">

                  <h2 className="text-2xl font-bold text-white group-hover:text-purple-300 duration-300">
                    {game.title}
                  </h2>

                  <p className="text-gray-400 mt-2 text-sm">
                    {game.description}
                  </p>

                  <p className="text-purple-400 font-bold text-xl mt-3">
                    ₹{Number(game.price).toLocaleString("en-IN")}
                  </p>

                  <p className="text-green-400 mt-2">
                    Stock : {game.quantity}
                  </p>

                  <p className="text-gray-400 text-sm mt-1">
                    Platform : {Array.isArray(game.platform) ? game.platform.join(", ") : game.platform}
                  </p>

                  <p className="text-gray-400 text-sm">
                    Category : {Array.isArray(game.category) ? game.category.join(", ") : game.category}
                  </p>

                  <p className="text-gray-400 text-sm">
                    Publisher : {game.publisher}
                  </p>

                  <div className="flex justify-center gap-2 mt-5">

                    <button
                      disabled={game.quantity === 0}
                      onClick={() => {
                        dispatch(addToCart(game));
                        alert("Product Added To Cart");
                      }}
                      className={`w-full py-2 rounded-lg duration-300 ${
                        game.quantity === 0
                          ? "bg-gray-600 cursor-not-allowed"
                          : "bg-purple-600 hover:bg-purple-700 text-white"
                      }`}
                    >
                      {game.quantity === 0
                        ? "Out Of Stock"
                        : "Buy Now"}
                    </button>

                    <button
                      onClick={() => dispatch(addToWishlist(game))}
                      className="text-4xl"
                    >
                      {isWishlisted ? (
                        <span className="text-red-500">♥</span>
                      ) : (
                        <span className="text-white">♡</span>
                      )}
                    </button>

                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </div>
  );
}

export default Products;