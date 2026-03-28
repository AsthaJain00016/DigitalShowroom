const VisitShop = () => {
  return (
    <section className="py-12 px-4 md:px-10 bg-gray-50">

      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center mb-10">
        Visit Our Shop
      </h2>

      <div className="flex flex-col md:flex-row gap-8 items-center">

        {/* 📍 LEFT SIDE (DETAILS) */}
        <div className="flex-1 text-center md:text-left">

          <h3 className="text-xl font-semibold text-gray-800">
            Vardhman Sarees, Suits & Blouses
          </h3>

          <p className="mt-4 text-gray-600">
            21 Jhanda Bazar, Dehradun <br />
            Uttarakhand, India
          </p>

          <p className="mt-3 text-gray-700 font-medium">
            📞 +91 9690473865
          </p>

          {/* Button */}
          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-6 px-6 py-3 bg-red-800 hover:bg-red-900 text-white rounded-md transition duration-300"
          >
            Get Directions
          </a>

        </div>

        {/* 🗺️ RIGHT SIDE (MAP) */}
        <div className="flex-1 w-full h-75 md:h-100 rounded-xl overflow-hidden shadow-md">

          <iframe
            title="shop-location"
            src="https://www.google.com/maps?q=Jhanda+Bazar+Dehradun&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
          ></iframe>

        </div>

      </div>
    </section>
  );
};

export default VisitShop;