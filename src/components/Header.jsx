import { Link } from "react-router-dom";
import { Store, LogOut, User } from "lucide-react";

export default function Header({ title, user, onLogout }) {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between sticky top-0 z-20">
      <div>
        <h1 className="text-xl font-black text-slate-800 tracking-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        {user?.role === "admin" && (
          <Link
            to="/pos"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
          >
            <Store className="w-4 h-4" />
            <span>Open POS</span>
          </Link>
        )}

        <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
          <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 font-bold flex items-center justify-center text-xs">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden sm:block text-left">
            <span className="text-xs font-bold text-slate-800 block leading-tight">
              {user?.name || user?.username}
            </span>
            <span className="text-[10px] text-orange-500 uppercase font-extrabold">
              {user?.role}
            </span>
          </div>

          <button
            onClick={onLogout}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors ml-1"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

