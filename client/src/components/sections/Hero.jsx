import { motion } from "framer-motion";

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

        {/* Heading Animation */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-6xl font-bold leading-tight"
        >
          Timeless Elegance
        </motion.h1>

        {/* Subtext Animation */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-4 text-sm md:text-lg max-w-md text-gray-200"
        >
          Discover the finest collection of sarees, suits, blouses etc. . . .
        </motion.p>

        {/* Button Animation */}
        <motion.button
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="mt-6 px-7 py-3 bg-red-800 hover:bg-red-900 hover:scale-105 transition-all duration-300 text-white rounded-md shadow-lg"
        >
          Explore Collection
        </motion.button>

      </div>
    </section>
  );
};

export default Hero;