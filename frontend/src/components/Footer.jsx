import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-black border-t border-purple-900/60 text-white py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <div>
          <h2 className="text-2xl font-bold">
            <span className="text-purple-500">AAA</span> Games
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Your Ultimate Gaming Store • Fast Digital Delivery
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-300">
          <Link to="/" className="hover:text-purple-400 transition">
            Home
          </Link>
          <Link to="/about" className="hover:text-purple-400 transition">
            About Us
          </Link>
          <Link to="/orders" className="hover:text-purple-400 transition">
            My Orders
          </Link>
          <Link to="/contact" className="hover:text-purple-400 transition">
            Contact
          </Link>
          <Link to="/wishlist" className="hover:text-purple-400 transition">
            Wishlist
          </Link>
        </div>

        <p className="text-gray-500 text-xs">
          © 2026 AAA Games. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;