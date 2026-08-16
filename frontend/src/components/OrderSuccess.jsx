import { useLocation, useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const order = location.state?.order;

  if (!order) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-black text-white">
        <h1>No Order Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-violet-950 via-black to-violet-950 flex justify-center items-center py-10">

      <div className="bg-zinc-900 border border-purple-600 rounded-2xl shadow-lg p-10 max-w-2xl w-full">

        <div className="text-center">

          <div className="text-7xl">
            ✅
          </div>

          <h1 className="text-4xl text-green-400 font-bold mt-4">
            Order Placed Successfully
          </h1>

          <p className="text-gray-400 mt-2">
            Thank you for shopping with us.
          </p>

        </div>

        <hr className="my-8 border-gray-700" />

        <h2 className="text-2xl text-white font-bold mb-5">
          Order Details
        </h2>

        <div className="space-y-3 text-white">

          <p>
            <span className="font-bold">
              Order ID :
            </span>{" "}
            {order._id}
          </p>

          {order.customer && (
            <>
              <p>
                <span className="font-bold">
                  Customer :
                </span>{" "}
                {order.customer.name}
              </p>

              <p>
                <span className="font-bold">
                  Phone :
                </span>{" "}
                {order.customer.phone}
              </p>

              <p>
                <span className="font-bold">
                  Email :
                </span>{" "}
                {order.customer.email}
              </p>

              <p>
                <span className="font-bold">
                  Address :
                </span>{" "}
                {order.customer.address},{" "}
                {order.customer.city},{" "}
                {order.customer.state}
                {" - "}
                {order.customer.pincode}
              </p>

              <p>
                <span className="font-bold">
                  Payment :
                </span>{" "}
                {order.customer.paymentMethod}
              </p>
            </>
          )}

          <p>
            <span className="font-bold">
              Status :
            </span>{" "}
            <span className="text-yellow-400">
              {order.status}
            </span>
          </p>

        </div>

        <hr className="my-8 border-gray-700" />

        <h2 className="text-2xl text-white font-bold mb-4">
          Ordered Products
        </h2>

        {order.products?.map((item, idx) => {
          const productTitle = item.product?.title || item.title || "Game Product";
          const itemKey = item.product?._id || item._id || idx;

          return (
            <div
              key={itemKey}
              className="flex justify-between border-b border-gray-700 py-4"
            >

              <div>

                <h3 className="text-white font-bold">
                  {productTitle}
                </h3>

                <p className="text-gray-400">
                  Qty : {item.quantity}
                </p>

              </div>

              <h3 className="text-purple-400 font-bold">
                ₹{(item.price * item.quantity).toLocaleString("en-IN")}
              </h3>

            </div>
          );
        })}

        <div className="flex justify-between mt-8">

          <h2 className="text-2xl font-bold text-white">
            Total
          </h2>

          <h2 className="text-3xl font-bold text-green-400">
            ₹{order.totalAmount.toLocaleString("en-IN")}
          </h2>

        </div>

        <button
          onClick={() => navigate("/")}
          className="w-full mt-10 bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-lg text-lg font-bold"
        >
          Continue Shopping
        </button>

      </div>

    </div>
  );
}

export default OrderSuccess;