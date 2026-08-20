import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  increaseQty,
  decreaseQty,
  removeItem,
} from "../features/cart/cartSlice";

function Cart() {
  const cart = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ==========================
  // Go To Checkout Page
  // ==========================
  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-violet-950 via-black to-violet-950">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:p-8">

        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-10">
          🛒 Your Shopping Cart
        </h1>

        {cart.length === 0 ? (

          <div className="bg-zinc-900/60 border border-purple-800/40 rounded-xl p-8 text-center">
            <h2 className="text-white text-xl font-medium">
              Your cart is empty.
            </h2>
          </div>

        ) : (

          <>
            {cart.map((item, index) => (

              <div
                key={index}
                className="flex flex-col sm:flex-row justify-between sm:items-center bg-zinc-900 border border-purple-600 rounded-xl p-4 sm:p-5 mb-5 shadow-lg hover:shadow-purple-500/40 duration-300 gap-4"
              >

                <div className="flex gap-4 sm:gap-5 items-center">

                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg shrink-0"
                  />

                  <div className="flex-1">

                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      {item.title}
                    </h2>

                    <p className="text-purple-400 font-bold text-base sm:text-lg mt-1">
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>

                    <p className="text-gray-400 text-xs sm:text-sm mt-1">
                      Stock : {item.availableStock}
                    </p>

                    <div className="flex items-center gap-3 mt-3">

                      <button
                        onClick={() => dispatch(decreaseQty(index))}
                        aria-label="Decrease quantity"
                        className="bg-red-600 hover:bg-red-700 text-white w-8 h-8 rounded flex items-center justify-center font-bold text-lg"
                      >
                        -
                      </button>

                      <span className="text-white font-bold text-lg min-w-5 text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => dispatch(increaseQty(index))}
                        aria-label="Increase quantity"
                        className="bg-green-600 hover:bg-green-700 text-white w-8 h-8 rounded flex items-center justify-center font-bold text-lg"
                      >
                        +
                      </button>

                    </div>

                  </div>

                </div>

                <div className="flex justify-end sm:justify-center">
                  <button
                    onClick={() => dispatch(removeItem(index))}
                    className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition"
                  >
                    Remove
                  </button>
                </div>

              </div>

            ))}

            <div className="border-t border-purple-900/50 pt-6 mt-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-center sm:text-right text-white">
                Total : <span className="text-purple-400">₹{total.toLocaleString("en-IN")}</span>
              </h2>

              <div className="text-center sm:text-right mt-5">

                <button
                  onClick={handleCheckout}
                  className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white px-8 py-3.5 rounded-xl font-bold text-lg transition shadow-lg hover:shadow-purple-500/30"
                >
                  Proceed to Checkout →
                </button>

              </div>
            </div>

          </>

        )}

      </div>
    </div>
  );
}

export default Cart;