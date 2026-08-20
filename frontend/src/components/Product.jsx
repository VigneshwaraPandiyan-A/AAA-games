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
        const response = await axios.get("https://aaa-games.onrender.com/products");
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
      <div className="bg-black/70 py-8 px-4 sm:py-16 sm:px-8 lg:px-12">

        <div className="flex justify-center mb-6 -mt-10 sm:-mt-16 px-4">
          <img
            src={banner}
            alt="AAA Games"
            className="w-full max-w-xs sm:max-w-md object-contain"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8 max-w-7xl mx-auto">

          {games.map((game) => {

            const isWishlisted = wishlist.some(
              (item) => item._id === game._id
            );

            return (
              <div
                key={game._id}
                className="group bg-gray-900 border border-purple-600 rounded-xl shadow-lg overflow-hidden hover:-translate-y-2 hover:shadow-purple-500/50 duration-300 flex flex-col justify-between"
              >

                <div>
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover"
                  />

                  <div className="p-4 sm:p-5">

                    <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-purple-300 duration-300 line-clamp-1">
                      {game.title}
                    </h2>

                    <p className="text-gray-400 mt-2 text-xs sm:text-sm line-clamp-2">
                      {game.description}
                    </p>

                    <p className="text-purple-400 font-bold text-lg sm:text-xl mt-3">
                      ₹{Number(game.price).toLocaleString("en-IN")}
                    </p>

                    <p className="text-green-400 mt-1 text-sm font-semibold">
                      Stock : {game.quantity}
                    </p>

                    <p className="text-gray-400 text-xs sm:text-sm mt-1">
                      Platform : {Array.isArray(game.platform) ? game.platform.join(", ") : game.platform}
                    </p>

                    <p className="text-gray-400 text-xs sm:text-sm">
                      Category : {Array.isArray(game.category) ? game.category.join(", ") : game.category}
                    </p>

                    <p className="text-gray-400 text-xs sm:text-sm">
                      Publisher : {game.publisher}
                    </p>
                  </div>
                </div>

                <div className="px-4 pb-4 sm:px-5 sm:pb-5">
                  <div className="flex justify-center items-center gap-3 mt-3">

                    <button
                      disabled={game.quantity === 0}
                      onClick={() => {
                        dispatch(addToCart(game));
                        alert("Product Added To Cart");
                      }}
                      className={`w-full py-2.5 rounded-lg font-bold duration-300 text-sm sm:text-base ${
                        game.quantity === 0
                          ? "bg-gray-600 cursor-not-allowed text-gray-300"
                          : "bg-purple-600 hover:bg-purple-700 text-white"
                      }`}
                    >
                      {game.quantity === 0
                        ? "Out Of Stock"
                        : "Buy Now"}
                    </button>

                    <button
                      onClick={() => dispatch(addToWishlist(game))}
                      aria-label="Wishlist toggle"
                      className="text-3xl sm:text-4xl hover:scale-110 duration-200"
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