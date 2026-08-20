import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://aaa-games.onrender.com/products");
      setProducts(res.data.products);
    } catch (err) {
      console.log(err);
    }
  };

useEffect(() => {
  async function fetchProducts() {
    try {
      const res = await axios.get("https://aaa-games.onrender.com/products");
      setProducts(res.data.products);
    } catch (error) {
      console.error(error);
    }
  }

  fetchProducts();
}, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `https://aaa-games.onrender.com/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product Deleted");

      fetchProducts();
    } catch (error) {
  console.error(error);
}
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-10">

      <h1 className="text-3xl sm:text-4xl font-bold text-center text-purple-500 mb-8 sm:mb-10">
        Manage Products
      </h1>

      {/* Mobile Cards View */}
      <div className="block md:hidden space-y-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-zinc-900 border border-purple-700 rounded-xl p-4 flex flex-col gap-3"
          >
            <div className="flex gap-4 items-center">
              <img
                src={product.image}
                alt={product.title}
                className="w-20 h-20 object-cover rounded-lg shrink-0"
              />
              <div>
                <h3 className="font-bold text-white text-lg">{product.title}</h3>
                <p className="text-purple-400 font-bold">₹{product.price}</p>
                <p className="text-gray-400 text-xs mt-0.5">Stock: {product.quantity}</p>
                <p className="text-gray-400 text-xs">
                  Platform:{" "}
                  {Array.isArray(product.platform)
                    ? product.platform.join(", ")
                    : product.platform}
                </p>
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-gray-800">
              <Link to={`/admin/edit/${product._id}`} className="flex-1">
                <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded text-sm">
                  Edit
                </button>
              </Link>
              <button
                onClick={() => deleteProduct(product._id)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">

        <table className="w-full border border-purple-700">

          <thead>

            <tr className="bg-purple-700">

              <th className="p-4">Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Platform</th>
              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {products.map((product) => (

              <tr
                key={product._id}
                className="border-b border-gray-700 text-center"
              >

                <td className="p-3">

                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-24 h-20 object-cover mx-auto rounded"
                  />

                </td>

                <td>{product.title}</td>

                <td>₹{product.price}</td>

                <td>{product.quantity}</td>

                <td>
                  {Array.isArray(product.platform)
                    ? product.platform.join(", ")
                    : product.platform}
                </td>

                <td>

                  <Link to={`/admin/edit/${product._id}`}>
                    <button className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded mr-2 text-black font-semibold">
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminProducts;