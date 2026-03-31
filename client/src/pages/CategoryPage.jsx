import { useParams } from "react-router-dom"
import { useEffect,useState } from "react"
import { getProductByCategory } from "../api/product.api.js"
import { useNavigate } from "react-router-dom"


const CategoryPage=()=>{
    const {id}=useParams()
    const [products,setProducts]=useState([])
    const [category,setCategory]=useState({})
    const navigate=useNavigate()

    useEffect(()=>{
        const fetchProduct=async()=>{
            try{    
                const data=await getProductByCategory()
                setProducts(data)
            }catch(err){
                console.error("Error occured while fetching products by category",err)
            }

            fetchProduct()
        }
    },[id])

    return(
        <div className="bg-white">
            <div className="relative w-full h-[40vh] md:h-[50vh]">
                <img
                src={category.image}
                alt="categorybanner"
                className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h1 className="text-2xl md:text-4xl font-bold text-white">
                        {category.name}
                    </h1>
                </div>
            </div>
            {/* Descripiton */}
            <div className="px-4 md:px-10 py-6 text-center md:text-left">
                <p className="text-gray-600 max-w-2xl">
                    Explore our premium collection  of sarees perfect for weddings, special occasions, daily wears, etc
                </p>
            </div>
            <div className="px-4 md:px-10 py-6">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">

          {products.map((product) => (
            <div
              key={product._id}
              onClick={() => navigate(`/product/${product._id}`)}
              className="cursor-pointer group"
            >
              <div className="w-full h-55 md:h-70 rounded-lg overflow-hidden shadow-sm">
                <img
                  src={product.images?.[0] || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>

              <div className="mt-2">
                <h3 className="text-sm font-medium text-gray-800 line-clamp-1">
                  {product.name}
                </h3>

                <p className="text-red-800 font-semibold">
                  ₹{product.price}
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>

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