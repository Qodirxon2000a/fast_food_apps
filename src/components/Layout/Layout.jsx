import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Home, List, PlusCircle } from "lucide-react";
import "./Layout.css"; // Layout uchun CSS

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const menus = [
    { path: "/app/dashboard", label: "Profile", icon: <Home size={22} /> },
    { path: "/app/orders", label: "Buyurtmalar", icon: <List size={22} /> },
    { path: "/app/new-order", label: "Buyurtma berish", icon: <PlusCircle size={22} /> },
  ];

  // faqat shu pagelarda bottom-nav ko‘rinadi
  const showBottomNavPaths = ["/app/dashboard", "/app/orders", "/app/new-order"];
  const showBottomNav = showBottomNavPaths.includes(location.pathname);

  return (
    <div className="app-layout">
      <div className="content">
        <Outlet /> {/* Sahifalar shu yerda ko‘rinadi */}
      </div>

      {showBottomNav && (
        <nav className="bottom-nav">
          {menus.map((menu) => (
            <button
              key={menu.path}
              className={`nav-item ${
                location.pathname === menu.path ? "active" : ""
              }`}
              onClick={() => navigate(menu.path)}
            >
              {menu.icon}
              <span>{menu.label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}

export default Layout;
