import { FaStore, FaUserShield, FaCashRegister } from "react-icons/fa";

function Login({ onLogin }) {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
            <FaStore />
          </div>

          <h1 className="text-3xl font-bold text-slate-800">
            FreshPOS
          </h1>

          <p className="text-slate-500 mt-2">
            Point of Sale System
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-xl font-bold text-slate-800 mb-2">
            Welcome Back
          </h2>

          <p className="text-sm text-slate-500 mb-6">
            Select your account type
          </p>

          <div className="space-y-4">

            {/* Admin */}
            <button
              onClick={() => onLogin("admin")}
              className="w-full flex items-center gap-4 p-5 border border-slate-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition"
            >
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                <FaUserShield />
              </div>

              <div className="text-left">
                <h3 className="font-bold text-slate-800">
                  Admin
                </h3>

                <p className="text-sm text-slate-500">
                  Manage the entire POS system
                </p>
              </div>
            </button>

            {/* Cashier */}
            <button
              onClick={() => onLogin("cashier")}
              className="w-full flex items-center gap-4 p-5 border border-slate-200 rounded-2xl hover:border-green-500 hover:bg-green-50 transition"
            >
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                <FaCashRegister />
              </div>

              <div className="text-left">
                <h3 className="font-bold text-slate-800">
                  Cashier
                </h3>

                <p className="text-sm text-slate-500">
                  Process customer orders
                </p>
              </div>
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;
