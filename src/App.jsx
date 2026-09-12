import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, Outlet } from "react-router-dom";
import { initialProducts } from "./data/products";

// Components
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import POS from "./pages/POS";
import Orders from "./pages/Orders";

export default function App() {
  const navigate = useNavigate();

  // 1. User Authentication State (localStorage)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("quickbite_user");
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("quickbite_user", JSON.stringify(userData));
    if (userData.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/pos");
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("quickbite_user");
    navigate("/login");
  };

  // 2. Products State (localStorage)
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("quickbite_products");
    return saved ? JSON.parse(saved) : initialProducts;
  });

  useEffect(() => {
    localStorage.setItem("quickbite_products", JSON.stringify(products));
  }, [products]);

  const handleAddProduct = (newProduct) => {
    const item = { ...newProduct, id: Date.now() };
    setProducts((prev) => [item, ...prev]);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // 3. Cart State
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    const currentQty = existing ? existing.quantity : 0;

    if (currentQty + 1 > product.stock) {
      alert(`Only ${product.stock} items left in stock!`);
      return;
    }

    setCart((prev) => {
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateCartQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(id);
      return;
    }
    const product = products.find((p) => p.id === id);
    if (product && newQty > product.stock) {
      alert(`Cannot exceed available stock (${product.stock})`);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveCartItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // 4. Orders State (localStorage)
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("quickbite_orders");
    return saved
      ? JSON.parse(saved)
      : [
        {
          id: "QB-101",
          date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
          cashier: "Cashier Sarah",
          total: 8.5,
          subtotal: 8.5,
          discount: 0,
          cashReceived: 10.0,
          change: 1.5,
          status: "Completed",
          items: [
            { name: "Burger", price: 3.0, quantity: 2 },
            { name: "French Fries", price: 2.5, quantity: 1 },
          ],
        },
      ];
  });

  useEffect(() => {
    localStorage.setItem("quickbite_orders", JSON.stringify(orders));
  }, [orders]);

  // Checkout Handler: Deducts product stock, saves order, clears cart
  const handleCheckout = ({ subtotal, discount, total, cashReceived, change }) => {
    const orderId = `QB-${102 + orders.length}`;
    const newOrder = {
      id: orderId,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      cashier: user ? user.name : "Cashier",
      subtotal,
      discount,
      total,
      cashReceived,
      change,
      status: "Completed",
      items: cart.map((i) => ({ name: i.name, price: i.price, quantity: i.quantity })),
    };

    // Deduct stock in products catalog
    setProducts((prev) =>
      prev.map((p) => {
        const line = cart.find((i) => i.id === p.id);
        return line ? { ...p, stock: Math.max(0, p.stock - line.quantity) } : p;
      })
    );

    // Save order
    setOrders((prev) => [newOrder, ...prev]);

    // Clear cart
    setCart([]);

    return newOrder;
  };

  // Cancel Order Handler: Restores stock and marks as Cancelled
  const handleCancelOrder = (orderId) => {
    const orderToCancel = orders.find((o) => o.id === orderId);
    if (!orderToCancel || orderToCancel.status === "Cancelled") return;

    // Restore stock
    setProducts((prev) =>
      prev.map((p) => {
        const item = orderToCancel.items?.find((i) => i.name === p.name);
        return item ? { ...p, stock: p.stock + item.quantity } : p;
      })
    );

    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "Cancelled" } : o))
    );
  };

  return (
    <Routes>
      {/* Public Login Route */}
      <Route
        path="/login"
        element={
          user ? (
            user.role === "admin" ? (
              <Navigate to="/admin" replace />
            ) : (
              <Navigate to="/pos" replace />
            )
          ) : (
            <Login onLogin={handleLogin} />
          )
        }
      />

      {/* Cashier POS Route */}
      <Route
        path="/pos"
        element={
          user ? (
            <POS
              products={products}
              cart={cart}
              onAddToCart={handleAddToCart}
              onUpdateCartQuantity={handleUpdateCartQuantity}
              onRemoveCartItem={handleRemoveCartItem}
              onClearCart={handleClearCart}
              onCheckout={handleCheckout}
              user={user}
              onLogout={handleLogout}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Admin Protected Routes with Sidebar Layout */}
      <Route
        path="/admin"
        element={
          user ? (
            user.role === "admin" ? (
              <div className="flex min-h-screen bg-slate-50">
                <Sidebar onLogout={handleLogout} />
                <div className="flex-1 flex flex-col min-w-0">
                  <Header
                    title="QuickBite Admin Dashboard"
                    user={user}
                    onLogout={handleLogout}
                  />
                  <main className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                  </main>
                </div>
              </div>
            ) : (
              <Navigate to="/pos" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        {/* Admin Dashboard */}
        <Route index element={<Dashboard products={products} orders={orders} />} />

        {/* Product Management */}
        <Route
          path="products"
          element={
            <Products
              products={products}
              onAddProduct={handleAddProduct}
              onUpdateProduct={handleUpdateProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          }
        />

        {/* Orders Page */}
        <Route
          path="orders"
          element={<Orders orders={orders} onCancelOrder={handleCancelOrder} />}
        />
      </Route>

      {/* Default Catch-all */}
      <Route
        path="*"
        element={
          user ? (
            user.role === "admin" ? (
              <Navigate to="/admin" replace />
            ) : (
              <Navigate to="/pos" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}
