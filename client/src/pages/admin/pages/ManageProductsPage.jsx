import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout, { useAdminSearch } from "../AdminLayout";
import { getAllProducts, deleteProduct } from "../../../api/product.api.js";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import { useToast } from "../../../components/ui/ToastProvider";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { search, setSearch } = useAdminSearch();
  const [sortBy, setSortBy] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const [confirm, setConfirm] = useState({ open: false, id: null });

  const navigate = useNavigate();
  const toast = useToast();

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllProducts();
      setProducts(data || []);
    } catch {
      toast.addToast("Failed to load products", "error");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filtered = useMemo(() => {
    const normalized = search.toLowerCase().trim();
    const filteredProducts = products.filter((prod) => {
      return (
        prod.name.toLowerCase().includes(normalized) ||
        (prod.category?.name || "").toLowerCase().includes(normalized)
      );
    });

    const sorted = [...filteredProducts].sort((a, b) => {
      const aVal = a[sortBy] || "";
      const bVal = b[sortBy] || "";

      if (typeof aVal === "string") {
        return sortDir === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      return sortDir === "asc" ? aVal - bVal : bVal - aVal;
    });

    return sorted;
  }, [products, search, sortBy, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  const openDelete = (id) => setConfirm({ open: true, id });

  const handleConfirmDelete = async () => {
    try {
      await deleteProduct(confirm.id);
      toast.addToast("Product deleted", "success");
      fetchProducts();
      setConfirm({ open: false, id: null });
    } catch {
      toast.addToast("Could not delete product", "error");
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
        <h1 className="text-2xl font-bold text-red-900">Manage Products</h1>
        <button
          onClick={() => navigate("/admin/products/create")}
          className="inline-flex items-center gap-2 rounded-xl bg-red-800 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700"
        >
          + Add Product
        </button>
      </div>

      <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <input
          type="search"
          value={search}
          placeholder="Search by name/category"
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="rounded-lg border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-red-100"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-lg border border-gray-200 px-3 py-2"
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="stock">Stock</option>
        </select>
        <select
          value={sortDir}
          onChange={(e) => setSortDir(e.target.value)}
          className="rounded-lg border border-gray-200 px-3 py-2"
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>

        <div className="pt-1 text-sm text-gray-500">
          Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)} of {filtered.length}
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-2xl border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Image</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Price</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Stock</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-sm text-gray-500">Loading products...</td>
              </tr>
            ) : pageItems.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-sm text-gray-500">No products matched.</td>
              </tr>
            ) : (
              pageItems.map((product) => {
                const status =
                  product.stock === 0
                    ? "Out of Stock"
                    : product.stock <= 5
                    ? "Low Stock"
                    : "In Stock";

                const statusClass =
                  status === "In Stock"
                    ? "bg-emerald-100 text-emerald-700"
                    : status === "Low Stock"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-rose-100 text-rose-700";

                return (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <img className="h-12 w-12 rounded-lg object-cover" src={product.images?.[0]} alt={product.name} />
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-slate-700">{product.name}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">₹ {product.price}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{product.stock}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}>{status}</span>
                    </td>
                    <td className="px-4 py-3 flex gap-2 items-center">
                      <button
                        onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                        className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openDelete(product._id)}
                        className="text-sm font-semibold text-rose-600 hover:text-rose-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">Page {page} of {totalPages}</div>
        <div className="flex gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="rounded-lg border border-gray-200 px-3 py-1 text-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Prev
          </button>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            className="rounded-lg border border-gray-200 px-3 py-1 text-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <ConfirmModal
        open={confirm.open}
        title="Confirm delete"
        message="Are you sure you want to delete this product?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirm({ open: false, id: null })}
      />
    </AdminLayout>
  );
};

export default ManageProducts;

