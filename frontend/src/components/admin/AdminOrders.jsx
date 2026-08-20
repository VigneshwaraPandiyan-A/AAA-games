import { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://aaa-games.onrender.com/admin/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(res.data.orders);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {
    let isMounted = true;
    const getOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://aaa-games.onrender.com/admin/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (isMounted) {
          setOrders(res.data.orders);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getOrders();

    return () => {
      isMounted = false;
    };
  }, []);

  // ==============================
  // UPDATE STATUS
  // ==============================

  const updateStatus = async (id, status) => {

    try {

      const token = localStorage.getItem("token");

      await axios.put(
        `https://aaa-games.onrender.com/admin/orders/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchOrders();

    } catch (error) {

      console.log(error);

    }

  };

  // ==============================
  // DELETE ORDER
  // ==============================

  const deleteOrder = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `https://aaa-games.onrender.com/admin/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchOrders();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen bg-black text-white p-4 sm:p-10">

      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center sm:text-left">
        Customer Orders
      </h1>

      {

        orders.length === 0 ?

        (

          <div className="bg-zinc-900 border border-purple-800/40 rounded-xl p-8 text-center">
            <h2 className="text-xl">No Orders Found</h2>
          </div>

        )

        :

        (

          orders.map((order)=>(

            <div
              key={order._id}
              className="bg-zinc-900 border border-purple-600 rounded-xl p-4 sm:p-6 mb-8 shadow-lg"
            >

              {/* Customer */}

              <div className="mb-5 border-b border-gray-800 pb-4">

                <h2 className="text-xl sm:text-2xl font-bold text-purple-400 mb-2">
                  Customer Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm sm:text-base">
                  <p>
                    <b>Name :</b> {order.customer?.name}
                  </p>

                  <p className="break-all">
                    <b>Email :</b> {order.customer?.email}
                  </p>

                  <p>
                    <b>Phone :</b> {order.customer?.phone}
                  </p>

                  <p>
                    <b>Payment :</b> {order.customer?.paymentMethod}
                  </p>

                  <p className="sm:col-span-2">
                    <b>Address :</b> {order.customer?.address}, {order.customer?.city}, {order.customer?.state} - {order.customer?.pincode}
                  </p>
                </div>

              </div>

              {/* Products */}

              <h2 className="text-xl sm:text-2xl font-bold text-purple-400 mb-4">
                Ordered Items
              </h2>

              {
                order.products?.map((item) => {
                  const image = item.product?.image || item.image || "";
                  const title = item.product?.title || item.title || "Product";
                  const publisher = item.product?.publisher || item.publisher || "N/A";
                  const category = Array.isArray(item.product?.category)
                    ? item.product.category.join(", ")
                    : Array.isArray(item.category)
                    ? item.category.join(", ")
                    : item.category || "N/A";
                  const platform = Array.isArray(item.product?.platform)
                    ? item.product.platform.join(", ")
                    : Array.isArray(item.platform)
                    ? item.platform.join(", ")
                    : item.platform || "N/A";

                  return (
                    <div
                      key={item._id}
                      className="flex flex-col sm:flex-row gap-4 border-b border-gray-800 py-4 items-start sm:items-center"
                    >
                      <img
                        src={image}
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg object-cover shrink-0"
                        alt={title}
                      />

                      <div className="text-sm sm:text-base">
                        <h2 className="text-lg sm:text-2xl font-bold">
                          {title}
                        </h2>

                        <p className="text-gray-300">
                          Publisher : {publisher}
                        </p>

                        <p className="text-gray-300">
                          Category : {category}
                        </p>

                        <p className="text-gray-300">
                          Platform : {platform}
                        </p>

                        <p className="text-gray-300">
                          Qty : {item.quantity}
                        </p>

                        <p className="text-purple-400 font-bold">
                          Price : ₹{item.price}
                        </p>
                      </div>
                    </div>
                  );
                })
              }

              {/* Footer */}

              <div className="mt-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4 pt-2">

                <div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-purple-400">
                    Total : ₹{order.totalAmount}
                  </h2>

                  <p className="text-gray-400 text-xs sm:text-sm break-all mt-1">
                    Order ID : #{order._id}
                  </p>

                </div>

                <div className="flex gap-3 items-center">

                  <select
                    value={order.status}
                    onChange={(e)=>
                      updateStatus(
                        order._id,
                        e.target.value
                      )
                    }
                    className="bg-black border border-purple-600 rounded px-4 py-2 text-sm sm:text-base text-white"
                  >

                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>

                  </select>

                  <button
                    onClick={()=>deleteOrder(order._id)}
                    className="bg-red-600 hover:bg-red-700 font-semibold px-5 py-2 rounded text-sm sm:text-base transition"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))

        )

      }

    </div>

  );

}

export default AdminOrders;