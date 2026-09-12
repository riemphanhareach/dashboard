import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  LogOut,
  Utensils,
  Store,
} from "lucide-react";

export default function Sidebar({ onLogout }) {
  const menuItems = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/products", label: "Products", icon: Package },
    { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
    { to: "/pos", label: "Go to POS", icon: Store, isPos: true },
  ];

  return (
    <aside className="w-60 bg-white border-r border-slate-200 flex flex-col justify-between h-screen sticky top-0 shrink-0 select-none">
      <div>
        {/* Brand */}
        <div className="p-5 border-b border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-red-500 flex items-center justify-center text-white shadow-md shadow-orange-500/25">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-black text-lg text-slate-800 tracking-tight leading-none">
              Quick<span className="text-orange-500">Bite</span>
            </h2>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Admin Panel
            </span>
          </div>
        </div>

        {/* Links */}
        <nav className="p-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/admin"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${isActive
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md shadow-orange-500/20"
                    : item.isPos
                      ? "text-orange-600 hover:bg-orange-50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-3 border-t border-slate-100">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-rose-600 hover:bg-rose-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

