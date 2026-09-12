import { useState } from "react";
import { Eye, XCircle, X } from "lucide-react";

export default function Orders({ orders, onCancelOrder }) {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-black text-slate-800 tracking-tight">Orders History</h2>
        <p className="text-xs text-slate-400 mt-0.5">Track and view completed restaurant customer orders</p>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm border-collapse min-w-[650px]">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-400 text-xs uppercase tracking-wider font-semibold">
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Cashier</th>
              <th className="py-3 px-4 text-right">Total</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-400">
                  No orders recorded yet.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-800">
                    {order.id}
                  </td>
                  <td className="py-3 px-4 text-slate-500">{order.date}</td>
                  <td className="py-3 px-4 font-semibold text-slate-700">{order.cashier}</td>
                  <td className="py-3 px-4 text-right font-black text-orange-600">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] ${order.status === "Completed"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700"
                        }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                        title="View Order Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {order.status === "Completed" && (
                        <button
                          onClick={() => onCancelOrder(order.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Cancel Order"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-800">
                Order #{selectedOrder.id}
              </h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 mt-4 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Date:</span>
                <span className="font-medium text-slate-800">{selectedOrder.date}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Cashier:</span>
                <span className="font-medium text-slate-800">{selectedOrder.cashier}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Status:</span>
                <span
                  className={`font-bold uppercase text-[10px] px-2 py-0.5 rounded-full ${selectedOrder.status === "Completed"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-rose-100 text-rose-700"
                    }`}
                >
                  {selectedOrder.status}
                </span>
              </div>

              {/* Items */}
              <div className="border-t border-slate-100 pt-3">
                <h4 className="font-bold uppercase text-slate-400 text-[10px] mb-2">
                  Purchased Items
                </h4>
                <div className="space-y-1.5">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span className="font-bold text-slate-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Breakdown */}
              <div className="border-t border-slate-100 pt-3 space-y-1">
                <div className="flex justify-between font-bold text-slate-600">
                  <span>Subtotal:</span>
                  <span>${selectedOrder.subtotal?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-black text-sm text-slate-900 pt-1">
                  <span>Grand Total:</span>
                  <span className="text-orange-600">${selectedOrder.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500 pt-1">
                  <span>Cash Tendered:</span>
                  <span>${selectedOrder.cashReceived?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Change Given:</span>
                  <span>${selectedOrder.change?.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full mt-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
