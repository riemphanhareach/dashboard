import AdminSidebar from "../components/AdminSidebar";
import {
  FaDollarSign,
  FaShoppingCart,
  FaBox,
  FaUsers,
} from "react-icons/fa";

function AdminDashboard({ user, onLogout }) {

  const cards = [
    {
      title: "Total Sales",
      value: "$12,450",
      icon: <FaDollarSign />,
    },
    {
      title: "Total Orders",
      value: "1,248",
      icon: <FaShoppingCart />,
    },
    {
      title: "Products",
      value: "86",
      icon: <FaBox />,
    },
    {
      title: "Customers",
      value: "524",
      icon: <FaUsers />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex">

      <AdminSidebar onLogout={onLogout} />

      <main className="flex-1">

        {/* Navbar */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Dashboard
            </h2>

            <p className="text-sm text-slate-500">
              Welcome back, {user.name}
            </p>
          </div>

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
              R
            </div>

          </div>

        </header>

        {/* Content */}
        <section className="p-8">

          {/* Cards */}
          <div className="grid grid-cols-4 gap-6">

            {cards.map((card, index) => (

              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
              >

                <div className="flex justify-between items-center">

                  <div>

                    <p className="text-sm text-slate-500">
                      {card.title}
                    </p>

                    <h3 className="text-2xl font-bold text-slate-800 mt-2">
                      {card.value}
                    </h3>

                  </div>

                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                    {card.icon}
                  </div>

                </div>

              </div>

            ))}

          </div>

          {/* Sales */}
          <div className="grid grid-cols-3 gap-6 mt-6">

            <div className="col-span-2 bg-white rounded-2xl p-6 border border-slate-200">

              <h3 className="font-bold text-lg text-slate-800">
                Sales Overview
              </h3>

              <div className="h-64 flex items-center justify-center text-slate-400">
                Sales Chart Here
              </div>

            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200">

              <h3 className="font-bold text-lg text-slate-800 mb-5">
                Best Products
              </h3>

              <div className="space-y-4">

                <div className="flex justify-between">
                  <span>Iced Coffee</span>
                  <b>$1,250</b>
                </div>

                <div className="flex justify-between">
                  <span>Milk Tea</span>
                  <b>$980</b>
                </div>

                <div className="flex justify-between">
                  <span>Orange Juice</span>
                  <b>$720</b>
                </div>

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;
