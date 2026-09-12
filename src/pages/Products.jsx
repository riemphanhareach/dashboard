import { useState, useRef } from "react";
import { Plus, Search, Edit2, Trash2, X, Upload } from "lucide-react";

export default function Products({ products, onAddProduct, onUpdateProduct, onDeleteProduct }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Burger");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");
  const fileInputRef = useRef(null);

  const categories = ["All", "Burger", "Chicken", "Pizza", "Fries", "Drinks"];

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setName("");
    setCategory("Burger");
    setPrice("");
    setStock("20");
    setImage("https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setName(product.name);
    setCategory(product.category);
    setPrice(product.price.toString());
    setStock(product.stock.toString());
    setImage(product.image);
    setIsModalOpen(true);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !price) return;

    const productData = {
      name: name.trim(),
      category,
      price: parseFloat(price) || 0,
      stock: parseInt(stock, 10) || 0,
      image:
        image.trim() ||
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80",
    };

    if (editingProduct) {
      onUpdateProduct({ ...editingProduct, ...productData });
    } else {
      onAddProduct(productData);
    }

    setIsModalOpen(false);
  };

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight">Product Management</h2>
          <p className="text-xs text-slate-400 mt-0.5">Manage fast food items, pricing, and stocks</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-xl text-xs shadow-md shadow-orange-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium outline-none focus:border-orange-500 text-slate-800"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${selectedCategory === cat
                  ? "bg-orange-500 text-white shadow-sm"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm border-collapse min-w-[650px]">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-400 text-xs uppercase tracking-wider font-semibold">
              <th className="py-3 px-4">Item</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4 text-right">Price</th>
              <th className="py-3 px-4 text-center">Stock</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-400">
                  No products found matching your search.
                </td>
              </tr>
            ) : (
              filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <span className="font-bold text-slate-800 text-sm">{p.name}</span>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                      {p.category}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right font-black text-slate-800 text-sm">
                    ${p.price.toFixed(2)}
                  </td>

                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full font-bold text-xs ${p.stock <= 10
                          ? "bg-red-100 text-red-700"
                          : "bg-emerald-100 text-emerald-700"
                        }`}
                    >
                      {p.stock} left
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteProduct(p.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-800">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="font-bold uppercase text-slate-500 block mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cheese Burger"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="font-bold uppercase text-slate-500 block mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 font-medium text-slate-800"
                >
                  {["Burger", "Chicken", "Pizza", "Fries", "Drinks"].map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold uppercase text-slate-500 block mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="3.50"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 font-bold text-orange-600"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase text-slate-500 block mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="25"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 font-medium text-slate-800"
                  />
                </div>
              </div>

              {/* Image Input with Upload & URL support */}
              <div>
                <label className="font-bold uppercase text-slate-500 block mb-1">
                  Product Image
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Paste image URL..."
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 text-xs"
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold flex items-center gap-1 shrink-0"
                    title="Upload local photo"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                  </button>
                </div>

                {image && (
                  <div className="mt-2 flex items-center gap-2">
                    <img
                      src={image}
                      alt="Preview"
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                    />
                    <span className="text-[11px] text-slate-400">Image ready</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow"
                >
                  {editingProduct ? "Save Changes" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

