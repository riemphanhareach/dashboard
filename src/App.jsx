import React, { useState } from "react";

import Login from "./components/Login";

import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";

import CashierSidebar from "./components/CashierSidebar";
import CashierHeader from "./components/CashierHeader";

import {
  Search,
  Plus,
  Package,
  Laptop,
  Mouse,
  Keyboard,
  Headphones,
  X,
} from "lucide-react";

const App = () => {

  // ==========================================
  // USER
  // ==========================================

  const [user, setUser] = useState(null);

  // ==========================================
  // CURRENT PAGE
  // ==========================================

  const [page, setPage] = useState("dashboard");

  // ==========================================
  // PRODUCTS
  // ==========================================

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "ROG Strix G16",
      category: "Laptop",
      price: 1299,
      stock: 12,
      icon: Laptop,
    },

    {
      id: 2,
      name: "Acer Nitro V",
      category: "Laptop",
      price: 899,
      stock: 8,
      icon: Laptop,
    },

    {
      id: 3,
      name: "Logitech G502",
      category: "Mouse",
      price: 59,
      stock: 25,
      icon: Mouse,
    },

    {
      id: 4,
      name: "Mechanical Keyboard",
      category: "Keyboard",
      price: 75,
      stock: 18,
      icon: Keyboard,
    },

    {
      id: 5,
      name: "Gaming Headset",
      category: "Headset",
      price: 89,
      stock: 14,
      icon: Headphones,
    },

    {
      id: 6,
      name: "Kingston 16GB RAM",
      category: "RAM",
      price: 45,
      stock: 30,
      icon: Package,
    },
  ]);

  // ==========================================
  // SEARCH
  // ==========================================

  const [search, setSearch] = useState("");

  // ==========================================
  // ADD PRODUCT MODAL
  // ==========================================

  const [showAddProduct, setShowAddProduct] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  // ==========================================
  // LOGIN
  // ==========================================

  const handleLogin = (role) => {
    setUser({
      role: role,
    });

    setPage("dashboard");
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    setUser(null);
    setPage("dashboard");
  };

  // ==========================================
  // ADD PRODUCT
  // ==========================================

  const handleAddProduct = (e) => {
    e.preventDefault();

    const product = {
      id: Date.now(),

      name: newProduct.name,

      category: newProduct.category,

      price: Number(newProduct.price),

      stock: Number(newProduct.stock),

      icon: Package,
    };

    setProducts([...products, product]);

    setNewProduct({
      name: "",
      category: "",
      price: "",
      stock: "",
    });

    setShowAddProduct(false);
  };

  // ==========================================
  // FILTER PRODUCTS
  // ==========================================

  const filteredProducts = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ==========================================
  // LOGIN PAGE
  // ==========================================

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  // ==========================================
  // ADMIN INTERFACE
  // ==========================================

  if (user.role === "admin") {

    return (
      <div
        className="
          min-h-screen
          bg-gradient-to-br
          from-slate-50
          via-blue-50
          to-indigo-50
          dark:from-slate-900
          dark:via-slate-800
          dark:to-slate-900
          transition-all
          duration-500
        "
      >

        <div className="flex h-screen overflow-hidden">

          {/* ========================= */}
          {/* ADMIN SIDEBAR */}
          {/* ========================= */}

          <AdminSidebar
            onLogout={handleLogout}
            setPage={setPage}
          />

          {/* ========================= */}
          {/* ADMIN MAIN */}
          {/* ========================= */}

          <div className="flex flex-1 flex-col overflow-hidden">

            <AdminHeader />

            <main className="flex-1 overflow-y-auto p-6">

              {/* ================================= */}
              {/* ADMIN DASHBOARD */}
              {/* ================================= */}

              {page === "dashboard" && (

                <div>

                  <div className="mb-6">

                    <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
                      Admin Dashboard
                    </h1>

                    <p className="mt-2 text-slate-500 dark:text-slate-400">
                      Welcome to the admin dashboard.
                    </p>

                  </div>


                  {/* CARDS */}

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                    <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800">

                      <p className="text-sm text-slate-500">
                        Total Products
                      </p>

                      <h2 className="mt-2 text-3xl font-bold text-slate-800 dark:text-white">
                        {products.length}
                      </h2>

                    </div>


                    <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800">

                      <p className="text-sm text-slate-500">
                        Total Sales
                      </p>

                      <h2 className="mt-2 text-3xl font-bold text-slate-800 dark:text-white">
                        $8,520
                      </h2>

                    </div>


                    <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800">

                      <p className="text-sm text-slate-500">
                        Customers
                      </p>

                      <h2 className="mt-2 text-3xl font-bold text-slate-800 dark:text-white">
                        320
                      </h2>

                    </div>


                    <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800">

                      <p className="text-sm text-slate-500">
                        Cashiers
                      </p>

                      <h2 className="mt-2 text-3xl font-bold text-slate-800 dark:text-white">
                        8
                      </h2>

                    </div>

                  </div>

                </div>

              )}


              {/* ================================= */}
              {/* ADMIN PRODUCTS */}
              {/* ================================= */}

              {page === "products" && (

                <ProductsPage
                  products={filteredProducts}
                  search={search}
                  setSearch={setSearch}
                  onAddProduct={() =>
                    setShowAddProduct(true)
                  }
                />

              )}

            </main>

          </div>

        </div>


        {/* ADD PRODUCT MODAL */}

        {showAddProduct && (

          <AddProductModal
            newProduct={newProduct}
            setNewProduct={setNewProduct}
            onClose={() =>
              setShowAddProduct(false)
            }
            onSubmit={handleAddProduct}
          />

        )}

      </div>
    );
  }


  // ==========================================
  // CASHIER INTERFACE
  // ==========================================

  if (user.role === "cashier") {

    return (
      <div
        className="
          min-h-screen
          bg-gradient-to-br
          from-slate-50
          via-emerald-50
          to-teal-50
          dark:from-slate-900
          dark:via-slate-800
          dark:to-slate-900
          transition-all
          duration-500
        "
      >

        <div className="flex h-screen overflow-hidden">

          {/* CASHIER SIDEBAR */}

          <CashierSidebar
            onLogout={handleLogout}
            setPage={setPage}
          />


          {/* CASHIER MAIN */}

          <div className="flex flex-1 flex-col overflow-hidden">

            <CashierHeader />

            <main className="flex-1 overflow-y-auto p-6">

              {/* CASHIER DASHBOARD */}

              {page === "dashboard" && (

                <div>

                  <div className="mb-6">

                    <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
                      Cashier POS
                    </h1>

                    <p className="mt-2 text-slate-500 dark:text-slate-400">
                      Welcome to the cashier dashboard.
                    </p>

                  </div>


                  {/* POS CARDS */}

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                    <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800">

                      <p className="text-sm text-slate-500">
                        Today's Sales
                      </p>

                      <h2 className="mt-2 text-3xl font-bold text-emerald-500">
                        $1,250
                      </h2>

                    </div>


                    <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800">

                      <p className="text-sm text-slate-500">
                        Orders
                      </p>

                      <h2 className="mt-2 text-3xl font-bold text-slate-800 dark:text-white">
                        45
                      </h2>

                    </div>


                    <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800">

                      <p className="text-sm text-slate-500">
                        Products Sold
                      </p>

                      <h2 className="mt-2 text-3xl font-bold text-slate-800 dark:text-white">
                        78
                      </h2>

                    </div>

                  </div>

                </div>

              )}


              {/* CASHIER PRODUCTS */}

              {page === "products" && (

                <ProductsPage
                  products={filteredProducts}
                  search={search}
                  setSearch={setSearch}
                  onAddProduct={null}
                />

              )}

            </main>

          </div>

        </div>

      </div>
    );
  }

  return null;
};


