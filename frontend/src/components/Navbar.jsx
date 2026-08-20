import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cart = useSelector((state) => state.cart.items);
  const wishlist = useSelector((state) => state.wishlist.items);

  const { user, isLoggedIn } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    setIsMobileMenuOpen(false);
    navigate("/signin");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-black border-b border-purple-600 text-white px-4 sm:px-8 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
            <h1 className="text-2xl sm:text-3xl font-bold">
              <span className="text-purple-500">AAA</span>{" "}
              <span className="text-white">Games</span>
            </h1>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex justify-center flex-1 mx-6">
          <ul className="flex gap-8 text-lg font-medium">
            <li>
              <Link to="/" className="hover:text-purple-400 duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-purple-400 duration-300">
                About
              </Link>
            </li>
            <li>
              <Link to="/orders" className="hover:text-purple-400 duration-300">
                My Orders
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-purple-400 duration-300">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/wishlist"
            className="border border-purple-500 px-3.5 py-1.5 rounded-lg hover:bg-purple-600 duration-300 text-sm font-semibold flex items-center gap-1.5"
          >
            ❤️ <span>{wishlist.length}</span>
          </Link>

          <Link
            to="/cart"
            className="border border-purple-500 px-3.5 py-1.5 rounded-lg hover:bg-purple-600 duration-300 text-sm font-semibold flex items-center gap-1.5"
          >
            🛒 <span>{cart.length}</span>
          </Link>

          {!isLoggedIn ? (
            <>
              <Link
                to="/signin"
                className="border border-blue-500 px-3.5 py-1.5 rounded-lg hover:bg-blue-600 duration-300 text-sm font-semibold"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="border border-green-500 px-3.5 py-1.5 rounded-lg hover:bg-green-600 duration-300 text-sm font-semibold"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              {user?.role === "admin" ? (
                <Link
                  to="/admin/dashboard"
                  className="border border-yellow-500 px-3.5 py-1.5 rounded-lg text-yellow-400 font-semibold hover:bg-yellow-500 hover:text-black duration-300 text-sm cursor-pointer"
                >
                  👑 {user?.name}
                </Link>
              ) : (
                <span className="border border-green-500 px-3.5 py-1.5 rounded-lg text-white font-semibold text-sm cursor-default">
                  👤 {user?.name}
                </span>
              )}

              <button
                onClick={handleLogout}
                className="border border-red-500 px-3.5 py-1.5 rounded-lg hover:bg-red-600 duration-300 text-sm font-semibold"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Header Actions (Wishlist, Cart, Hamburger Toggle) */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            to="/wishlist"
            onClick={() => setIsMobileMenuOpen(false)}
            className="border border-purple-500 px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1"
          >
            ❤️ {wishlist.length}
          </Link>

          <Link
            to="/cart"
            onClick={() => setIsMobileMenuOpen(false)}
            className="border border-purple-500 px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1"
          >
            🛒 {cart.length}
          </Link>

          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            className="p-2 text-purple-400 hover:text-white focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-purple-900/60 space-y-3 pb-2 animate-fadeIn">
          <ul className="flex flex-col gap-3 text-base font-medium px-2">
            <li>
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-1.5 hover:text-purple-400 duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-1.5 hover:text-purple-400 duration-200"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/orders"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-1.5 hover:text-purple-400 duration-200"
              >
                My Orders
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-1.5 hover:text-purple-400 duration-200"
              >
                Contact
              </Link>
            </li>
          </ul>

          <div className="pt-3 border-t border-purple-900/40 flex flex-col gap-2.5 px-2">
            {!isLoggedIn ? (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/signin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-center border border-blue-500 py-2 rounded-lg hover:bg-blue-600 duration-300 text-sm font-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-center border border-green-500 py-2 rounded-lg hover:bg-green-600 duration-300 text-sm font-semibold"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {user?.role === "admin" ? (
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-center border border-yellow-500 py-2 rounded-lg text-yellow-400 font-semibold hover:bg-yellow-500 hover:text-black duration-300 text-sm"
                  >
                    👑 Admin Dashboard ({user?.name})
                  </Link>
                ) : (
                  <div className="text-center border border-green-500 py-2 rounded-lg text-white font-semibold text-sm">
                    👤 Logged in as {user?.name}
                  </div>
                )}

                <button
                  onClick={handleLogout}
                  className="w-full text-center border border-red-500 py-2 rounded-lg hover:bg-red-600 duration-300 text-sm font-semibold"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;