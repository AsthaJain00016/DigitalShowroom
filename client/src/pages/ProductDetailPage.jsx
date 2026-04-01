import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../api/product.api.js";

const ProductDetail = () => {
  const { id } = useParams(); // 🔥 product id

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getSingleProduct(id);
        setProduct(data);

        // 🔥 handle images
        if (data.images && data.images.length > 0) {
          setActiveImage(data.images[0]);
        } else {
          setActiveImage(data.image);
        }

      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  // 🔥 Loading state
  if (!product) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  const images = product.images?.length ? product.images : [product.image];

  return (
    <div className="px-4 md:px-10 py-10 bg-white">

      <div className="flex flex-col md:flex-row gap-10">

        {/* 🖼️ IMAGE SECTION */}
        <div className="flex-1">

          {/* Main Image */}
          <div className="w-full h-100 md:h-125 rounded-xl overflow-hidden shadow-md">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover transition duration-300"
            />
          </div>

          {/* 🔥 THUMBNAILS */}
          <div className="flex gap-3 mt-4 overflow-x-auto">

            {images.map((img, index) => (
              <div
                key={index}
                onClick={() => setActiveImage(img)}
                className={`w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 ${
                  activeImage === img
                    ? "border-red-800"
                    : "border-transparent"
                }`}
              >
                <img
                  src={img}
                  alt="thumb"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}

          </div>

        </div>

        {/* 📄 DETAILS */}
        <div className="flex-1">

          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
            {product.name}
          </h1>

          <p className="mt-2 text-xl text-red-800 font-bold">
            ₹{product.price}
          </p>

          <p className="mt-4 text-gray-600">
            {product.description}
          </p>

          <p className="mt-3 text-sm text-gray-500 italic">
            More colors & designs available in store
          </p>

          {/* ACTION BUTTONS */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">

            <a
              href="tel:+919690473865"
              className="px-6 py-3 bg-red-800 text-white rounded-md text-center"
            >
              📞 Call Now
            </a>

            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 border border-red-800 text-red-800 rounded-md text-center"
            >
              📍 Visit Shop
            </a>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductDetail;
