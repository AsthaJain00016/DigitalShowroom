import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../AdminLayout";
import { getAllProducts } from "../../../api/product.api.js";

const InventoryPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await getAllProducts();
        setProducts(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const lowStock = useMemo(() => products.filter((p) => p.stock <= 5).length, [products]);

  return (
    <AdminLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-red-900">Inventory Overview</h1>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-wider text-gray-500">Total products</p>
            <p className="text-3xl font-bold text-red-900">{products.length}</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-wider text-gray-500">Low stock</p>
            <p className="text-3xl font-bold text-rose-600">{lowStock}</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-wider text-gray-500">Average stock</p>
            <p className="text-3xl font-bold text-emerald-600">
              {products.length ? Math.round(products.reduce((sum, item) => sum + item.stock, 0) / products.length) : 0}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold mb-3">Products requiring attention</h2>
          {loading ? (
            <p className="text-sm text-gray-500">Loading...</p>
          ) : (
            <ul className="space-y-2">
              {products
                .filter((product) => product.stock <= 5)
                .map((product) => (
                  <li key={product._id} className="flex items-center justify-between rounded-lg border border-rose-100 p-3">
                    <span>{product.name}</span>
                    <span className="text-xs text-rose-700">Stock {product.stock}</span>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default InventoryPage;
