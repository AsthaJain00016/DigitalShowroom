import { useParams } from "react-router-dom"
import { useEffect,useState } from "react"
import { getProductByCategory } from "../api/product.api.js"
import { getSingleCategory } from "../api/category.api.js"
import { useNavigate } from "react-router-dom"


const CategoryPage=()=>{
    const {id}=useParams()
    const [products,setProducts]=useState([])
    const [category,setCategory]=useState({})
    const navigate=useNavigate()

    useEffect(()=>{
        const fetchProduct=async()=>{
            try{    
                const data=await getProductByCategory(id)
                setProducts(data)

                if (data.length > 0) {
                    const categoryData = data[0]?.category;
                    if (categoryData && typeof categoryData === "object" && categoryData.name) {
                        setCategory(categoryData);
                    } else if (categoryData) {
                        const fetchedCategory = await getSingleCategory(categoryData);
                        setCategory(fetchedCategory || {});
                    }
                }
            }catch(err){
                console.error("Error occured while fetching products by category",err)
            }
        }
        fetchProduct()
    },[id])

    return (
        <div className="bg-slate-50 min-h-screen">
            <section className="relative overflow-hidden">
                <img
                    src={category.image || "https://via.placeholder.com/1200x600?text=No+Category+Image"}
                    alt={category.name || "Category banner"}
                    className="w-full h-[28vh] md:h-[34vh] xl:h-[36vh] max-h-130 object-cover object-center"
                />
                <div className="absolute inset-0 bg-linear-to-br from-black/55 via-black/20 to-black/55" />
                <div className="absolute inset-0 flex items-center justify-center px-4 md:px-10">
                    <div className="text-center text-white max-w-3xl">
                        <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/80 mb-4">
                            Category
                        </span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight drop-shadow-xl">
                            {category.name.toUpperCase() || "Collection"}
                        </h1>
                        <p className="mt-4 text-sm sm:text-base text-white/80 md:text-lg leading-relaxed">
                            {category.description || "Explore our premium collection of sarees perfect for weddings, special occasions, daily wear, and more."}
                        </p>
                        <div className="mt-6 inline-flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-white/80">
                            <span className="rounded-full bg-white/10 px-4 py-2">{products.length} products</span>
                            <span className="rounded-full bg-white/10 px-4 py-2">{category.name || "Category"} style</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 md:px-10 py-10">
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-red-600">Browse the collection</p>
                        <h2 className="mt-2 text-3xl font-semibold text-slate-900">
                            {category.name ? `${category.name.toUpperCase()} ` : "Products"}
                        </h2>
                    </div>
                    
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            onClick={() => navigate(`/product/${product._id}`)}
                            className="group cursor-pointer overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className="relative overflow-hidden h-64 bg-slate-100">
                                <img
                                    src={product.images?.[0] || product.image || "https://via.placeholder.com/400x400?text=No+Image"}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-base font-semibold text-slate-900 truncate">
                                    {product.name}
                                </h3>
                                <p className="mt-2 text-sm text-gray-500 h-14 overflow-hidden">
                                    {product.description?.slice(0, 80) || "Rich color tones and elegant craftsmanship."}
                                </p>
                                <div className="mt-4 flex items-center justify-between gap-3">
                                    <span className="text-lg font-bold text-red-800">₹{product.price}</span>
                                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-red-700">
                                        {product.stock > 0 ? "In stock" : "Sold out"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-gradient-to-r from-red-100 to-white py-10 px-4 md:px-10">
                <div className="mx-auto max-w-6xl rounded-3xl border border-red-100 bg-white/90 p-8 shadow-xl">
                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold text-slate-900">Want to see more designs?</h2>
                            <p className="mt-2 text-gray-600">Visit our shop and explore the full collection of sarees, suits, and blouses.</p>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <a href="tel:+919690473865" className="inline-flex items-center justify-center rounded-full bg-red-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-900">
                                Call Now
                            </a>
                            <a
                                href="https://www.google.com/maps"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center rounded-full border border-red-800 px-6 py-3 text-sm font-semibold text-red-800 transition hover:bg-red-800 hover:text-white"
                            >
                                Get Directions
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default CategoryPage