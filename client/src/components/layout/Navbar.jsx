import { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import {useNavigate} from "react-router-dom"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate=useNavigate()
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
          <a href="#Home" className="hover:text-red-800">Home</a>
          <a href="#Collections" className="hover:text-red-800">Collections</a>
          <a href="#Featured" className="hover:text-red-800">Featured Collection</a>
          <a onClick={()=>navigate("/sale")} className="hover:text-red-800">Sale</a>
          <a href="#Contact" className="hover:text-red-800">Contact</a>
        </div>

        {/* Search */}
        {!isOpen && (
          <Search size={24} className="cursor-pointer" />
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

          <a
            href="#Home"
            onClick={() => setIsOpen(false)}
            className="hover:text-red-800 transition duration-200"
          >
            Home
          </a>

          <a
            href="#Collections"
            onClick={() => setIsOpen(false)}
            className="hover:text-red-800 transition duration-200"
          >
            Collections
          </a>
          <a
            href="#Featured"
            onClick={() => setIsOpen(false)}
            className="hover:text-red-800 transition duration-200"
          >
            Featured Collections
          </a>
        

          <a
            onClick={() => navigate(`/sale`)}
            className="hover:text-red-800 transition duration-200"
          >
            Sale
          </a>

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