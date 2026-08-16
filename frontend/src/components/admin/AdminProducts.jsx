import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products");
      setProducts(res.data.products);
    } catch (err) {
      console.log(err);
    }
  };

useEffect(() => {
  async function fetchProducts() {
    try {
      const res = await axios.get("http://localhost:3000/products");
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
        `http://localhost:3000/products/${id}`,
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
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold text-center text-purple-500 mb-10">
        Manage Products
      </h1>

      <div className="overflow-x-auto">

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
  <button className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded mr-2">
    Edit
  </button>
</Link>

                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="bg-red-600 px-4 py-2 rounded"
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