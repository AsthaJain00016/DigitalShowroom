import Categories from "../components/sections/Categories"
import Contact from "../components/sections/Contact"
import Featured from "../components/sections/Featured"
import Hero from "../components/sections/Hero"
import ProductGrid from "../components/sections/ProductGrid"
import VisitShop from "../components/sections/VisitShop"

const Home=()=>{
    return(
    <>
    <Hero/>
    <Categories/>
    <Featured/>
    <ProductGrid/>
    <VisitShop/>
    <Contact/>
    </>
    )
}
export default Home