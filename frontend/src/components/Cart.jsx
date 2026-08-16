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
      <div className="max-w-5xl mx-auto p-8">

        <h1 className="text-2xl font-bold text-white mb-10">
          🛒 Your Shopping Cart
        </h1>

        {cart.length === 0 ? (

          <h2 className="text-white text-xl">
            Your cart is empty.
          </h2>

        ) : (

          <>
            {cart.map((item, index) => (

              <div
                key={index}
                className="flex justify-between items-center bg-zinc-900 border border-purple-600 rounded-xl p-5 mb-5 shadow-lg hover:shadow-purple-500/40 duration-300"
              >

                <div className="flex gap-5 items-center">

                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-32 h-32 object-cover rounded"
                  />

                  <div>

                    <h2 className="text-2xl font-bold text-white">
                      {item.title}
                    </h2>

                    <p className="text-purple-400 font-bold">
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>

                    <p className="text-gray-400">
                      Stock : {item.availableStock}
                    </p>

                    <div className="flex gap-3 mt-3">

                      <button
                        onClick={() => dispatch(decreaseQty(index))}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 rounded"
                      >
                        -
                      </button>

                      <span className="text-white font-bold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => dispatch(increaseQty(index))}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 rounded"
                      >
                        +
                      </button>

                    </div>

                  </div>

                </div>

                <button
                  onClick={() => dispatch(removeItem(index))}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                >
                  Remove
                </button>

              </div>

            ))}

            <h2 className="text-3xl font-bold text-right text-white mt-8">
              Total : ₹{total.toLocaleString("en-IN")}
            </h2>

            <div className="text-right mt-5">

              <button
                onClick={handleCheckout}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg"
              >
                Checkout
              </button>

            </div>

          </>

        )}

      </div>
    </div>
  );
}

export default Cart;