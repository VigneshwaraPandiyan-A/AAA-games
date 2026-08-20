import { useDispatch, useSelector } from "react-redux";
import { removeWishlist } from "../features/wishlist/wishlistSlice";
import { addToCart } from "../features/cart/cartSlice";

function Wishlist() {

  const dispatch = useDispatch();

  const wishlist = useSelector((state) => state.wishlist.items);

  return (
<div className="min-h-screen bg-linear-to-tr from-black via-violet-950 to-black py-10">
    <div className="max-w-5xl mx-auto px-4 sm:p-8">

      <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8 sm:mb-10">
        ❤️ My Wishlist
      </h1>

      {wishlist.length === 0 ? (

        <div className="bg-zinc-900/60 border border-purple-800/40 rounded-xl p-8 text-center">
          <h2 className="text-white text-xl font-medium">Your wishlist is empty.</h2>
        </div>

      ) : (

        <>
          {wishlist.map((game, index) => (

            <div
              key={index}
              className="flex flex-col sm:flex-row justify-between sm:items-center bg-zinc-900 border border-purple-600 rounded-xl p-4 sm:p-5 mb-5 hover:shadow-lg hover:shadow-purple-500/40 duration-300 gap-4"
            >

              <div className="flex gap-4 sm:gap-5 items-center">

                <img
                  src={game.image}
                  alt={game.title || game.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg shrink-0"
                />

                <div>

                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    {game.title || game.name}
                  </h2>

                  <p className="text-purple-400 font-bold text-base sm:text-lg mt-1">
                    ₹{game.price ? game.price.toLocaleString("en-IN") : 0}
                  </p>

                </div>

              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-2 sm:mt-0">

                <button
                  onClick={() => {dispatch(addToCart(game));dispatch(removeWishlist(index));}}
                  className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg font-semibold duration-300 text-sm"
                >
                  Move to Cart
                </button>

                <button
                  onClick={() => dispatch(removeWishlist(index))}
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-semibold duration-300 text-sm"
                >
                  Remove
                </button>

              </div>

            </div>
          
          ))}
        </>

      )}

    </div>
    </div>
  );
}

export default Wishlist;