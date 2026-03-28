import { useState } from "react";

const ProductDetail = () => {

  const images = [
    "https://cdn.pixabay.com/photo/2022/11/20/06/31/woman-7603569_1280.jpg",
    "https://thechhavi.in/wp-content/uploads/2023/01/74b02cf9138262547f80321e3e9ca60c.jpg.webp",
    "https://wallpaperbat.com/img/6566775-golden-silk-saree-hd-phone-wallpaper.jpg",
  ];

  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="px-4 md:px-10 py-10 bg-white">

      <div className="flex flex-col md:flex-row gap-10">

        {/* 🖼️ IMAGE SECTION */}
        <div className="flex-1">

          {/* Main Image */}
          <div className="w-full h-100 md:h-125 rounded-xl overflow-hidden shadow-md">
            <img
              src={activeImage}
              alt="Product"
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
            Banarasi Silk Saree
          </h1>

          <p className="mt-2 text-xl text-red-800 font-bold">
            ₹3,499
          </p>

          <p className="mt-4 text-gray-600">
            Premium silk saree perfect for weddings and festive occasions.
          </p>

          <p className="mt-3 text-sm text-gray-500 italic">
            More colors & designs available in store
          </p>

          {/* ACTION BUTTONS */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">

            <a
              href="tel:+919876543210"
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