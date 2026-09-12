import { useState } from "react";
import { Utensils, Lock, User, AlertCircle } from "lucide-react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please fill in both username and password.");
      return;
    }

    if (username.trim().toLowerCase() === "admin" && password === "admin123") {
      onLogin({ username: "admin", role: "admin", name: "Administrator" });
    } else if (username.trim().toLowerCase() === "cashier" && password === "cashier123") {
      onLogin({ username: "cashier", role: "cashier", name: "Cashier Sarah" });
    } else {
      setError("Invalid username or password. Check demo credentials below.");
    }
  };

  const handleQuickFill = (u, p) => {
    setUsername(u);
    setPassword(p);
    setError("");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 text-center text-white">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow">
            <Utensils className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-black tracking-wide">QuickBite POS</h1>
          <p className="text-orange-100 text-sm mt-1">Fast-Food Restaurant System</p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin or cashier"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-orange-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-orange-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-xl shadow-md shadow-orange-500/25 text-sm transition-all transform active:scale-98 mt-2"
          >
            Login to QuickBite
          </button>

          {/* Quick Demo Login Helpers */}
          <div className="pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400 font-semibold mb-2 uppercase tracking-wider">
              Quick 1-Click Demo Accounts:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill("admin", "admin123")}
                className="p-2 bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-300 rounded-xl text-xs font-bold text-slate-700 transition-colors"
              >
                Admin (admin123)
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill("cashier", "cashier123")}
                className="p-2 bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-300 rounded-xl text-xs font-bold text-slate-700 transition-colors"
              >
                Cashier (cashier123)
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

