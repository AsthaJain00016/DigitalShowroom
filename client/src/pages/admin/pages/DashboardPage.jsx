import { useEffect, useMemo, useState } from "react";
import AdminLayout, { useAdminSearch } from "../AdminLayout";
import { getAllProducts } from "../../../api/product.api.js";
import { getAllCategories } from "../../../api/category.api.js";
import { Package, Layers, Info } from "lucide-react";

const cardData = [
  { id: "products", icon: Package, label: "Total Products", color: "bg-red-50 text-red-700" },
  { id: "categories", icon: Layers, label: "Total Categories", color: "bg-amber-50 text-amber-700" },
  { id: "lowStock", icon: Info, label: "Low Stock Items", color: "bg-rose-50 text-rose-700" },
];

const DashboardPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { search } = useAdminSearch();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [prodData, catData] = await Promise.all([getAllProducts(), getAllCategories()]);
        setProducts(prodData || []);
        setCategories(catData || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const lowStock = useMemo(
    () => products.filter((p) => p.stock <= 5).length,
    [products]
  );

  const metrics = {
    products: products.length,
    categories: categories.length,
    lowStock,
  };

  const normalizedSearch = search.toLowerCase().trim();
  const displayedProducts = normalizedSearch
    ? products.filter((product) => {
        return (
          product.name.toLowerCase().includes(normalizedSearch) ||
          (product.category?.name || "").toLowerCase().includes(normalizedSearch)
        );
      })
    : products;

  return (
    <AdminLayout>
      <div className="grid gap-5 md:grid-cols-3 mb-6">
        {cardData.map((card) => {
          const Icon = card.icon;
          return (
            <article key={card.id} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className={`h-10 w-10 rounded-full grid place-items-center ${card.color}`}>
                  <Icon size={18} />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">{card.label}</span>
              </div>
              <div className="mt-4 text-3xl font-bold text-red-900">
                {loading ? "..." : metrics[card.id] ?? 0}
              </div>
            </article>
          );
        })}
      </div>

      <section className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-3">Recent Products</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <p className="text-sm text-gray-500">Loading...</p>
          ) : displayedProducts.slice(0, 6).map((product) => (
            <div key={product._id} className="flex items-start gap-3 border rounded-xl p-3 hover:border-red-200 transition-colors">
              <img src={product.images?.[0]} alt={product.name} className="h-14 w-14 object-cover rounded-md" />
              <div>
                <p className="font-semibold text-slate-700">{product.name}</p>
                <p className="text-xs text-gray-500">₹{product.price} • Stock {product.stock}</p>
              </div>
            </div>
          ))}
          {displayedProducts.length === 0 && !loading && (
            <p className="text-sm text-gray-500">No recent products match the search.</p>
          )}
        </div>
      </section>
    </AdminLayout>
  );
};

export default DashboardPage;
