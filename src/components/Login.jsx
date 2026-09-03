import React, { useState } from "react";

import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  LogIn,
  Monitor,
} from "lucide-react";

const Login = ({ onLogin }) => {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");


  // =========================
  // LOGIN FUNCTION
  // =========================

  const handleSubmit = (e) => {

    e.preventDefault();

    setError("");


    // ADMIN

    if (
      email === "admin@gmail.com" &&
      password === "123456"
    ) {
      onLogin("admin");
      return;
    }


    // CASHIER

    if (
      email === "cashier@gmail.com" &&
      password === "123456"
    ) {
      onLogin("cashier");
      return;
    }


    // WRONG LOGIN

    setError("Invalid email or password");

  };


  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        p-6
        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-emerald-950
      "
    >

      <div className="w-full max-w-md">


        {/* ========================= */}
        {/* LOGO */}
        {/* ========================= */}

        <div className="mb-8 text-center">

          <div
            className="
              mx-auto
              mb-4
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-emerald-500
              shadow-lg
              shadow-emerald-500/30
            "
          >

            <Monitor
              className="h-8 w-8 text-white"
            />

          </div>


          <h1 className="text-3xl font-bold text-white">
            RPR POS
          </h1>


          <p className="mt-2 text-slate-400">
            Computer Store Management System
          </p>

        </div>


        {/* ========================= */}
        {/* LOGIN CARD */}
        {/* ========================= */}

        <div
          className="
            rounded-3xl
            border
            border-white/10
            bg-white/10
            p-8
            shadow-2xl
            backdrop-blur-xl
          "
        >

          <h2 className="text-2xl font-bold text-white">
            Welcome Back 👋
          </h2>


          <p className="mt-1 mb-7 text-sm text-slate-400">
            Sign in to continue
          </p>


          {/* ========================= */}
          {/* FORM */}
          {/* ========================= */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >


            {/* EMAIL */}

            <div>

              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-slate-300
                "
              >
                Email
              </label>


              <div className="relative">

                <Mail
                  size={20}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-500
                  "
                />


                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Enter your email"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-white/10
                    bg-slate-900/70
                    py-3.5
                    pl-12
                    pr-4
                    text-white
                    placeholder:text-slate-500
                    outline-none
                    transition
                    focus:border-emerald-500
                    focus:ring-2
                    focus:ring-emerald-500/20
                  "
                  required
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div>

              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-slate-300
                "
              >
                Password
              </label>


              <div className="relative">

                <Lock
                  size={20}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-500
                  "
                />


                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Enter your password"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-white/10
                    bg-slate-900/70
                    py-3.5
                    pl-12
                    pr-12
                    text-white
                    placeholder:text-slate-500
                    outline-none
                    transition
                    focus:border-emerald-500
                    focus:ring-2
                    focus:ring-emerald-500/20
                  "
                  required
                />


                {/* SHOW PASSWORD */}

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-500
                    hover:text-white
                  "
                >

                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}

                </button>

              </div>

            </div>


            {/* ERROR */}

            {error && (

              <div
                className="
                  rounded-xl
                  border
                  border-red-500/20
                  bg-red-500/10
                  p-3
                  text-sm
                  text-red-400
                "
              >
                {error}
              </div>

            )}


            {/* REMEMBER */}

            <div className="flex items-center justify-between">

              <label
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-slate-400
                "
              >

                <input
                  type="checkbox"
                  className="h-4 w-4 accent-emerald-500"
                />

                Remember me

              </label>


              <button
                type="button"
                className="
                  text-sm
                  font-medium
                  text-emerald-400
                  hover:text-emerald-300
                "
              >
                Forgot password?
              </button>

            </div>


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-emerald-500
                py-3.5
                font-semibold
                text-white
                shadow-lg
                shadow-emerald-500/20
                transition
                hover:bg-emerald-400
                active:scale-[0.98]
              "
            >

              <LogIn size={20} />

              Sign In

            </button>

          </form>


          {/* ========================= */}
          {/* DEMO ACCOUNTS */}
          {/* ========================= */}

          <div className="mt-6 space-y-3">

            <p
              className="
                text-center
                text-xs
                font-medium
                uppercase
                tracking-wider
                text-slate-500
              "
            >
              Demo Accounts
            </p>


            {/* ADMIN */}

            <div
              className="
                rounded-xl
                border
                border-blue-500/20
                bg-blue-500/10
                p-3
              "
            >

              <p className="text-sm font-semibold text-blue-400">
                Admin
              </p>

              <p className="text-xs text-slate-400">
                admin@gmail.com
              </p>

              <p className="text-xs text-slate-400">
                Password: 123456
              </p>

            </div>


            {/* CASHIER */}

            <div
              className="
                rounded-xl
                border
                border-emerald-500/20
                bg-emerald-500/10
                p-3
              "
            >

              <p className="text-sm font-semibold text-emerald-400">
                Cashier
              </p>

              <p className="text-xs text-slate-400">
                cashier@gmail.com
              </p>

              <p className="text-xs text-slate-400">
                Password: 123456
              </p>

            </div>

          </div>


          {/* FOOTER */}

          <p className="mt-7 text-center text-xs text-slate-500">
            © 2026 RPR POS. All rights reserved.
          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;