import { useState } from "react";
import {
  FaCoffee,
  FaPlus,
  FaMinus,
  FaTrash,
  FaSignOutAlt,
} from "react-icons/fa";

function POS({ user, onLogout }) {

  const products = [
    {
      id: 1,
      name: "Iced Coffee",
      price: 2.5,
    },
    {
      id: 2,
      name: "Milk Tea",
      price: 2,
    },
    {
      id: 3,
      name: "Orange Juice",
      price: 2.5,
    },
    {
      id: 4,
      name: "Green Tea",
      price: 1.5,
    },
  ];

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {

    const existing = cart.find(
      (item) => item.id === product.id
    );

    if (existing) {

      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );

    } else {

      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);

    }
  };

  const increase = (id) => {

    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );

  };

  const decrease = (id) => {

    setCart(
      cart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );

  };

  const removeItem = (id) => {

    setCart(
      cart.filter((item) => item.id !== id)
    );

  };

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}
      <header className="h-20 bg-white border-b flex items-center justify-between px-8">

        <div>
          <h1 className="text-2xl font-bold">
            Point of Sale
          </h1>

          <p className="text-sm text-slate-500">
            Welcome, {user.name}
          </p>
        </div>

        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-red-500"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </header>

      {/* Main */}
      <main className="p-8 grid grid-cols-3 gap-8">

        {/* Products */}
        <section className="col-span-2">

          <h2 className="text-xl font-bold mb-5">
            Products
          </h2>

          <div className="grid grid-cols-3 gap-5">

            {products.map((product) => (

              <button
                key={product.id}
                onClick={() => addToCart(product)}
                className="bg-white rounded-2xl p-6 text-left border hover:border-blue-500 hover:shadow-lg transition"
              >

                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl mb-4">
                  <FaCoffee />
                </div>

                <h3 className="font-bold text-slate-800">
                  {product.name}
                </h3>

                <p className="text-blue-600 font-bold mt-2">
                  ${product.price.toFixed(2)}
                </p>

                <div className="mt-4 text-sm text-slate-500">
                  Click to add
                </div>

              </button>

            ))}

          </div>

        </section>

        {/* Cart */}
        <section className="bg-white rounded-2xl p-6 border">

          <h2 className="text-xl font-bold mb-6">
            Current Order
          </h2>

          {cart.length === 0 ? (

            <div className="text-center py-20 text-slate-400">
              Cart is empty
            </div>

          ) : (

            <div className="space-y-5">

              {cart.map((item) => (

                <div
                  key={item.id}
                  className="border-b pb-4"
                >

                  <div className="flex justify-between">

                    <div>
                      <h3 className="font-semibold">
                        {item.name}
                      </h3>

                      <p className="text-sm text-slate-500">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        removeItem(item.id)
                      }
                      className="text-red-500"
                    >
                      <FaTrash />
                    </button>

                  </div>

                  <div className="flex items-center gap-3 mt-3">

                    <button
                      onClick={() =>
                        decrease(item.id)
                      }
                      className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center"
                    >
                      <FaMinus size={10} />
                    </button>

                    <span className="font-bold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increase(item.id)
                      }
                      className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center"
                    >
                      <FaPlus size={10} />
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

          {/* Total */}
          <div className="border-t mt-6 pt-5">

            <div className="flex justify-between text-slate-500">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-xl font-bold mt-3">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              disabled={cart.length === 0}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white py-4 rounded-xl font-bold transition"
            >
              PAY ${total.toFixed(2)}
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default POS;
