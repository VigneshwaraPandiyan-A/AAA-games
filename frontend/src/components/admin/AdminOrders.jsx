import { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:3000/admin/orders",
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
          "http://localhost:3000/admin/orders",
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
        `http://localhost:3000/admin/orders/${id}`,
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
        `http://localhost:3000/admin/orders/${id}`,
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

    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold mb-8">
        Customer Orders
      </h1>

      {

        orders.length === 0 ?

        (

          <h2>No Orders Found</h2>

        )

        :

        (

          orders.map((order)=>(

            <div
              key={order._id}
              className="bg-zinc-900 border border-purple-600 rounded-xl p-6 mb-10"
            >

              {/* Customer */}

              <div className="mb-5">

                <h2 className="text-2xl font-bold text-purple-400">
                  Customer Details
                </h2>

                <p>
                  <b>Name :</b> {order.customer?.name}
                </p>

                <p>
                  <b>Email :</b> {order.customer?.email}
                </p>

                <p>
                  <b>Phone :</b> {order.customer?.phone}
                </p>

                <p>
                  <b>Address :</b> {order.customer?.address}
                </p>

                <p>
                  <b>City :</b> {order.customer?.city}
                </p>

                <p>
                  <b>State :</b> {order.customer?.state}
                </p>

                <p>
                  <b>Pincode :</b> {order.customer?.pincode}
                </p>

                <p>
                  <b>Payment :</b> {order.customer?.paymentMethod}
                </p>

              </div>

              {/* Products */}

              <h2 className="text-2xl font-bold text-purple-400 mb-5">
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
                      className="flex gap-5 border-b border-gray-700 py-4"
                    >
                      <img
                        src={image}
                        className="w-32 h-32 rounded object-cover"
                        alt={title}
                      />

                      <div>
                        <h2 className="text-2xl font-bold">
                          {title}
                        </h2>

                        <p>
                          Publisher : {publisher}
                        </p>

                        <p>
                          Category : {category}
                        </p>

                        <p>
                          Platform : {platform}
                        </p>

                        <p>
                          Qty : {item.quantity}
                        </p>

                        <p>
                          Price : ₹{item.price}
                        </p>
                      </div>
                    </div>
                  );
                })
              }

              {/* Footer */}

              <div className="mt-6 flex justify-between items-center">

                <div>

                  <h2 className="text-3xl font-bold">
                    Total :
                    ₹{order.totalAmount}
                  </h2>

                  <p>
                    Order Id :
                    {order._id}
                  </p>

                </div>

                <div className="flex gap-3">

                  <select
                    value={order.status}
                    onChange={(e)=>
                      updateStatus(
                        order._id,
                        e.target.value
                      )
                    }
                    className="bg-black border border-purple-600 rounded px-4 py-2"
                  >

                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>

                  </select>

                  <button
                    onClick={()=>deleteOrder(order._id)}
                    className="bg-red-600 px-5 rounded"
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