import { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin, user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    
    <nav className="bg-white/95 shadow-sm backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">

      {/* TOP BAR */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        {!isOpen && (
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-red-800">
            Vardhman Sarees, Suits and Blouses
          </h1>
        )}

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-gray-700 font-medium">
          <button onClick={() => { navigate('/'); window.location.hash = 'Home'; }} className="hover:text-red-800">Home</button>
          <button onClick={() => { navigate('/'); window.location.hash = 'Collections'; }} className="hover:text-red-800">Collections</button>
          <button onClick={() => navigate('/featured')} className="hover:text-red-800">Featured Collection</button>
          <button onClick={()=>navigate('/sale')} className="hover:text-red-800 cursor-pointer">Sale</button>
          {isAdmin && <button onClick={()=>navigate('/admin')} className="hover:text-red-800 cursor-pointer">Admin</button>}
          {!user && <button onClick={()=>navigate('/login')} className="hover:text-red-800 cursor-pointer">Login</button>}
          {user && <button onClick={handleLogout} className="hover:text-red-800 cursor-pointer">Logout</button>}
          <button onClick={() => { navigate('/'); window.location.hash = 'Contact'; }} className="hover:text-red-800">Contact</button>
        </div>

        {/* Search */}
        {!isOpen && (
          <div className="relative flex items-center gap-2">
            <Search
              size={24}
              className="cursor-pointer"
              onClick={() => setSearchOpen((prev) => !prev)}
            />
            {searchOpen && (
              <input
                autoFocus
                value={searchParams.get("q") || ""}
                onChange={(e) => {
                  const q = e.target.value;
                  if (q) {
                    setSearchParams({ q });
                  } else {
                    setSearchParams({});
                  }
                  if (location.pathname !== "/") {
                    navigate("/");
                  }
                }}
                onBlur={() => setSearchOpen(false)}
                className="border border-gray-200 rounded-full px-3 py-1 text-sm outline-none focus:ring-2 focus:ring-red-100"
                placeholder="Search products..."
              />
            )}
          </div>
        )}

        {/* Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* 🔥 MOBILE MENU WITH ANIMATION */}
      <div
        className={`fixed inset-0 bg-red-50/85 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <div className={`absolute inset-x-4 top-16 mx-auto w-[calc(100%-2rem)] max-w-md rounded-[2rem] bg-white/95 border border-red-100 shadow-2xl shadow-red-100/40 p-6 transition-transform duration-300 ${isOpen ? "translate-y-0" : "-translate-y-8"}`}>

          {/* HEADER */}
          <div className="flex items-center justify-between gap-4 rounded-3xl border border-red-100 bg-red-50/90 p-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-red-600">Menu</p>
              <h2 className="text-lg font-semibold text-red-900">Explore Vardhman</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-red-200 bg-white text-red-700 shadow-sm transition hover:bg-red-100"
            >
              <X size={20} />
            </button>
          </div>

          {/* MENU ITEMS */}
          <div className="mt-8 grid gap-4">
            <button
              onClick={() => {
                navigate('/');
                window.location.hash = 'Home';
                setIsOpen(false);
              }}
              className="w-full rounded-3xl border border-gray-200 bg-white px-5 py-4 text-left text-lg font-semibold text-gray-900 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-red-200 hover:bg-red-50"
            >
              Home
            </button>

            <button
              onClick={() => {
                navigate('/');
                window.location.hash = 'Collections';
                setIsOpen(false);
              }}
              className="w-full rounded-3xl border border-gray-200 bg-white px-5 py-4 text-left text-lg font-semibold text-gray-900 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-red-200 hover:bg-red-50"
            >
              Collections
            </button>

            <button
              onClick={() => {
                navigate('/featured');
                setIsOpen(false);
              }}
              className="w-full rounded-3xl border border-gray-200 bg-white px-5 py-4 text-left text-lg font-semibold text-gray-900 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-red-200 hover:bg-red-50"
            >
              Featured Collections
            </button>

            <button
              onClick={() => {
                navigate('/sale');
                setIsOpen(false);
              }}
              className="w-full rounded-3xl border border-gray-200 bg-white px-5 py-4 text-left text-lg font-semibold text-gray-900 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-red-200 hover:bg-red-50"
            >
              Sale
            </button>

            {isAdmin && (
              <button
                onClick={() => {
                  navigate('/admin');
                  setIsOpen(false);
                }}
                className="w-full rounded-3xl border border-gray-200 bg-white px-5 py-4 text-left text-lg font-semibold text-gray-900 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-red-200 hover:bg-red-50"
              >
                Admin
              </button>
            )}

            {!user && (
              <button
                onClick={() => {
                  navigate('/login');
                  setIsOpen(false);
                }}
                className="w-full rounded-3xl border border-gray-200 bg-white px-5 py-4 text-left text-lg font-semibold text-gray-900 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-red-200 hover:bg-red-50"
              >
                Login
              </button>
            )}

            {user && (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full rounded-3xl border border-gray-200 bg-white px-5 py-4 text-left text-lg font-semibold text-gray-900 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-red-200 hover:bg-red-50"
              >
                Logout
              </button>
            )}

            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/');
                window.location.hash = 'Contact';
              }}
              className="w-full rounded-3xl border border-gray-200 bg-white px-5 py-4 text-left text-lg font-semibold text-gray-900 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-red-200 hover:bg-red-50"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;