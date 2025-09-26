// Dashboard.jsx
import React, { useEffect, useState } from "react";
import "../css/Dashboard.css"; // style alohida bo‘ladi

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <h2>Ma'lumot topilmadi ❌</h2>;
  }

  return (
    <div className="dashboard-container">
      <div className="profile-card">
        <div className="profile-image">
          <img
            src={`http://localhost:5000${user.image}`} // serverdan rasm olish
            alt={user.name}
          />
        </div>
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p><strong>Lavozimi:</strong> {user.position}</p>
          <p><strong>Yoshi:</strong> {user.age}</p>
          <p><strong>Ish vaqti:</strong> {user.workTime}</p>
          <p><strong>Telefon:</strong> {user.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
