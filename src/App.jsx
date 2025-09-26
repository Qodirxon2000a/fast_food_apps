import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/pages/Dashboard";
import Orders from "./components/pages/Orders";
import NewOrder from "./components/pages/NewOrder";
import Layout from "./components/Layout/Layout";

function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  console.log("isLoggedIn:", isLoggedIn); // Debug log
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

function App() {
  useEffect(() => {
    // Faqat sahifa haqiqatan refresh bo'lganda localStorage clear qilinsin
    const navEntries = performance.getEntriesByType("navigation");
    if (navEntries.length > 0 && navEntries[0].type === "reload") {
      localStorage.clear();
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/app"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="new-order" element={<NewOrder />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
