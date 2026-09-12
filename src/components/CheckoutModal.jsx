import { useState, useEffect } from "react";
import { X, CheckCircle2, DollarSign, AlertCircle } from "lucide-react";

export default function CheckoutModal({ isOpen, onClose, cart, onCheckout }) {
  const [cashReceived, setCashReceived] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 0;
  const total = Math.max(0, subtotal - discount);

  useEffect(() => {
    if (isOpen) {
      setCashReceived(total > 0 ? total.toFixed(2) : "");
      setIsSuccess(false);
      setCompletedOrder(null);
    }
  }, [isOpen, total]);

  if (!isOpen) return null;

  const cashNum = parseFloat(cashReceived) || 0;
  const change = Math.max(0, cashNum - total);
  const isSufficient = cashNum >= total;

  const handlePay = (e) => {
    e.preventDefault();
    if (!isSufficient || cart.length === 0) return;

    const order = onCheckout({
      subtotal,
      discount,
      total,
      cashReceived: cashNum,
      change,
    });

    setCompletedOrder(order);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="font-bold text-base text-slate-800">
            {isSuccess ? "Receipt Confirmation" : "Checkout & Payment"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          /* Payment Successful View */
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-xl font-black text-slate-800">Payment Successful!</h4>
              <p className="text-xs text-slate-400 mt-1">
                Order <strong className="text-orange-600">#{completedOrder?.id}</strong> created.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-slate-500">Total Paid:</span>
                <span className="font-bold text-slate-800">${completedOrder?.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Cash Received:</span>
                <span className="font-bold text-slate-800">${completedOrder?.cashReceived.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-bold text-sm pt-1 border-t border-slate-200">
                <span>Change to Return:</span>
                <span>${completedOrder?.change.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-xs shadow transition-all"
            >
              Start Next Order
            </button>
          </div>
        ) : (
          /* Payment Calculation Form */
          <form onSubmit={handlePay} className="space-y-4 mt-4 text-xs">
            {/* Summary */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-bold text-slate-800">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Discount:</span>
                <span className="font-bold text-slate-800">-${discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 pt-1 border-t border-slate-200">
                <span>Total Due:</span>
                <span className="text-orange-600">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Cash Received Input */}
            <div>
              <label className="font-bold uppercase text-slate-500 block mb-1">
                Cash Received ($)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-base">
                  $
                </span>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={cashReceived}
                  onChange={(e) => setCashReceived(e.target.value)}
                  placeholder="20.00"
                  className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base font-black text-slate-800 outline-none focus:border-orange-500"
                  autoFocus
                />
              </div>
            </div>

            {/* Quick Cash Buttons */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCashReceived(total.toFixed(2))}
                className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg font-bold text-slate-700"
              >
                Exact (${total.toFixed(2)})
              </button>
              {[10, 20, 50].map((bill) => (
                <button
                  key={bill}
                  type="button"
                  onClick={() => setCashReceived(bill.toString())}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg font-bold text-slate-700"
                >
                  ${bill}
                </button>
              ))}
            </div>

            {/* Change Calculation Box */}
            <div
              className={`p-3 rounded-xl border flex items-center justify-between ${isSufficient
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                  : "bg-red-50 border-red-200 text-red-800"
                }`}
            >
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">
                  {isSufficient ? "Change to return" : "Amount missing"}
                </span>
                <p className="text-lg font-black">${change.toFixed(2)}</p>
              </div>

              {!isSufficient && (
                <span className="text-[10px] font-bold text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Insufficient
                </span>
              )}
            </div>

            {/* Submit */}
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isSufficient}
                className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow disabled:opacity-50"
              >
                Complete Sale
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

