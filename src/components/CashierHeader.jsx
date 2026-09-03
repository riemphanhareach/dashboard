import React from "react";
import { Bell, Search } from "lucide-react";

const CashierHeader = () => {

  return (
    <header
      className="
        flex
        h-20
        items-center
        justify-between
        border-b
        border-slate-200
        bg-white/80
        px-6
        backdrop-blur-xl
        dark:border-slate-700
        dark:bg-slate-900/80
      "
    >

      <div>

        <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
          Cashier POS
        </h2>

      </div>


      <div className="flex items-center gap-4">

        <div className="relative">

          <Search
            size={18}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="text"
            placeholder="Search..."
            className="
              w-64
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              py-2.5
              pl-10
              pr-4
              outline-none
              focus:border-emerald-500
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-white
            "
          />

        </div>


        <button
          className="
            rounded-xl
            p-3
            text-slate-500
            hover:bg-slate-100
            dark:hover:bg-slate-800
          "
        >
          <Bell size={20} />
        </button>


        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-emerald-500
            font-semibold
            text-white
          "
        >
          C
        </div>

      </div>

    </header>
  );
};

export default CashierHeader;