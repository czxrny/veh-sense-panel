import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen" style={{ backgroundColor: "#262622", fontFamily: "Courier New, monospace" }}>
      <h1 className="text-3xl font-bold mb-8 text-center" style={{ color: "#aaaba3" }}>
        Welcome to VehSense Admin Panel
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl px-6">
        <button
          onClick={() => navigate("/vehicles")}
          className="shadow-md rounded-2xl py-8 flex flex-col items-center justify-center transition-all"
          style={{ backgroundColor: "#21211e", border: "1px solid #3a3d2b", color: "#dcdcdc" }}
        >
          <span className="text-2xl mb-2">🚗</span>
          <span className="text-lg font-bold">Vehicle Fleet</span>
        </button>

        <button
          onClick={() => navigate("/drivers")}
          className="shadow-md rounded-2xl py-8 flex flex-col items-center justify-center transition-all"
          style={{ backgroundColor: "#21211e", border: "1px solid #3a3d2b", color: "#dcdcdc" }}
        >
          <span className="text-2xl mb-2">👨‍✈️</span>
          <span className="text-lg font-bold">Drivers Management</span>
        </button>

        <button
          onClick={() => navigate("/reports")}
          className="shadow-md rounded-2xl py-8 flex flex-col items-center justify-center transition-all"
          style={{ backgroundColor: "#21211e", border: "1px solid #3a3d2b", color: "#dcdcdc" }}
        >
          <span className="text-2xl mb-2">📊</span>
          <span className="text-lg font-bold">Reports Overview</span>
        </button>
      </div>

      <button
        onClick={handleLogout}
        className="mt-10 px-6 py-2 rounded-full transition"
        style={{ backgroundColor: "#6c734f", color: "#ffffff", fontWeight: "bold" }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
