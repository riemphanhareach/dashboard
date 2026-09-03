import React from "react";

import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Receipt,
  LogOut,
} from "lucide-react";

const CashierSidebar = ({ onLogout }) => {

  return (
    <aside
      className="
        flex
        h-screen
        w-64
        flex-col
        border-r
        border-slate-200
        bg-white/80
        backdrop-blur-xl
        dark:border-slate-700
        dark:bg-slate-900/80
      "
    >

      {/* LOGO */}

      <div
        className="
          border-b
          border-slate-200
          p-6
          dark:border-slate-700
        "
      >

        <h1 className="text-2xl font-bold text-emerald-500">
          RPR POS
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Cashier Panel
        </p>

      </div>


      {/* MENU */}

      <nav className="flex-1 space-y-2 p-4">

        <button
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            bg-emerald-500
            px-4
            py-3
            text-white
          "
        >
          <LayoutDashboard size={20} />
          Dashboard
        </button>


        <button
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            text-slate-600
            transition
            hover:bg-emerald-50
            dark:text-slate-300
            dark:hover:bg-slate-800
          "
        >
          <ShoppingCart size={20} />
          POS
        </button>


        <button
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            text-slate-600
            transition
            hover:bg-emerald-50
            dark:text-slate-300
            dark:hover:bg-slate-800
          "
        >
          <Package size={20} />
          Products
        </button>


        <button
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            text-slate-600
            transition
            hover:bg-emerald-50
            dark:text-slate-300
            dark:hover:bg-slate-800
          "
        >
          <Receipt size={20} />
          Sales
        </button>

      </nav>


      {/* LOGOUT */}

      <div
        className="
          border-t
          border-slate-200
          p-4
          dark:border-slate-700
        "
      >

        <button
          onClick={onLogout}
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            text-red-500
            transition
            hover:bg-red-50
            dark:hover:bg-red-500/10
          "
        >

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </aside>
  );
};

export default CashierSidebar;