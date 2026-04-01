const Hero = () => {
  return (
    <section id="Home" className="relative w-full h-[90vh] overflow-hidden">

      {/* Background Image */}
      <img
        src="https://i.pinimg.com/originals/53/b9/c1/53b9c1ef778e4195a19b45d0d8bf40b8.jpg"
        alt="Saree Collection"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 🔥 Gradient Overlay (Premium Look) */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center md:items-start text-center md:text-left h-full px-6 md:px-16 text-white">

        {/* Heading */}
        <h1 className="text-3xl md:text-6xl font-bold leading-tight">Timeless Elegance</h1>

        {/* Subtext */}
        <p className="mt-4 text-sm md:text-lg max-w-md text-gray-200">
          Discover the finest collection of sarees, suits, blouses etc.
        </p>

        {/* Button */}
        <button className="mt-6 px-7 py-3 bg-red-800 hover:bg-red-900 hover:scale-105 transition-all duration-300 text-white rounded-md shadow-lg">
          Explore Collection
        </button>

      </div>
    </section>
  );
};

export default Hero;