// ==================================================
// PRODUCTS PAGE
// ==================================================

const ProductsPage = ({
  products,
  search,
  setSearch,
  onAddProduct,
}) => {

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>

          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            Products
          </h1>

          <p className="mt-1 text-slate-500 dark:text-slate-400">
            View and manage your products
          </p>

        </div>


        {/* ADD PRODUCT */}

        {onAddProduct && (

          <button
            onClick={onAddProduct}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-emerald-500
              px-5
              py-3
              font-semibold
              text-white
              shadow-lg
              shadow-emerald-500/20
              transition
              hover:bg-emerald-400
            "
          >

            <Plus size={20} />

            Add Product

          </button>

        )}

      </div>


      {/* SEARCH */}

      <div className="relative max-w-md">

        <Search
          size={20}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        />

        <input
          type="text"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search products..."
          className="
            w-full
            rounded-xl
            border
            border-slate-200
            bg-white
            py-3
            pl-12
            pr-4
            text-slate-800
            outline-none
            transition
            focus:border-emerald-500
            focus:ring-2
            focus:ring-emerald-500/20
            dark:border-slate-700
            dark:bg-slate-800
            dark:text-white
          "
        />

      </div>


      {/* PRODUCT COUNT */}

      <div className="flex items-center gap-2">

        <Package
          size={18}
          className="text-emerald-500"
        />

        <span className="text-sm text-slate-500">
          {products.length} products found
        </span>

      </div>


      {/* PRODUCTS GRID */}

      <div
        className="
          grid
          gap-6
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        "
      >

        {products.map((product) => {

          const Icon = product.icon;

          return (
            <div
              key={product.id}
              className="
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-sm
                transition
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
                dark:border-slate-700
                dark:bg-slate-800
              "
            >

              {/* IMAGE AREA */}

              <div
                className="
                  flex
                  h-44
                  items-center
                  justify-center
                  bg-gradient-to-br
                  from-slate-100
                  to-slate-200
                  dark:from-slate-700
                  dark:to-slate-800
                "
              >

                <Icon
                  size={70}
                  strokeWidth={1.5}
                  className="text-slate-400"
                />

              </div>


              {/* INFO */}

              <div className="p-5">

                <span
                  className="
                    rounded-full
                    bg-emerald-100
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-emerald-600
                  "
                >
                  {product.category}
                </span>


                <h2
                  className="
                    mt-3
                    truncate
                    text-lg
                    font-bold
                    text-slate-800
                    dark:text-white
                  "
                >
                  {product.name}
                </h2>


                {/* PRICE */}

                <div className="mt-4 flex items-center justify-between">

                  <span className="text-xl font-bold text-slate-800 dark:text-white">
                    ${product.price}
                  </span>


                  {/* STOCK */}

                  <span
                    className={`
                      rounded-full
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      ${
                        product.stock > 10
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-orange-100 text-orange-600"
                      }
                    `}
                  >
                    Stock: {product.stock}
                  </span>

                </div>

              </div>

            </div>
          );

        })}

      </div>


      {/* EMPTY */}

      {products.length === 0 && (

        <div
          className="
            rounded-2xl
            border
            border-dashed
            border-slate-300
            p-12
            text-center
            dark:border-slate-700
          "
        >

          <Package
            size={50}
            className="mx-auto text-slate-400"
          />

          <h2 className="mt-4 text-lg font-semibold text-slate-700 dark:text-white">
            No products found
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Try searching for another product.
          </p>

        </div>

      )}

    </div>
  );
};


