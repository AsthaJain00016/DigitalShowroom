import ProductGrid from "../components/sections/ProductGrid";

const CategoryPage=()=>{
    return(
        <div className="bg-white">
            <div className="relative w-full h-[40vh] md:h-[50vh]">
                <img
                src="https://th.bing.com/th/id/OIP.w4_Xxo6kwMnTu-G1IX7IQwHaQm?w=188&h=365&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3"
                alt="categorybanner"
                className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h1 className="text-2xl md:text-4xl font-bold text-white">
                        Saree Collection
                    </h1>
                </div>
            </div>
            {/* Descripiton */}
            <div className="px-4 md:px-10 py-6 text-center md:text-left">
                <p className="text-gray-600 max-w-2xl">
                    Explore our premium collection  of sarees perfect for weddings, special occasions, daily wears, etc
                </p>
            </div>
            <ProductGrid/>
            <div className="bg-gray-100 py-10 px-4 md:px-10 text-center">
                <h2 className="text-xl md:text:2xl font-semibold text-gray-800">Want to see more designs ?</h2>
                <p className="mt-2 text-gray-600">Visit our shop to explore full collection</p>
                <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">
                    <a href="tel:+91 9690473865" className="px-6 py-3 bg-red-800 text-white rounded-md hover:bg-red-900 transition">Call Now</a>
                    <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 border border-red-800 text-red-800 rounded-md hover:bg-red-800 hover:text-white transition"
          >
            Get Directions
          </a>
                </div>      
            </div>
        </div>
    )
}
export default CategoryPage