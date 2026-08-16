import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-purple-950 text-white p-10">

      <h1 className="text-5xl font-bold text-center text-red-500 mb-12">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

        {/* Manage Products */}
        <Link
          to="/admin/products"
          className="bg-gray-900 border border-green-500 rounded-xl p-8 hover:scale-105 duration-300 shadow-lg hover:shadow-green-500"
        >
          <h2 className="text-4xl font-bold mb-4">✏️ Edit Product</h2>

          <p className="text-gray-400 text-lg">
            Update existing games
          </p>
        </Link>

        {/* Add Product */}
        <Link
          to="/admin/add-product"
          className="bg-gray-900 border border-green-500 rounded-xl p-8 hover:scale-105 duration-300 shadow-lg hover:shadow-green-500"
        >
          <h2 className="text-4xl font-bold mb-4">
            ➕ Add Product
          </h2>

          <p className="text-gray-400 text-lg">
            Add New Game Product
          </p>
        </Link>

        <Link
    to="/admin/orders"
   className="bg-gray-900 border border-green-500 rounded-xl p-8 hover:scale-105 duration-300 shadow-lg hover:shadow-green-500"
>
  <h2 className="text-4xl font-bold mb-4">
    🚚 Manage Orders
    </h2>

    <p className="text-gray-400 text-lg">
        View and manage customer orders.
    </p>

</Link>

      </div>

    </div>
  );
}

export default AdminDashboard;