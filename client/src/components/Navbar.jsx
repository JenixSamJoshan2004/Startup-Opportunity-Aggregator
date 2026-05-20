import { Link, useNavigate } from "react-router-dom";

import { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";

import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/70 border-b border-white/10">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
        {/* LEFT */}

        <div>
          <Link to="/">
            <h1 className="text-3xl font-black bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              StartupHub
            </h1>
          </Link>

          <p className="text-zinc-400 text-sm mt-1 hidden md:block">
            Discover hackathons, grants, accelerators & startup programs
          </p>
        </div>

        {/* DESKTOP NAV */}

        <div className="hidden lg:flex items-center gap-8 text-zinc-300 font-medium">
          <a href="#analytics" className="hover:text-green-400 transition">
            Analytics
          </a>

          <a href="#opportunities" className="hover:text-green-400 transition">
            Opportunities
          </a>

          <a href="#trending" className="hover:text-green-400 transition">
            Trending
          </a>
        </div>

        {/* RIGHT */}

        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-2 rounded-2xl">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>

            <span className="text-sm font-medium">Live Data</span>
          </div>

          {user ? (
            <>
              <div className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700">
                <span className="text-green-400 font-medium">{user.name}</span>
              </div>

              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/20 hover:bg-red-500/30 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 rounded-xl border border-zinc-700 hover:border-green-500 hover:text-green-400 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-5 py-2 rounded-xl bg-green-500 text-black font-semibold hover:bg-green-400 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* MOBILE BUTTON */}

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}

      {mobileOpen && (
        <div className="md:hidden bg-zinc-950 border-t border-zinc-800 px-6 py-6 space-y-5">
          <a
            href="#analytics"
            className="block text-zinc-300 hover:text-green-400"
          >
            Analytics
          </a>

          <a
            href="#opportunities"
            className="block text-zinc-300 hover:text-green-400"
          >
            Opportunities
          </a>

          <a
            href="#trending"
            className="block text-zinc-300 hover:text-green-400"
          >
            Trending
          </a>

          <div className="pt-4 border-t border-zinc-800">
            {user ? (
              <div className="space-y-4">
                <div className="text-green-400 font-semibold">{user.name}</div>

                <button
                  onClick={handleLogout}
                  className="w-full py-3 rounded-xl bg-red-500/20 text-red-400"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  to="/login"
                  className="block w-full text-center py-3 rounded-xl border border-zinc-700"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="block w-full text-center py-3 rounded-xl bg-green-500 text-black font-semibold"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
