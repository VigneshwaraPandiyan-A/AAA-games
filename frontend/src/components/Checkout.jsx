import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { checkout } from "../features/cart/cartSlice";

function Checkout() {
  const cart = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "Cash On Delivery",
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = async () => {
    if (
      !customer.name ||
      !customer.phone ||
      !customer.address ||
      !customer.city ||
      !customer.state ||
      !customer.pincode
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "https://aaa-games.onrender.com/orders",
        {
          items: cart,
          customer,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("🎉 Order Placed Successfully");

dispatch(checkout());

navigate("/order-success",{

state:{
order:res.data.order
}

});

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Order Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-violet-950 via-black to-violet-950 py-6 sm:py-10 px-4">

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">

        <div className="bg-zinc-900 p-5 sm:p-8 rounded-xl border border-purple-700">

          <h2 className="text-2xl sm:text-3xl text-white font-bold mb-6">
            Customer Details
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={customer.name}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded bg-black text-white border border-gray-800 focus:border-purple-500 outline-none"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={customer.phone}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded bg-black text-white border border-gray-800 focus:border-purple-500 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={customer.email}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded bg-black text-white border border-gray-800 focus:border-purple-500 outline-none"
          />

          <textarea
            name="address"
            placeholder="Address"
            value={customer.address}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded bg-black text-white border border-gray-800 focus:border-purple-500 outline-none"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={customer.city}
              onChange={handleChange}
              className="w-full p-3 rounded bg-black text-white border border-gray-800 focus:border-purple-500 outline-none"
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              value={customer.state}
              onChange={handleChange}
              className="w-full p-3 rounded bg-black text-white border border-gray-800 focus:border-purple-500 outline-none"
            />
          </div>

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={customer.pincode}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded bg-black text-white border border-gray-800 focus:border-purple-500 outline-none"
          />

          <select
            name="paymentMethod"
            value={customer.paymentMethod}
            onChange={handleChange}
            className="w-full p-3 rounded bg-black text-white border border-gray-800 focus:border-purple-500 outline-none"
          >
            <option>Cash On Delivery</option>
            <option>UPI</option>
            <option>Credit Card</option>
            <option>Debit Card</option>
            <option>Net Banking</option>
          </select>

        </div>

        <div className="bg-zinc-900 p-5 sm:p-8 rounded-xl border border-purple-700 flex flex-col justify-between">

          <div>
            <h2 className="text-2xl sm:text-3xl text-white font-bold mb-6">
              Order Summary
            </h2>

            {cart.map((item) => (

              <div
                key={item._id}
                className="flex items-center justify-between mb-4 border-b border-gray-800 pb-4 gap-3"
              >

                <div className="flex items-center gap-3 sm:gap-4">

                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded object-cover shrink-0"
                  />

                  <div>

                    <h3 className="text-white font-bold text-sm sm:text-base line-clamp-1">
                      {item.title}
                    </h3>

                    <p className="text-gray-400 text-xs sm:text-sm mt-1">
                      Qty : {item.quantity}
                    </p>

                  </div>

                </div>

                <h3 className="text-purple-400 font-bold text-sm sm:text-base shrink-0">
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </h3>

              </div>

            ))}
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-6 pt-4 border-t border-gray-800 flex justify-between items-center">
              <span>Total :</span>
              <span className="text-purple-400">₹{total.toLocaleString("en-IN")}</span>
            </h2>

            <button
              onClick={placeOrder}
              className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-3.5 sm:py-4 rounded-lg text-base sm:text-lg font-bold transition shadow-lg hover:shadow-purple-500/30"
            >
              Confirm Order
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;