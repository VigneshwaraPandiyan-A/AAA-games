import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://aaa-games.onrender.com/register",
        formData
      );

      alert(response.data.message);

      navigate("/signin");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-purple-950 flex justify-center items-center">

      <div className="bg-gray-900 border border-purple-700 rounded-2xl shadow-2xl p-10 w-96">

        <h1 className="text-4xl font-bold text-center text-purple-500">
          Join AAA Games
        </h1>

        <p className="text-center text-gray-400 mt-2 mb-8">
          Create your gaming account.
        </p>

        <form onSubmit={handleRegister}>

          <label className="text-gray-300">Username</label>

          <input
            type="text"
            name="name"
            placeholder="Enter Username"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full mt-2 mb-5 p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 outline-none"
          />

          <label className="text-gray-300">Email</label>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full mt-2 mb-5 p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 outline-none"
          />

          <label className="text-gray-300">Password</label>

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full mt-2 mb-6 p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition text-white py-3 rounded-lg font-semibold"
          >
            Register
          </button>

        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-purple-400 hover:underline"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
};

export default SignUp;