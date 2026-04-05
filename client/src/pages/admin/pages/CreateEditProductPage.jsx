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
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isOnSale, setIsOnSale] = useState(false);
  const [discountPrice, setDiscountPrice] = useState("");
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
        setPrice(product.price?.toString() ?? "");
        setStock(product.stock?.toString() ?? "");
        setCategory(product.category?._id || "");
        setDescription(product.description);
        setIsFeatured(Boolean(product.isFeatured));
        setIsOnSale(Boolean(product.isOnSale));
        setDiscountPrice(product.discountPrice?.toString() ?? "");
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
    if (!name || price === "" || !category || !description) return;

    setSaving(true);
    try {
      const numericPrice = parseFloat(price);
      const numericStock = stock === "" ? 0 : parseInt(stock, 10);
      const numericDiscount = discountPrice === "" ? 0 : parseFloat(discountPrice);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", Number.isNaN(numericPrice) ? 0 : numericPrice);
      formData.append("stock", Number.isNaN(numericStock) ? 0 : numericStock);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("isFeatured", isFeatured);
      formData.append("isOnSale", isOnSale);
      if (discountPrice !== "") {
        formData.append("discountPrice", Number.isNaN(numericDiscount) ? 0 : numericDiscount);
      }
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
              step="0.01"
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            <input
              type="number"
              className="rounded-lg border border-gray-200 p-3 focus:ring-2 focus:ring-red-100"
              placeholder="Stock"
              value={stock}
              min={0}
              step="1"
              onChange={(e) => setStock(e.target.value)}
              required
            />
            <div className="flex items-center gap-4">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="h-4 w-4"
                />
                Featured
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isOnSale}
                  onChange={(e) => setIsOnSale(e.target.checked)}
                  className="h-4 w-4"
                />
                On Sale
              </label>
            </div>
            <input
              type="number"
              className="rounded-lg border border-gray-200 p-3 focus:ring-2 focus:ring-red-100"
              placeholder="Discount Price (optional)"
              value={discountPrice}
              min={0}
              step="0.01"
              onChange={(e) => setDiscountPrice(e.target.value)}
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
