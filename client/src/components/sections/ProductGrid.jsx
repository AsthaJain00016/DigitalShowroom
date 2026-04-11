import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAllProducts, getFeaturedProduct } from "../../api/product.api";

const ProductGrid = ({ featuredOnly = false, title = "Our Collection" }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const normalizedQuery = query.toLowerCase().trim();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = featuredOnly ? await getFeaturedProduct() : await getAllProducts();
        setProducts(data);
      } catch (err) {
        console.error("Error occurred while fetching products", err);
      }
    };
    fetchProducts();
  }, [featuredOnly]);
  return (
    <section id={featuredOnly ? "Featured" : "Collections"} className="py-12 px-4 md:px-10 bg-white">

      {/* Heading */}
      <h2 className="text-2xl md:text-3xl text-center font-semibold text-gray-800 mb-8">
        {title}
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {products
          .filter((product) => {
            if (!normalizedQuery) return true;
            return (
              product.name.toLowerCase().includes(normalizedQuery) ||
              (product.category?.name || "").toLowerCase().includes(normalizedQuery)
            );
          })
          .map((product, index) => (
            <div
              key={index}
              onClick={() => navigate(`/product/${product._id}`)}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 cursor-pointer"
            >

            {/* Image */}
            <div className="h-55 overflow-hidden">
              <img
                src={product.images?.[0] || product.image || "https://via.placeholder.com/400x400?text=No+Image"}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-3">
              <h3 className="text-sm md:text-base font-medium text-gray-800">
                {product.name}
              </h3>
              <p className="text-red-800 font-semibold mt-1">
                ₹{product.price}
              </p>
            </div>

          </div>
        ))}

      </div>
    </section>
  );
};

export default ProductGrid;