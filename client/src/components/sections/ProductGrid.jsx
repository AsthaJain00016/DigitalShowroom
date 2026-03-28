const products = [
  {
    name: "Banarasi Silk Saree",
    price: "₹3,499",
    image:
      "https://www.samyakk.com/blog/wp-content/uploads/2024/01/Royal-Purple-Zari-Woven-Banarasi-Silk-Saree.jpg",
  },
  {
    name: "Designer Suit",
    price: "₹2,199",
    image:
      "https://i.etsystatic.com/20682333/r/il/45f9a5/2433215108/il_fullxfull.2433215108_npa9.jpg",
  },
  {
    name: "Festive Saree",
    price: "₹1,999",
    image:
      "https://th.bing.com/th/id/OIP.ukdv4XFjJSWxmvSlaWPKMwHaQm?w=156&h=350&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3",
  },
  {
    name: "Bridal Collection",
    price: "₹5,999",
    image:
      "https://th.bing.com/th/id/OIP.2AQL_JXyPhbafgrdRzMdWQHaMV?w=188&h=313&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3",
  },
  {
    name: "Cotton Suit",
    price: "₹1,499",
    image:
     "https://thenmozhidesigns.com/cdn/shop/files/046A7818-1copy.jpg?v=1701156097&width=1366",
  },
  {
    name: "Printed Saree",
    price: "₹1,299",
    image:
        "https://assets0.mirraw.com/images/10940005/7_zoom.jpg?1668770657",
  },
  {
    name: "Banarasi Silk Saree",
    price: "₹3,499",
    image:
      "https://www.samyakk.com/blog/wp-content/uploads/2024/01/Royal-Purple-Zari-Woven-Banarasi-Silk-Saree.jpg",
  },
  {
    name: "Designer Suit",
    price: "₹2,199",
    image:
      "https://i.etsystatic.com/20682333/r/il/45f9a5/2433215108/il_fullxfull.2433215108_npa9.jpg",
  },
  {
    name: "Festive Saree",
    price: "₹1,999",
    image:
      "https://th.bing.com/th/id/OIP.ukdv4XFjJSWxmvSlaWPKMwHaQm?w=156&h=350&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3",
  },
  {
    name: "Bridal Collection",
    price: "₹5,999",
    image:
      "https://th.bing.com/th/id/OIP.2AQL_JXyPhbafgrdRzMdWQHaMV?w=188&h=313&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3",
  },
  {
    name: "Cotton Suit",
    price: "₹1,499",
    image:
     "https://thenmozhidesigns.com/cdn/shop/files/046A7818-1copy.jpg?v=1701156097&width=1366",
  },
  {
    name: "Printed Saree",
    price: "₹1,299",
    image:
        "https://assets0.mirraw.com/images/10940005/7_zoom.jpg?1668770657",
  },
];

const ProductGrid = () => {
  return (
    <section id="Collections" className="py-12 px-4 md:px-10 bg-white">

      {/* Heading */}
      <h2 className="text-2xl md:text-3xl text-center font-semibold text-gray-800 mb-8">
        Our Collection
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 cursor-pointer"
          >

            {/* Image */}
            <div className="h-55 overflow-hidden">
              <img
                src={product.image}
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
                {product.price}
              </p>
            </div>

          </div>
        ))}

      </div>
    </section>
  );
};

export default ProductGrid;