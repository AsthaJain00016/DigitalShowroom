import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/sections/Footer";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import ProductDetail from "./pages/ProductDetailPage";
import SalePage from "./pages/SalePage";
import DashboardPage from "./pages/admin/pages/DashboardPage";
import ManageProducts from "./pages/admin/pages/ManageProductsPage";
import CreateEditProductPage from "./pages/admin/pages/CreateEditProductPage";
import ManageCategoriesPage from "./pages/admin/pages/ManageCategoriesPage";
import InventoryPage from "./pages/admin/pages/InventoryPage";
import LoginPage from "./pages/LoginPage";
import FeaturedPage from "./pages/FeaturedPage";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastProvider } from "./components/ui/ToastProvider";
import Hero from "./components/sections/Hero";

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/sale" element={<SalePage />} />
          <Route path="/featured" element={<FeaturedPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Home" element={<Hero/>} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute adminOnly>
                <ManageProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products/create"
            element={
              <ProtectedRoute adminOnly>
                <CreateEditProductPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products/edit/:id"
            element={
              <ProtectedRoute adminOnly>
                <CreateEditProductPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <ProtectedRoute adminOnly>
                <ManageCategoriesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/inventory"
            element={
              <ProtectedRoute adminOnly>
                <InventoryPage />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;