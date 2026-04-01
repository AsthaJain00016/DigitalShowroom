import { Route,Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/sections/Footer";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import ProductDetail from "./pages/ProductDetailPage";
import FeaturedPage from "./pages/FeaturedPage";
import SalePage from "./pages/SalePage";

function App(){
  return(
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/category/:id" element={<CategoryPage/>} />
      <Route path="product/:id" element={<ProductDetail/>} />
      <Route path="/featured" element={<FeaturedPage/>} />
      <Route path="/sale" element={<SalePage/>} />
    </Routes>
    <Footer/>
    </>
  )
}

export default App