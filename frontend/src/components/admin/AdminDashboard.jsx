import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-purple-950 text-white p-4 sm:p-10">

      <h1 className="text-3xl sm:text-5xl font-bold text-center text-red-500 mb-8 sm:mb-12">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 max-w-6xl mx-auto">

        {/* Manage Products */}
        <Link
          to="/admin/products"
          className="bg-gray-900 border border-green-500 rounded-xl p-6 sm:p-8 hover:scale-105 duration-300 shadow-lg hover:shadow-green-500 flex flex-col justify-between"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">✏️ Edit Product</h2>

          <p className="text-gray-400 text-sm sm:text-base">
            Update existing games
          </p>
        </Link>

        {/* Add Product */}
        <Link
          to="/admin/add-product"
          className="bg-gray-900 border border-green-500 rounded-xl p-6 sm:p-8 hover:scale-105 duration-300 shadow-lg hover:shadow-green-500 flex flex-col justify-between"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            ➕ Add Product
          </h2>

          <p className="text-gray-400 text-sm sm:text-base">
            Add New Game Product
          </p>
        </Link>

        <Link
          to="/admin/orders"
          className="bg-gray-900 border border-green-500 rounded-xl p-6 sm:p-8 hover:scale-105 duration-300 shadow-lg hover:shadow-green-500 flex flex-col justify-between"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            🚚 Manage Orders
          </h2>

          <p className="text-gray-400 text-sm sm:text-base">
            View and manage customer orders.
          </p>
        </Link>

      </div>

    </div>
  );
}

export default AdminDashboard;