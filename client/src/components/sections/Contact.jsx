const Contact = () => {
  return (
    <section id="Contact" className="py-12 px-4 md:px-10 bg-white">

      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center mb-10">
        Contact Us
      </h2>

      <div className="flex flex-col md:flex-row gap-10">

        {/* 📝 FORM */}
        <div className="flex-1">

          <form className="flex flex-col gap-4">

            <input
              type="text"
              placeholder="Your Name"
              className="border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-800"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-800"
            />

            <textarea
              rows="4"
              placeholder="Your Message"
              className="border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-800"
            ></textarea>

            <button
              type="submit"
              className="bg-red-800 hover:bg-red-900 text-white py-3 rounded-md transition duration-300"
            >
              Send Message
            </button>

          </form>

        </div>

        {/* 📍 INFO */}
        <div className="flex-1 text-center md:text-left">

          <h3 className="text-xl font-semibold text-gray-800">
            Get in Touch
          </h3>

          <p className="mt-4 text-gray-600">
            Visit our shop for the latest collection of sarees, suits and blouses.
          </p>

          <p className="mt-4 text-gray-700 font-medium">
            📍 21 Jhanda Bazar, Dehradun
          </p>

          <p className="mt-2 text-gray-700 font-medium">
            📞 +91 9876543210
          </p>

          <p className="mt-2 text-gray-700 font-medium">
            ✉️ vardhmansarees@gmail.com
          </p>

        </div>

      </div>
    </section>
  );
};

export default Contact;