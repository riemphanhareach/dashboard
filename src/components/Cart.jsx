import { ShoppingBag, Trash2, CreditCard } from "lucide-react";
import CartItem from "./CartItem";

export default function Cart({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenCheckout,
  discount = 0,
}) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = Math.max(0, subtotal - discount);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col h-full overflow-hidden select-none">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-800">Shopping Cart</h3>
            <span className="text-[11px] text-slate-400 font-medium">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </span>
          </div>
        </div>

        {cart.length > 0 && (
          <button
            onClick={onClearCart}
            className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 hover:underline"
          >
            <Trash2 className="w-3 h-3" /> Clear
          </button>
        )}
      </div>

      {/* Cart Items List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
            <ShoppingBag className="w-10 h-10 text-slate-300 mb-2" />
            <p className="text-xs font-bold text-slate-600">Your cart is empty</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Tap any food item to add it to the order
            </p>
          </div>
        ) : (
          cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              onRemove={onRemoveItem}
            />
          ))
        )}
      </div>

      {/* Totals & Checkout Actions */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-3">
        <div className="space-y-1.5 text-xs text-slate-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-bold text-slate-800">${subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-emerald-600 font-semibold">
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
            <span>Total</span>
            <span className="text-orange-600">${total.toFixed(2)}</span>
          </div>
        </div>

        <button
          disabled={cart.length === 0}
          onClick={onOpenCheckout}
          className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-xl shadow-md shadow-orange-500/25 flex items-center justify-center gap-2 text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <CreditCard className="w-4 h-4" />
          <span>Checkout (${total.toFixed(2)})</span>
        </button>
      </div>
    </div>
  );
}

