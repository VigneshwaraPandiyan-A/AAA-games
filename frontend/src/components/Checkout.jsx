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

      const response = await axios.post(
        "http://localhost:3000/orders",
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

      navigate("/order-success", {
        state: { order: response.data.order },
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
    <div className="min-h-screen bg-linear-to-br from-violet-950 via-black to-violet-950 py-10">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        <div className="bg-zinc-900 p-8 rounded-xl border border-purple-700">

          <h2 className="text-3xl text-white font-bold mb-6">
            Customer Details
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={customer.name}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded bg-black text-white"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={customer.phone}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded bg-black text-white"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={customer.email}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded bg-black text-white"
          />

          <textarea
            name="address"
            placeholder="Address"
            value={customer.address}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded bg-black text-white"
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={customer.city}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded bg-black text-white"
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={customer.state}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded bg-black text-white"
          />

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={customer.pincode}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded bg-black text-white"
          />

          <select
            name="paymentMethod"
            value={customer.paymentMethod}
            onChange={handleChange}
            className="w-full p-3 rounded bg-black text-white"
          >
            <option>Cash On Delivery</option>
            <option>UPI</option>
            <option>Credit Card</option>
            <option>Debit Card</option>
            <option>Net Banking</option>
          </select>

        </div>

        <div className="bg-zinc-900 p-8 rounded-xl border border-purple-700">

          <h2 className="text-3xl text-white font-bold mb-6">
            Order Summary
          </h2>

          {cart.map((item) => (

            <div
              key={item._id}
              className="flex justify-between mb-5 border-b border-gray-700 pb-4"
            >

              <div className="flex gap-4">

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 rounded object-cover"
                />

                <div>

                  <h3 className="text-white font-bold">
                    {item.title}
                  </h3>

                  <p className="text-gray-400">
                    Qty : {item.quantity}
                  </p>

                </div>

              </div>

              <h3 className="text-purple-400 font-bold">
                ₹{item.price * item.quantity}
              </h3>

            </div>

          ))}

          <h2 className="text-3xl font-bold text-white mt-8">
            Total : ₹{total.toLocaleString("en-IN")}
          </h2>

          <button
            onClick={placeOrder}
            className="w-full mt-8 bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-lg text-lg font-bold"
          >
            Confirm Order
          </button>

        </div>

      </div>

    </div>
  );
}

export default Checkout;