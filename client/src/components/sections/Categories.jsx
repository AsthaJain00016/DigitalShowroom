import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getAllCategories } from "../../api/category.api";

const Categories = () => {
  const scrollRef = useRef();
  const [categories,setCategories]=useState([])

  useEffect(()=>{
    const fetchCategories=async()=>{
      try{
        const data=await getAllCategories();
        setCategories(data)
      }catch(err){
        console.error("Error occurred while fetching categories",err)
      }

      fetchCategories()
    }
  },[])

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -200,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 200,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-10 px-4 md:px-10 bg-white relative">

      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-8">
        Shop by Category
      </h2>

      {/* 🔥 LEFT ARROW (desktop only) */}
      <button
        onClick={scrollLeft}
        className="hidden md:flex items-center justify-center absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10 hover:scale-110 transition"
      >
        <ChevronLeft size={24} />
      </button>

      {/* 🔥 RIGHT ARROW */}
      <button
        onClick={scrollRight}
        className="hidden md:flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10 hover:scale-110 transition"
      >
        <ChevronRight size={24} />
      </button>

      {/* SCROLL CONTAINER */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
      >
        {categories.map((cat, index) => (
          <div
            key={index}
            className="flex flex-col items-center min-w-25 md:min-w-35 cursor-pointer"
          > 
            {/* Circle */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-md hover:scale-105  transition duration-300">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name */}
            <p className="mt-3 text-sm md:text-base font-medium text-gray-700">
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;


