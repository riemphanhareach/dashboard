import React from "react";
import { Search, Plus, Package } from "lucide-react";

const Products = () => {
  const products = [
    {
      id: 1,
      name: "ROG Strix G16",
      category: "Laptop",
      price: 1299,
      stock: 12,
    },
    {
      id: 2,
      name: "Acer Nitro V",
      category: "Laptop",
      price: 899,
      stock: 8,
    },
    {
      id: 3,
      name: "Logitech G502",
      category: "Mouse",
      price: 59,
      stock: 25,
    },
    {
      id: 4,
      name: "Kingston 16GB RAM",
      category: "RAM",
      price: 45,
      stock: 30,
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            Products
          </h1>

          <p className="mt-1 text-slate-500 dark:text-slate-400">
            View and manage your products
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-white transition hover:bg-emerald-400">
          <Plus size={20} />
          Add Product
        </button>

      </div>

      {/* Search */}
      <div className="relative max-w-md">

        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search products..."
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-4 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />

      </div>

      {/* Products */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        {products.map((product) => (

          <div
            key={product.id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
          >

            {/* Product Image */}
            <div className="flex h-44 items-center justify-center bg-slate-100 dark:bg-slate-700">

              <Package
                size={60}
                className="text-slate-400"
              />

            </div>

            {/* Product Info */}
            <div className="p-5">

              <p className="text-sm text-emerald-500">
                {product.category}
              </p>

              <h2 className="mt-1 text-lg font-bold text-slate-800 dark:text-white">
                {product.name}
              </h2>

              <div className="mt-4 flex items-center justify-between">

                <span className="text-xl font-bold text-slate-800 dark:text-white">
                  ${product.price}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    product.stock > 10
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  Stock: {product.stock}
                </span>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Products;