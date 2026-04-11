import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getFeaturedProduct } from "../../api/product.api.js";



const Featured = () => {
    const scrollRef = useRef();
    const navigate = useNavigate();

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    };

    const [products, setProduct] = useState([])
    
        useEffect(() => {
            const fetchProduct = async () => {
                try {
                    const data = await getFeaturedProduct()
                    setProduct(data)
                } catch (err) {
                    console.log("Error while fetching featured products", err)
                }
            };
            fetchProduct();
        },[])

    return (
        <section className="py-12 px-4 md:px-10 bg-gray-50 relative" id="Featured">

            {/* Heading */}
            <div className="flex flex-col items-center gap-4 mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800">
                Featured Collection
              </h2>
              <button
                onClick={() => navigate('/featured')}
                className="rounded-full border border-red-800 px-4 py-2 text-sm font-semibold text-red-800 hover:bg-red-50 transition"
              >
                View all featured products
              </button>
            </div>

            {/* LEFT ARROW */}
            <button
                onClick={scrollLeft}
                className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
            >
                <ChevronLeft size={24} />
            </button>

            {/* RIGHT ARROW */}
            <button
                onClick={scrollRight}
                className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
            >
                <ChevronRight size={24} />
            </button>

            {/* SCROLL CONTAINER */}
            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
            >
                {products.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => navigate(`/product/${item._id}`)}
                        className="min-w-55 md:min-w-75 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 cursor-pointer"
                    >

                        {/* Image */}
                        <div className="h-70 md:h-87.5 overflow-hidden">
                            <img
                                src={item.images?.[0] || item.image || "https://via.placeholder.com/400x400?text=No+Image"}
                                alt={item.name}
                                className="w-full h-full object-cover hover:scale-105 transition duration-300"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <h3 className="text-lg font-medium text-center text-gray-800">
                                {item.name}
                            </h3>
                            <h3 className="text-lg font-medium text-center text-gray-800">
                                ₹{item.price}
                            </h3>
                        </div>

                    </div>
                ))}
            </div>
        </section>
    );
};

export default Featured;