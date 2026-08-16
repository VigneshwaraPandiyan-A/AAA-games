import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart.items);
  const wishlist = useSelector((state) => state.wishlist.items);

  const { user, isLoggedIn } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  return (
    <nav className="bg-black border-b border-purple-600 text-white px-8 py-4">
      <div className="flex items-center">

        {/* Logo */}
        <div className="w-1/4">
          <Link to="/">
            <h1 className="text-3xl font-bold">
              <span className="text-purple-500">AAA</span>{" "}
              <span className="text-white">Games</span>
            </h1>
          </Link>
        </div>

        {/* Menu */}
        <div className="w-2/4 flex justify-center">
          <ul className="flex gap-8 text-lg">

            <li>
              <Link
                to="/"
                className="hover:text-purple-400 duration-300"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className="hover:text-purple-400 duration-300"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                to="/orders"
                className="text-white hover:text-purple-400 duration-300"
              >
                My Orders
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="hover:text-purple-400 duration-300"
              >
                Contact
              </Link>
            </li>

          </ul>
        </div>

        {/* Right Side */}
        <div className="w-1/4 flex justify-end items-center gap-3">

          

          <Link
            to="/wishlist"
            className="border border-purple-500 px-4 py-2 rounded-lg hover:bg-purple-600 duration-300"
          >
            ❤️ {wishlist.length}
          </Link>

          <Link
            to="/cart"
            className="border border-purple-500 px-4 py-2 rounded-lg hover:bg-purple-600 duration-300"
          >
            🛒 {cart.length}
          </Link>

          {!isLoggedIn ? (
            <>
              <Link
                to="/signin"
                className="border border-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 duration-300"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="border border-green-500 px-4 py-2 rounded-lg hover:bg-green-600 duration-300"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
{user?.role === "admin" ? (
  <Link
    to="/admin/dashboard"
    className="border border-yellow-500 px-4 py-2 rounded-lg text-yellow-400 font-semibold hover:bg-yellow-500 hover:text-black duration-300 cursor-pointer"
  >
    👑 {user?.name}
  </Link>
) : (
  <span className="border border-green-500 px-4 py-2 rounded-lg text-white font-semibold cursor-default">
    👤 {user?.name}
  </span>
)}

              <button
                onClick={handleLogout}
                className="border border-red-500 px-4 py-2 rounded-lg hover:bg-red-600 duration-300"
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;