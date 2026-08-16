import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import SignIn from "./components/Login/SignIn";
import SignUp from "./components/Login/SignUp";

import AdminDashboard from "./components/admin/AdminDashboard";
import AddProduct from "./components/admin/AddProduct";
import AdminProducts from "./components/admin/AdminProducts";
import EditProduct from "./components/admin/EditProduct";
import AdminOrders from "./components/admin/AdminOrders";

import Checkout from "./components/Checkout";
import OrderSuccess from "./components/OrderSuccess";
import MyOrders from "./components/MyOrders";
import About from "./components/About";
import Contact from "./components/Contact";


function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">

        <Navbar />

        <div className="flex-1">

          <Routes>

            {/* Home */}
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Product />
                </>
              }
            />

            {/* About */}
            <Route
              path="/about"
              element={<About />}
            />

            {/* Contact */}
            <Route
              path="/contact"
              element={<Contact />}
            />

            {/* Cart */}
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />

            {/* Checkout */}
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />

            {/* Order Success */}
            <Route
              path="/order-success"
              element={
                <ProtectedRoute>
                  <OrderSuccess />
                </ProtectedRoute>
              }
            />

            <Route
  path="/orders"
  element={
    <ProtectedRoute>
      <MyOrders />
    </ProtectedRoute>
  }
/>

            {/* Wishlist */}
            <Route
              path="/wishlist"
              element={<Wishlist />}
            />

            {/* Login */}
            <Route
              path="/signin"
              element={<SignIn />}
            />

            {/* Register */}
            <Route
              path="/signup"
              element={<SignUp />}
            />

            {/* ================= ADMIN ================= */}

            <Route
              path="/admin/dashboard"
              element={<AdminDashboard />}
            />

            <Route
              path="/admin/add-product"
              element={<AddProduct />}
            />

            <Route
              path="/admin/products"
              element={<AdminProducts />}
            />

            <Route
              path="/admin/edit/:id"
              element={<EditProduct />}
            />

            <Route
    path="/admin/orders"
    element={<AdminOrders />}
/>

          </Routes>

        </div>

        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;