// ==================================================
// ADD PRODUCT MODAL
// ==================================================

const AddProductModal = ({
  newProduct,
  setNewProduct,
  onClose,
  onSubmit,
}) => {

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-slate-950/60
        p-6
        backdrop-blur-sm
      "
    >

      <div
        className="
          w-full
          max-w-lg
          rounded-3xl
          bg-white
          p-8
          shadow-2xl
          dark:bg-slate-800
        "
      >

        {/* HEADER */}

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
              Add Product
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add a new product to your inventory
            </p>

          </div>


          <button
            onClick={onClose}
            className="
              rounded-xl
              p-2
              text-slate-500
              transition
              hover:bg-slate-100
              hover:text-slate-800
              dark:hover:bg-slate-700
            "
          >

            <X size={22} />

          </button>

        </div>


        {/* FORM */}

        <form
          onSubmit={onSubmit}
          className="space-y-5"
        >

          {/* NAME */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
              Product Name
            </label>

            <input
              type="text"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  name: e.target.value,
                })
              }
              placeholder="Example: ASUS TUF Gaming"
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-4
                py-3
                outline-none
                focus:border-emerald-500
                dark:border-slate-700
                dark:bg-slate-900
                dark:text-white
              "
              required
            />

          </div>


          {/* CATEGORY */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
              Category
            </label>

            <select
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  category: e.target.value,
                })
              }
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-4
                py-3
                outline-none
                focus:border-emerald-500
                dark:border-slate-700
                dark:bg-slate-900
                dark:text-white
              "
              required
            >

              <option value="">
                Select category
              </option>

              <option value="Laptop">
                Laptop
              </option>

              <option value="Desktop">
                Desktop
              </option>

              <option value="Mouse">
                Mouse
              </option>

              <option value="Keyboard">
                Keyboard
              </option>

              <option value="Headset">
                Headset
              </option>

              <option value="RAM">
                RAM
              </option>

              <option value="Monitor">
                Monitor
              </option>

            </select>

          </div>


          {/* PRICE + STOCK */}

          <div className="grid grid-cols-2 gap-4">

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
                Price ($)
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: e.target.value,
                  })
                }
                placeholder="0.00"
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-4
                  py-3
                  outline-none
                  focus:border-emerald-500
                  dark:border-slate-700
                  dark:bg-slate-900
                  dark:text-white
                "
                required
              />

            </div>


            <div>

              <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
                Stock
              </label>

              <input
                type="number"
                min="0"
                value={newProduct.stock}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    stock: e.target.value,
                  })
                }
                placeholder="0"
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-4
                  py-3
                  outline-none
                  focus:border-emerald-500
                  dark:border-slate-700
                  dark:bg-slate-900
                  dark:text-white
                "
                required
              />

            </div>

          </div>


          {/* BUTTONS */}

          <div className="flex gap-3 pt-3">

            <button
              type="button"
              onClick={onClose}
              className="
                flex-1
                rounded-xl
                border
                border-slate-200
                py-3
                font-semibold
                text-slate-600
                transition
                hover:bg-slate-100
                dark:border-slate-700
                dark:text-slate-300
                dark:hover:bg-slate-700
              "
            >
              Cancel
            </button>


            <button
              type="submit"
              className="
                flex-1
                rounded-xl
                bg-emerald-500
                py-3
                font-semibold
                text-white
                transition
                hover:bg-emerald-400
              "
            >
              Add Product
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default App;