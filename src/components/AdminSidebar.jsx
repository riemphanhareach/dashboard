import {
  FaChartPie,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaStore,
} from "react-icons/fa";

function AdminSidebar({ onLogout }) {

  const menu = [
    {
      name: "Dashboard",
      icon: <FaChartPie />,
    },
    {
      name: "Products",
      icon: <FaBox />,
    },
    {
      name: "Orders",
      icon: <FaShoppingCart />,
    },
    {
      name: "Customers",
      icon: <FaUsers />,
    },
    {
      name: "Reports",
      icon: <FaChartBar />,
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-slate-700">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <FaStore />
          </div>

          <div>
            <h1 className="font-bold text-lg">
              FreshPOS
            </h1>

            <p className="text-xs text-slate-400">
              Admin Panel
            </p>
          </div>

        </div>

      </div>

      {/* Menu */}
      <nav className="flex-1 p-4">

        <p className="text-xs text-slate-500 uppercase font-semibold px-3 mb-3">
          Main Menu
        </p>

        <div className="space-y-2">

          {menu.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition
                ${
                  index === 0
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }
              `}
            >
              <span>{item.icon}</span>

              <span className="font-medium">
                {item.name}
              </span>
            </button>
          ))}

        </div>

        <p className="text-xs text-slate-500 uppercase font-semibold px-3 mt-8 mb-3">
          System
        </p>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white">
          <FaCog />
          Settings
        </button>

      </nav>

      {/* User */}
      <div className="p-4 border-t border-slate-700">

        <div className="flex items-center gap-3 mb-4">

          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            R
          </div>

          <div>
            <p className="font-semibold">
              Reach
            </p>

            <p className="text-xs text-slate-400">
              Administrator
            </p>
          </div>

        </div>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default AdminSidebar;
