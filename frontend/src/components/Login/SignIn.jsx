import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import { login } from "../../features/auth/authSlice";

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [loginType, setLoginType] = useState("user");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [googleLoading, setGoogleLoading] = useState(false);

  // =========================
  // NORMAL INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // NORMAL LOGIN
  // =========================

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://aaa-games.onrender.com/login",
        formData
      );

      const { user, token } = response.data;

      // =========================
      // ADMIN LOGIN
      // =========================

      if (loginType === "admin") {
        if (user.role !== "admin") {
          alert("You are not an administrator.");
          return;
        }

        dispatch(
          login({
            user,
            token,
          })
        );

        alert("Admin Login Successful!");

        navigate("/admin/dashboard");
        return;
      }

      // =========================
      // CUSTOMER LOGIN
      // =========================

      if (user.role !== "user") {
        alert("Please use Admin Login.");
        return;
      }

      dispatch(
        login({
          user,
          token,
        })
      );

      alert("Login Successful!");

      navigate(from, {
        replace: true,
      });
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  // =========================
  // GOOGLE LOGIN
  // =========================

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setGoogleLoading(true);

      if (!credentialResponse?.credential) {
        alert("Google login failed.");
        return;
      }

      // Decode Google token
      const googleUser = jwtDecode(
        credentialResponse.credential
      );

      console.log("Google User:", googleUser);

      /*
        For now this creates the frontend login
        using the Google credential.

        Later we can send this credential to
        your backend and verify it there.
      */

      const user = {
        name: googleUser.name,
        email: googleUser.email,
        role: "user",
        picture: googleUser.picture,
      };

      dispatch(
        login({
          user,
          token: credentialResponse.credential,
        })
      );

      alert("Google Login Successful!");

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      console.error("Google Login Error:", error);

      alert("Google Login Failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  // =========================
  // GOOGLE LOGIN ERROR
  // =========================

  const handleGoogleError = () => {
    console.log("Google Login Failed");
    alert("Google Login Failed");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-purple-950 flex justify-center items-center px-4 py-8">

      <div className="bg-gray-900 border border-purple-700 rounded-2xl shadow-2xl p-6 sm:p-10 w-full max-w-md">

        {/* =========================
            TITLE
        ========================= */}

        <h1 className="text-4xl font-bold text-center text-purple-500">
          Welcome Back
        </h1>

        {/* =========================
            LOGIN TYPE
        ========================= */}

        <div className="flex bg-gray-800 rounded-lg p-1 mt-6 mb-6">

          <button
            type="button"
            onClick={() => setLoginType("user")}
            className={`w-1/2 py-2 rounded-lg font-semibold transition ${
              loginType === "user"
                ? "bg-purple-600 text-white"
                : "text-gray-400"
            }`}
          >
            Customer Login
          </button>

          <button
            type="button"
            onClick={() => setLoginType("admin")}
            className={`w-1/2 py-2 rounded-lg font-semibold transition ${
              loginType === "admin"
                ? "bg-red-600 text-white"
                : "text-gray-400"
            }`}
          >
            Admin Login
          </button>

        </div>

        <p className="text-center text-gray-400 mt-2 mb-8">
          Login to continue your gaming journey.
        </p>

        {/* =========================
            NORMAL LOGIN FORM
        ========================= */}

        <form onSubmit={handleLogin}>

          {/* EMAIL */}

          <label className="text-gray-300">
            Email
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
            className="w-full mt-2 mb-5 p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 outline-none"
          />

          {/* PASSWORD */}

          <label className="text-gray-300">
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
            className="w-full mt-2 mb-6 p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 outline-none"
          />

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className={`w-full transition text-white py-3 rounded-lg font-semibold ${
              loginType === "admin"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {loginType === "admin"
              ? "Admin Login"
              : "Customer Login"}
          </button>

        </form>

        {/* =========================
            OR
        ========================= */}

        <div className="flex items-center my-6">

          <div className="flex-1 border-t border-gray-700"></div>

          <span className="px-4 text-gray-500 text-sm">
            OR
          </span>

          <div className="flex-1 border-t border-gray-700"></div>

        </div>

        {/* =========================
            GOOGLE LOGIN
        ========================= */}

        {loginType === "user" && (
          <div className="flex justify-center">

            {googleLoading ? (
              <p className="text-gray-400">
                Signing in with Google...
              </p>
            ) : (
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="filled_black"
                size="large"
                text="signin_with"
                shape="rectangular"
              />
            )}

          </div>
        )}

        {/* =========================
            REGISTER
        ========================= */}

        <p className="text-center text-gray-400 mt-6">

          Don't have an account?{" "}

          <Link
            to="/signup"
            className="text-purple-400 hover:underline"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
};

export default SignIn;