import React from "react";

import {
  LayoutDashboard,
  Package,
  Users,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

const AdminSidebar = ({ onLogout }) => {

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

        <h1 className="text-2xl font-bold text-blue-500">
          RPR POS
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Admin Panel
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
            bg-blue-500
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
            hover:bg-blue-50
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
            hover:bg-blue-50
            dark:text-slate-300
            dark:hover:bg-slate-800
          "
        >
          <Users size={20} />
          Users
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
            hover:bg-blue-50
            dark:text-slate-300
            dark:hover:bg-slate-800
          "
        >
          <BarChart3 size={20} />
          Reports
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
            hover:bg-blue-50
            dark:text-slate-300
            dark:hover:bg-slate-800
          "
        >
          <Settings size={20} />
          Settings
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

export default AdminSidebar;