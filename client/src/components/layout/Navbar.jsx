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
    
    <nav className="bg-white shadow-md sticky top-0 z-50">

      {/* TOP BAR */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        {!isOpen && (
          <h1 className="text-xl font-semibold text-red-800">
            Vardhman Sarees, Suits and Blouses
          </h1>
        )}

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-gray-700 font-medium">
          <button onClick={() => { navigate('/'); window.location.hash = 'Home'; }} className="hover:text-red-800">Home</button>
          <button onClick={() => { navigate('/'); window.location.hash = 'Collections'; }} className="hover:text-red-800">Collections</button>
          <button onClick={() => { navigate('/'); window.location.hash = 'Featured'; }} className="hover:text-red-800">Featured Collection</button>
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
        className={`fixed top-0 left-0 w-full h-screen bg-white z-50 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-y-0" : "-translate-y-full"}`}
      >

        {/* ❌ CLOSE BUTTON (RIGHT SIDE) */}
        <div className="flex justify-end p-5">
          <button onClick={() => setIsOpen(false)}>
            <X size={28} />
          </button>
        </div>

        {/* MENU ITEMS */}
        <div className="flex flex-col items-center justify-center gap-8 mt-20 text-xl font-medium text-gray-800">

          <button
            onClick={() => {
              navigate('/');
              window.location.hash = 'Home';
              setIsOpen(false);
            }}
            className="hover:text-red-800 transition duration-200"
          >
            Home
          </button>

          <button
            onClick={() => {
              navigate('/');
              window.location.hash = 'Collections';
              setIsOpen(false);
            }}
            className="hover:text-red-800 transition duration-200"
          >
            Collections
          </button>
          <button
            onClick={() => {
              navigate('/');
              window.location.hash = 'Featured';
              setIsOpen(false);
            }}
            className="hover:text-red-800 transition duration-200"
          >
            Featured Collections
          </button>
        

          <a
            onClick={() => navigate(`/sale`)}
            className="hover:text-red-800 transition duration-200"
          >
            Sale
          </a>

          {isAdmin && (
            <a
              onClick={() => {
                navigate(`/admin`);
                setIsOpen(false);
              }}
              className="hover:text-red-800 transition duration-200"
            >
              Admin
            </a>
          )}
          {!user && (
            <a
              onClick={() => {
                navigate(`/login`);
                setIsOpen(false);
              }}
              className="hover:text-red-800 transition duration-200"
            >
              Login
            </a>
          )}
          {user && (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="hover:text-red-800 transition duration-200"
            >
              Logout
            </button>
          )}

          <a
            href="#Contact"
            onClick={() => setIsOpen(false)}
            className="hover:text-red-800 transition duration-200"
          >
            Contact
          </a>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;