import { useState } from "react";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import POS from "./pages/POS";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (role) => {
    setUser({
      name: role === "admin" ? "Reach" : "Cashier",
      role: role,
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  if (user.role === "admin") {
    return <AdminDashboard user={user} onLogout={handleLogout} />;
  }

  return <POS user={user} onLogout={handleLogout} />;
}

export default App;