import { DollarSign, ShoppingBag, Package, AlertTriangle } from "lucide-react";
import StatCard from "../components/StatCard";

export default function Dashboard({ products, orders }) {
  const totalSales = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((sum, o) => sum + o.total, 0);

  const totalOrders = orders.length;
  const totalProducts = products.length;
  const lowStockCount = products.filter((p) => p.stock <= 10).length;

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Sales"
          value={`$${totalSales.toFixed(2)}`}
          icon={DollarSign}
          color="orange"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders.toString()}
          icon={ShoppingBag}
          color="blue"
        />
        <StatCard
          title="Total Products"
          value={totalProducts.toString()}
          icon={Package}
          color="emerald"
        />
        <StatCard
          title="Low Stock"
          value={lowStockCount.toString()}
          icon={AlertTriangle}
          color={lowStockCount > 0 ? "red" : "emerald"}
        />
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h2 className="text-base font-bold text-slate-800 mb-4">Recent Orders</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                <th className="pb-3 px-3">Order ID</th>
                <th className="pb-3 px-3">Date</th>
                <th className="pb-3 px-3">Cashier</th>
                <th className="pb-3 px-3">Items</th>
                <th className="pb-3 px-3 text-right">Total</th>
                <th className="pb-3 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-slate-400">
                    No orders recorded yet.
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-slate-800">
                      {order.id}
                    </td>
                    <td className="py-3 px-3 text-slate-500">{order.date}</td>
                    <td className="py-3 px-3 font-medium text-slate-700">{order.cashier}</td>
                    <td className="py-3 px-3 text-slate-500">
                      {order.items?.map((i) => `${i.quantity}x ${i.name}`).join(", ")}
                    </td>
                    <td className="py-3 px-3 text-right font-black text-orange-600">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] ${order.status === "Completed"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-rose-100 text-rose-700"
                          }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

