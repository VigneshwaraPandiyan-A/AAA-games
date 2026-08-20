import { useState } from "react";
import axios from "axios";

function AddProduct() {
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

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckbox = (e) => {
  const { name, value, checked } = e.target;

  setProduct((prev) => ({
    ...prev,
    [name]: checked
      ? [...prev[name], value]
      : prev[name].filter((item) => item !== value),
  }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://aaa-games.onrender.com/create",
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product Added Successfully!");

setProduct({
  title: "",
  description: "",
  category: [],
  platform: [],
  price: "",
  quantity: "",
  publisher: "",
  image: "",
});
    } catch (error) {
      alert(error.response?.data?.message || "Failed to Add Product");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-purple-950 flex justify-center items-center py-6 sm:py-10 px-4">

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 border border-purple-600 rounded-xl p-5 sm:p-8 w-full max-w-2xl"
      >
        <h1 className="text-2xl sm:text-4xl font-bold text-center text-green-500 mb-6 sm:mb-8">
          Add New Game
        </h1>

        <input
          type="text"
          name="title"
          placeholder="Game Title"
          value={product.title}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 rounded bg-gray-800 text-white border border-gray-700 outline-none"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 rounded bg-gray-800 text-white border border-gray-700 outline-none"
        />

        <input
          type="text"
          name="publisher"
          placeholder="Publisher"
          value={product.publisher}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 rounded bg-gray-800 text-white border border-gray-700 outline-none"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={product.image}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 rounded bg-gray-800 text-white border border-gray-700 outline-none"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">


          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            required
            className="p-3 rounded bg-gray-800 text-white"
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={product.quantity}
            onChange={handleChange}
            required
            className="p-3 rounded bg-gray-800 text-white"
          />

          <div>
  <label className="text-white font-semibold block mb-2">
    Category
  </label>

  <div className="grid grid-cols-2 gap-2 text-white">

    <label>
      <input
        type="checkbox"
        name="category"
        value="Action"
        checked={product.category?.includes("Action")}
        onChange={handleCheckbox}
      />
      {" "}Action
    </label>

    <label>
      <input
        type="checkbox"
        name="category"
        value="Adventure"
        checked={product.category?.includes("Adventure")}
        onChange={handleCheckbox}
      />
      {" "}Adventure
    </label>

    <label>
      <input
        type="checkbox"
        name="category"
        value="RPG"
        checked={product.category?.includes("RPG")}
        onChange={handleCheckbox}
      />
      {" "}RPG
    </label>

    <label>
      <input
        type="checkbox"
        name="category"
        value="Shooter"
        checked={product.category?.includes("Shooter")}
        onChange={handleCheckbox}
      />
      {" "}Shooter
    </label>

    <label>
      <input
        type="checkbox"
        name="category"
        value="Open World"
        checked={product.category?.includes("Open World")}
        onChange={handleCheckbox}
      />
      {" "}Open World
    </label>

    <label>
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

<div>
  <label className="text-white font-semibold block mb-2">
    Platform
  </label>

  <div className="grid grid-cols-2 gap-2 text-white">

    <label>
      <input
        type="checkbox"
        name="platform"
        value="PS5"
        checked={product.platform?.includes("PS5")}
        onChange={handleCheckbox}
      />
      {" "}PS5
    </label>

    <label>
      <input
        type="checkbox"
        name="platform"
        value="PC"
        checked={product.platform?.includes("PC")}
        onChange={handleCheckbox}
      />
      {" "}PC
    </label>

    <label>
      <input
        type="checkbox"
        name="platform"
        value="Xbox"
        checked={product.platform?.includes("Xbox")}
        onChange={handleCheckbox}
      />
      {" "}Xbox
    </label>

    <label>
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
          className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold"
        >
          Add Product
        </button>

      </form>

    </div>
  );
}

export default AddProduct;