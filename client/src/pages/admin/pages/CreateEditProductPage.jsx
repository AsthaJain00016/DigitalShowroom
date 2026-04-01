import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../AdminLayout";
import { createProduct, getSingleProduct, updateProduct } from "../../../api/product.api.js";
import { getAllCategories } from "../../../api/category.api.js";

const CreateEditProductPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getAllCategories().then((catData) => setCategories(catData || []));
  }, []);

  useEffect(() => {
    if (!isEdit) return;
    getSingleProduct(id)
      .then((product) => {
        setName(product.name);
        setPrice(product.price);
        setStock(product.stock);
        setCategory(product.category?._id || "");
        setDescription(product.description);
        setPreview(product.images || []);
      })
      .catch((err) => console.error(err));
  }, [id, isEdit]);

  const uploadHandler = (e) => {
    const files = Array.from(e.target.files || []);
    setImages(files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreview(urls);
  };

  const removePreview = (index) => {
    setPreview((prev) => prev.filter((_, idx) => idx !== index));
    setImages((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !price || !category || !description) return;

    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("category", category);
      formData.append("description", description);
      images.forEach((img) => formData.append("images", img));

      if (isEdit) {
        await updateProduct(id, formData);
      } else {
        await createProduct(formData);
      }

      navigate("/admin/products");
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const statusLabel = isEdit ? "Update Product" : "Create Product";

  const categoryOptions = useMemo(
    () => categories.map((cat) => (
      <option key={cat._id} value={cat._id}>{cat.name}</option>
    )),
    [categories]
  );

  return (
    <AdminLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-red-900">{statusLabel}</h1>

        <form onSubmit={handleSubmit} className="grid gap-4 bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              className="rounded-lg border border-gray-200 p-3 focus:ring-2 focus:ring-red-100"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="number"
              className="rounded-lg border border-gray-200 p-3 focus:ring-2 focus:ring-red-100"
              placeholder="Price"
              value={price}
              min={0}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />

            <input
              type="number"
              className="rounded-lg border border-gray-200 p-3 focus:ring-2 focus:ring-red-100"
              placeholder="Stock"
              value={stock}
              min={0}
              onChange={(e) => setStock(Number(e.target.value))}
              required
            />
            <select
              className="rounded-lg border border-gray-200 p-3 focus:ring-2 focus:ring-red-100"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select category</option>
              {categoryOptions}
            </select>
          </div>

          <textarea
            className="h-28 rounded-lg border border-gray-200 p-3 focus:ring-2 focus:ring-red-100"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label className="block text-sm font-medium text-gray-700">Product Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={uploadHandler}
            className="rounded-lg border border-gray-200 p-2"
          />

          <div className="grid grid-cols-3 gap-2">
            {preview.map((src, idx) => (
              <div key={`${src}-${idx}`} className="relative overflow-hidden rounded-lg border border-gray-200">
                <img src={src} alt="Preview" className="h-24 w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removePreview(idx)}
                  className="absolute top-1 right-1 h-6 w-6 rounded-full bg-white/80 text-red-800 text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-red-800 px-5 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-70"
            >
              {saving ? "Saving..." : statusLabel}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default CreateEditProductPage;
