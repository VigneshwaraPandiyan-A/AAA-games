import { useEffect, useState } from "react";
import axios from "axios";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  // =====================================================
  // FETCH ORDERS
  // =====================================================

  const fetchOrders = async () => {
    try {
      setRefreshing(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login to view your orders.");
        return;
      }

      const response = await axios.get(
        "https://aaa-games.onrender.com/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(response.data.orders || []);
    } catch (error) {
      console.log("Fetch Orders Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load orders."
      );
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    let cancelled = false;

    const loadOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          if (!cancelled) {
            setError("Please login to view your orders.");
            setLoading(false);
          }
          return;
        }

        const response = await axios.get(
          "https://aaa-games.onrender.com/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!cancelled) {
          setOrders(response.data.orders || []);
          setError("");
          setLoading(false);
        }
      } catch (error) {
        console.log("Initial Orders Error:", error);

        if (!cancelled) {
          setError(
            error.response?.data?.message ||
              "Failed to load orders."
          );

          setLoading(false);
        }
      }
    };

    loadOrders();

    return () => {
      cancelled = true;
    };
  }, []);

  // =====================================================
  // REMOVE ORDER
  // =====================================================

 const handleRemoveOrder = async (orderId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to remove this order?"
  );

  if (!confirmDelete) {
    return;
  }

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      return;
    }

    setRefreshing(true);

    console.log("Deleting Order:", orderId);

    const response = await axios.delete(
      `https://aaa-games.onrender.com/orders/my/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Delete Response:", response.data);

    // Remove order from React state
    setOrders((currentOrders) =>
      currentOrders.filter(
        (order) => order._id !== orderId
      )
    );

    alert(
      response.data.message ||
        "Order removed successfully."
    );
  } catch (error) {
    console.log("Remove Order Error:", error);

    console.log(
      "Server Response:",
      error.response?.data
    );

    alert(
      error.response?.data?.message ||
        "Failed to remove order."
    );
  } finally {
    setRefreshing(false);
  }
};

  // =====================================================
  // LOADING SCREEN
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="text-white text-lg mt-5">
            Loading your orders...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error && orders.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-5">
        <div className="bg-zinc-900 border border-red-600 rounded-xl p-8 text-center max-w-md w-full">
          <div className="text-5xl mb-5">
            ⚠️
          </div>

          <h2 className="text-2xl text-white font-bold">
            Unable to Load Orders
          </h2>

          <p className="text-red-400 mt-3">
            {error}
          </p>

          <button
            onClick={fetchOrders}
            disabled={refreshing}
            className="mt-6 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg"
          >
            {refreshing ? "Loading..." : "Try Again"}
          </button>
        </div>
      </div>
    );
  }

  // =====================================================
  // EMPTY ORDERS
  // =====================================================

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-violet-950 via-black to-violet-950 flex items-center justify-center px-5">
        <div className="text-center">
          <div className="text-7xl mb-5">
            📦
          </div>

          <h1 className="text-3xl text-white font-bold">
            No Orders Found
          </h1>

          <p className="text-gray-400 mt-3">
            You haven't placed any orders yet.
          </p>

          <button
            onClick={fetchOrders}
            disabled={refreshing}
            className="mt-6 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg"
          >
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>
    );
  }

  // =====================================================
  // MAIN PAGE
  // =====================================================

  return (
    <div className="min-h-screen bg-linear-to-br from-violet-950 via-black to-violet-950 py-10">
      <div className="max-w-6xl mx-auto px-5">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">
              My Orders
            </h1>

            <p className="text-gray-400 mt-2">
              View and track your orders
            </p>
          </div>

          <button
            onClick={fetchOrders}
            disabled={refreshing}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg"
          >
            {refreshing
              ? "Refreshing..."
              : "Refresh Orders"}
          </button>
        </div>

        {/* ERROR MESSAGE */}

        {error && (
          <div className="bg-red-900/30 border border-red-600 text-red-400 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* ORDERS */}

        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-zinc-900 border border-purple-700 rounded-2xl p-6 mb-8 shadow-xl"
          >

            {/* ORDER HEADER */}

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 border-b border-gray-700 pb-6">

              {/* ORDER ID */}

              <div>
                <p className="text-gray-500 text-xs sm:text-sm">
                  Order ID
                </p>

                <p className="text-white font-semibold text-xs sm:text-sm break-all mt-1">
                  #{order._id}
                </p>
              </div>

              {/* DATE */}

              <div>
                <p className="text-gray-500 text-xs sm:text-sm">
                  Order Date
                </p>

                <p className="text-white text-xs sm:text-sm mt-1">
                  {order.createdAt
                    ? new Date(
                        order.createdAt
                      ).toLocaleDateString("en-IN")
                    : "N/A"}
                </p>
              </div>

              {/* TOTAL */}

              <div>
                <p className="text-gray-500 text-xs sm:text-sm">
                  Total Amount
                </p>

                <p className="text-purple-400 font-bold text-lg sm:text-xl mt-1">
                  ₹
                  {Number(
                    order.totalAmount || 0
                  ).toLocaleString("en-IN")}
                </p>
              </div>

              {/* STATUS */}

              <div>
                <p className="text-gray-500 text-xs sm:text-sm mb-2">
                  Order Status
                </p>

                <OrderStatus
                  status={order.status}
                />
              </div>

            </div>

            {/* ORDER TRACKING */}

            <div className="mt-6">
              <h2 className="text-white font-bold text-xl mb-5">
                Order Tracking
              </h2>

              <OrderTracking
                status={order.status}
              />
            </div>

            {/* ORDER ITEMS */}

            <div className="mt-8">
              <h2 className="text-white font-bold text-xl mb-4">
                Ordered Items
              </h2>

              {order.products?.map((item) => {
                const product = item.product;

                return (
                  <div
                    key={item._id}
                    className="flex flex-col sm:flex-row gap-5 border-b border-gray-800 py-5"
                  >

                    {/* IMAGE */}

                    <div>
                      <img
                        src={product?.image}
                        alt={
                          product?.title ||
                          "Product"
                        }
                        className="w-28 h-28 object-cover rounded-xl"
                      />
                    </div>

                    {/* DETAILS */}

                    <div className="flex-1">
                      <h3 className="text-white text-lg font-bold">
                        {product?.title ||
                          "Product"}
                      </h3>

                      <p className="text-gray-400 mt-2">
                        Quantity:{" "}
                        {item.quantity}
                      </p>

                      <p className="text-gray-400">
                        Price: ₹
                        {Number(
                          item.price || 0
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </p>

                      {product?.publisher && (
                        <p className="text-gray-500 text-sm mt-1">
                          Publisher:{" "}
                          {product.publisher}
                        </p>
                      )}
                    </div>

                    {/* ITEM TOTAL */}

                    <div className="sm:text-right">
                      <p className="text-gray-500 text-sm">
                        Item Total
                      </p>

                      <p className="text-purple-400 font-bold text-lg">
                        ₹
                        {(
                          Number(
                            item.price || 0
                          ) *
                          Number(
                            item.quantity || 0
                          )
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* CUSTOMER DETAILS */}

            {order.customer && (
              <div className="mt-8 border-t border-gray-700 pt-6">
                <h2 className="text-white font-bold text-xl mb-5">
                  Delivery Details
                </h2>

                <div className="grid md:grid-cols-2 gap-4">

                  <CustomerField
                    label="Name"
                    value={order.customer.name}
                  />

                  <CustomerField
                    label="Phone"
                    value={order.customer.phone}
                  />

                  <CustomerField
                    label="Email"
                    value={order.customer.email}
                  />

                  <CustomerField
                    label="Payment Method"
                    value={
                      order.customer
                        .paymentMethod
                    }
                  />

                  <div className="md:col-span-2">
                    <CustomerField
                      label="Address"
                      value={`${order.customer.address}, ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}`}
                    />
                  </div>

                </div>
              </div>
            )}

            {/* =====================================================
                REMOVE ORDER BUTTON
            ===================================================== */}

<div className="mt-8 border-t border-gray-700 pt-6 flex justify-end">

  <button
    onClick={() => handleRemoveOrder(order._id)}
    disabled={refreshing}
    className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-5 py-2 rounded-lg font-semibold"
  >
    {refreshing ? "Removing..." : "Remove Order"}
  </button>

</div>

          </div>
        ))}

      </div>
    </div>
  );
}

// =====================================================
// CUSTOMER FIELD
// =====================================================

function CustomerField({ label, value }) {
  return (
    <div>
      <p className="text-gray-500 text-sm">
        {label}
      </p>

      <p className="text-white mt-1">
        {value || "N/A"}
      </p>
    </div>
  );
}

// =====================================================
// STATUS BADGE
// =====================================================

function OrderStatus({ status }) {
  const styles = {
    Pending:
      "bg-yellow-500/20 text-yellow-400 border-yellow-500",

    Confirmed:
      "bg-blue-500/20 text-blue-400 border-blue-500",

    Delivered:
      "bg-green-500/20 text-green-400 border-green-500",

    Cancelled:
      "bg-red-500/20 text-red-400 border-red-500",
  };

  return (
    <span
      className={`inline-block px-4 py-2 rounded-full border font-bold ${
        styles[status] ||
        "bg-gray-500/20 text-gray-400 border-gray-500"
      }`}
    >
      {status || "Pending"}
    </span>
  );
}

// =====================================================
// ORDER TRACKING
// =====================================================

function OrderTracking({ status }) {
  if (status === "Cancelled") {
    return (
      <div className="bg-red-900/20 border border-red-700 rounded-xl p-4 sm:p-5">
        <p className="text-red-400 font-bold text-base sm:text-lg">
          ❌ Order Cancelled
        </p>

        <p className="text-gray-400 text-xs sm:text-sm mt-1">
          This order has been cancelled.
        </p>
      </div>
    );
  }

  const steps = [
    {
      name: "Order Placed",
      active: true,
      icon: "🛒",
    },
    {
      name: "Confirmed",
      active:
        status === "Confirmed" ||
        status === "Delivered",
      icon: "✅",
    },
    {
      name: "Delivered",
      active:
        status === "Delivered",
      icon: "📦",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">

      {steps.map((step, index) => (
        <div
          key={step.name}
          className="text-center"
        >

          <div
            className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-full flex items-center justify-center text-base sm:text-xl ${
              step.active
                ? "bg-purple-600"
                : "bg-zinc-800"
            }`}
          >
            {step.icon}
          </div>

          <p
            className={`text-xs sm:text-sm mt-2 ${
              step.active
                ? "text-purple-400 font-bold"
                : "text-gray-600"
            }`}
          >
            {step.name}
          </p>

          {index < steps.length - 1 && (
            <div
              className={`hidden md:block h-1 mt-4 ${
                steps[index + 1].active
                  ? "bg-purple-600"
                  : "bg-zinc-800"
              }`}
            />
          )}

        </div>
      ))}

    </div>
  );
}

export default MyOrders;