import {
  FaCashRegister,
  FaUsers,
  FaReceipt,
  FaSignOutAlt,
  FaStore,
  FaUser,
} from "react-icons/fa";

function CashierSidebar({ onLogout }) {
  const menu = [
    {
      name: "Point of Sale",
      icon: <FaCashRegister />,
    },
    {
      name: "Orders",
      icon: <FaReceipt />,
    },
    {
      name: "Customers",
      icon: <FaUsers />,
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">

          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
            <FaStore />
          </div>

          <div>
            <h1 className="font-bold text-lg">
              FreshPOS
            </h1>

            <p className="text-xs text-slate-400">
              Cashier Panel
            </p>
          </div>

        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">

        <p className="text-xs text-slate-500 uppercase font-semibold px-3 mb-3">
          Sales
        </p>

        <div className="space-y-2">

          {menu.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                index === 0
                  ? "bg-emerald-500 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span className="text-lg">
                {item.icon}
              </span>

              <span className="font-medium">
                {item.name}
              </span>
            </button>
          ))}

        </div>

      </nav>

      {/* Cashier Profile */}
      <div className="p-4 border-t border-slate-700">

        <div className="flex items-center gap-3 mb-4">

          <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
            <FaUser />
          </div>

          <div>
            <p className="font-semibold">
              Cashier
            </p>

            <p className="text-xs text-slate-400">
              Sales Staff
            </p>
          </div>

        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition"
        >
          <FaSignOutAlt />

          <span>
            Logout
          </span>
        </button>

      </div>

    </aside>
  );
}

export default CashierSidebar;
