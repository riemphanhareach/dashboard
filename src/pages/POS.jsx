import { useState } from "react";
import { Search, Utensils, LogOut, ShoppingBag } from "lucide-react";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import CheckoutModal from "../components/CheckoutModal";

export default function POS({
  products,
  cart,
  onAddToCart,
  onUpdateCartQuantity,
  onRemoveCartItem,
  onClearCart,
  onCheckout,
  user,
  onLogout,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);

  const categories = ["All", "Burger", "Chicken", "Pizza", "Fries", "Drinks"];

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* POS Top Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-500 to-red-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <span className="font-black text-lg text-slate-800 tracking-tight">
              Quick<span className="text-orange-500">Bite</span> POS
            </span>
            <span className="ml-2 px-2 py-0.5 rounded bg-orange-100 text-orange-700 font-bold text-[10px] uppercase">
              Register
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Cart Trigger */}
          <button
            onClick={() => setIsMobileCartOpen(!isMobileCartOpen)}
            className="lg:hidden relative p-2 bg-orange-500 text-white rounded-xl shadow"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalCartCount}
              </span>
            )}
          </button>

          <span className="text-xs font-bold text-slate-700 hidden sm:inline">
            Cashier: <strong className="text-orange-600">{user?.name || "Sarah"}</strong>
          </span>

          <button
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main 2-Column POS Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Food Products Catalog */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto min-w-0">
          {/* Search & Category Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-5">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Find burger, chicken, drinks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium outline-none focus:border-orange-500 shadow-xs"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${selectedCategory === cat
                      ? "bg-orange-500 text-white shadow-sm"
                      : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Products Cards Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <p className="text-sm font-bold">No food items found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 pb-20 lg:pb-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Active Cart (Desktop Sticky) */}
        <div className="hidden lg:block w-80 xl:w-96 p-4 border-l border-slate-200 bg-white h-[calc(100vh-61px)] sticky top-[61px]">
          <Cart
            cart={cart}
            onUpdateQuantity={onUpdateCartQuantity}
            onRemoveItem={onRemoveCartItem}
            onClearCart={onClearCart}
            onOpenCheckout={() => setIsCheckoutOpen(true)}
          />
        </div>
      </div>

      {/* Mobile Cart Drawer */}
      {isMobileCartOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setIsMobileCartOpen(false)}
          />
          <div className="relative w-full max-w-sm h-full bg-white z-10 p-4">
            <Cart
              cart={cart}
              onUpdateQuantity={onUpdateCartQuantity}
              onRemoveItem={onRemoveCartItem}
              onClearCart={onClearCart}
              onOpenCheckout={() => {
                setIsMobileCartOpen(false);
                setIsCheckoutOpen(true);
              }}
            />
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onCheckout={onCheckout}
      />
    </div>
  );
}

