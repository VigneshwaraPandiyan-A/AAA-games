import { useDispatch, useSelector } from "react-redux";
import { removeWishlist } from "../features/wishlist/wishlistSlice";
import { addToCart } from "../features/cart/cartSlice";

function Wishlist() {

  const dispatch = useDispatch();

  const wishlist = useSelector((state) => state.wishlist.items);

  return (
<div className="min-h-screen bg-linear-to-tr from-black via-violet-950 to-black">
    <div className="max-w-5xl mx-auto p-8">

      <h1 className="text-4xl font-bold text-white text-center mb-10">
        ❤️ My Wishlist
      </h1>

      {wishlist.length === 0 ? (

        <h2 className="text-white">Your wishlist is empty.</h2>

      ) : (

        <>
          {wishlist.map((game, index) => (

            <div
              key={index}
              className="flex justify-between items-center bg-zinc-900 border border-purple-600 rounded-xl p-5 mb-5 hover:shadow-lg hover:shadow-purple-500/40 duration-300"
            >

              <div className="flex gap-5 items-center">

                <img
                  src={game.image}
                  alt={game.title || game.name}
                  className="w-32 h-32 object-cover rounded"
                />

                <div>

                  <h2 className="text-2xl font-bold text-white">
                    {game.title || game.name}
                  </h2>

                  <p className="text-purple-400 font-bold">
                    ₹{game.price ? game.price.toLocaleString("en-IN") : 0}
                  </p>

                </div>

              </div>

              <div className="flex gap-3">

                <button
                  onClick={() => {dispatch(addToCart(game));dispatch(removeWishlist(index));}}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg duration-300"
                >
                  Move to Cart
                </button>

                <button
                  onClick={() => dispatch(removeWishlist(index))}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg duration-300"
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