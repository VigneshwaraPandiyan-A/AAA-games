import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

const [product, setProduct] = useState({
  title: "",
  description: "",
  category: [],
  platform: [],
  price: "",
  quantity: "",
  publisher: "",
  image: "",
});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://aaa-games.onrender.com/products/${id}`
        );

        const fetched = response.data.product || {};
        setProduct({
          ...fetched,
          category: Array.isArray(fetched.category) ? fetched.category : [],
          platform: Array.isArray(fetched.platform) ? fetched.platform : [],
        });
      } catch (error) {
        console.error(error);
        alert("Failed to load product");
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckbox = (e) => {
    const { name, value, checked } = e.target;

    setProduct((prev) => {
      const currentArr = Array.isArray(prev[name]) ? prev[name] : [];
      return {
        ...prev,
        [name]: checked
          ? [...currentArr, value]
          : currentArr.filter((item) => item !== value),
      };
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `https://aaa-games.onrender.com/products/${id}`,
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product Updated Successfully");

      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      alert("Update Failed");
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center py-6 sm:py-10 px-4">

      <form
        onSubmit={handleUpdate}
        className="bg-gray-900 border border-purple-700 rounded-xl p-5 sm:p-8 w-full max-w-3xl"
      >

        <h1 className="text-2xl sm:text-4xl font-bold text-yellow-500 text-center mb-6 sm:mb-8">
          Edit Product
        </h1>

        <label className="text-white font-semibold">
          Title
        </label>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={product.title}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-800 text-white border border-gray-700 outline-none"
        />

        <label className="text-white font-semibold">
          Description
        </label>

        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-800 text-white border border-gray-700 outline-none"
        />

        <label className="text-white font-semibold">
          Image
        </label>

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={product.image}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-800 text-white border border-gray-700 outline-none"
        />

        <label className="text-white font-semibold">
          Publisher
        </label>

        <input
          type="text"
          name="publisher"
          placeholder="Publisher"
          value={product.publisher}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-800 text-white border border-gray-700 outline-none"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            <label className="text-white font-semibold">
            Price
          </label>

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            className="p-3 rounded bg-gray-800 text-white"
          />

                            <label className="text-white font-semibold">
            Quantity
          </label>

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={product.quantity}
            onChange={handleChange}
            className="p-3 rounded bg-gray-800 text-white"
          />

<div className="mb-4">
  <label className="text-white font-semibold">
    Category
  </label>

  <div className="grid grid-cols-2 gap-2 mt-2">

    <label className="text-white">
      <input
        type="checkbox"
        name="category"
        value="Action"
        checked={product.category?.includes("Action")}
        onChange={handleCheckbox}
      />
      {" "}Action
    </label>

    <label className="text-white">
      <input
        type="checkbox"
        name="category"
        value="Adventure"
        checked={product.category?.includes("Adventure")}
        onChange={handleCheckbox}
      />
      {" "}Adventure
    </label>

    <label className="text-white">
      <input
        type="checkbox"
        name="category"
        value="RPG"
        checked={product.category?.includes("RPG")}
        onChange={handleCheckbox}
      />
      {" "}RPG
    </label>

    <label className="text-white">
      <input
        type="checkbox"
        name="category"
        value="Shooter"
        checked={product.category?.includes("Shooter")}
        onChange={handleCheckbox}
      />
      {" "}Shooter
    </label>

    <label className="text-white">
      <input
        type="checkbox"
        name="category"
        value="Open World"
        checked={product.category?.includes("Open World")}
        onChange={handleCheckbox}
      />
      {" "}Open World
    </label>

    <label className="text-white">
      <input
        type="checkbox"
        name="category"
        value="Racing"
        checked={product.category?.includes("Racing")}
        onChange={handleCheckbox}
      />
      {" "}Racing
    </label>

  </div>
</div>

         <div className="mb-4">
  <label className="text-white font-semibold">
    Platform
  </label>

  <div className="grid grid-cols-2 gap-2 mt-2">

    <label className="text-white">
      <input
        type="checkbox"
        name="platform"
        value="PS5"
        checked={product.platform?.includes("PS5")}
        onChange={handleCheckbox}
      />
      {" "}PS5
    </label>

    <label className="text-white">
      <input
        type="checkbox"
        name="platform"
        value="PC"
        checked={product.platform?.includes("PC")}
        onChange={handleCheckbox}
      />
      {" "}PC
    </label>

    <label className="text-white">
      <input
        type="checkbox"
        name="platform"
        value="Xbox"
        checked={product.platform?.includes("Xbox")}
        onChange={handleCheckbox}
      />
      {" "}Xbox
    </label>

    <label className="text-white">
      <input
        type="checkbox"
        name="platform"
        value="Steam"
        checked={product.platform?.includes("Steam")}
        onChange={handleCheckbox}
      />
      {" "}Steam
    </label>

  </div>
</div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded"
        >
          Update Product
        </button>

      </form>

    </div>
  );
}

export default EditProduct;