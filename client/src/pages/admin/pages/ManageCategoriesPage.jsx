import { useEffect, useMemo, useState } from "react";
import AdminLayout, { useAdminSearch } from "../AdminLayout";
import { getAllCategories, createCategory, updateCategory, deleteCategory } from "../../../api/category.api.js";
import { Trash2, Edit, Plus } from "lucide-react";

const ManageCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { search } = useAdminSearch();

  const fetchData = async () => {
    try {
      const cats = await getAllCategories();
      setCategories(cats);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const reset = () => {
    setName("");
    setImage(null);
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || (!image && !editId)) return;

    const form = new FormData();
    form.append("name", name);
    if (image) form.append("image", image);

    setLoading(true);
    try {
      if (editId) {
        await updateCategory(editId, form);
      } else {
        await createCategory(form);
      }
      await fetchData();
      reset();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (category) => {
    setEditId(category._id);
    setName(category.name);
    setImage(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    await deleteCategory(id);
    await fetchData();
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
        <h1 className="text-2xl font-bold text-red-900">Categories</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-5">
        <div className="grid gap-4 md:grid-cols-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category name"
            className="rounded-lg border border-gray-200 p-3 focus:ring-2 focus:ring-red-100 focus:border-red-300"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] ?? null)}
            className="rounded-lg border border-gray-200 p-3"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-800 px-4 py-3 text-white font-semibold hover:bg-red-700 transition disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Plus size={16} />
            {loading ? "Saving..." : editId ? "Update Category" : "Add Category"}
          </button>
        </div>
      </form>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories
          .filter((category) => {
            if (!search.trim()) return true;
            return category.name.toLowerCase().includes(search.toLowerCase().trim());
          })
          .map((category) => (
            <article key={category._id} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
              {category.image ? (
                <img src={category.image} alt={category.name} className="h-12 w-12 rounded-lg object-cover" />
              ) : (
                <div className="h-12 w-12 rounded-lg bg-red-100" />
              )}
              <div>
                <h3 className="text-base font-semibold text-slate-800">{category.name}</h3>
                <small className="text-xs text-gray-500">{category._id}</small>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => startEdit(category)} className="text-yellow-600 hover:text-yellow-800">
                <Edit size={16} />
              </button>
              <button onClick={() => handleDelete(category._id)} className="text-red-600 hover:text-red-800">
                <Trash2 size={16} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </AdminLayout>
  );
};

export default ManageCategoriesPage;
