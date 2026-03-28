
import Navbar from "./components/layout/Navbar"
import Categories from "./components/sections/Categories"
import Contact from "./components/sections/Contact"
import Featured from "./components/sections/Featured"
import Footer from "./components/sections/Footer"
import Hero from "./components/sections/Hero"
import ProductGrid from "./components/sections/ProductGrid"
import VisitShop from "./components/sections/VisitShop"

function App() {

  return (
    <>
    <Navbar/>
    <Hero/>
    <Categories/>
    <Featured/>
    <ProductGrid/>
    <VisitShop/>
    <Contact/>
    <Footer/>

    </>
    
  )
}

export default App
