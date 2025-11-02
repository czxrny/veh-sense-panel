import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-green-600 text-center">
        Welcome to VehSense Admin Panel
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl px-6">
        <button
          onClick={() => navigate("/vehicles")}
          className="bg-white border border-gray-200 shadow-md rounded-2xl py-8 hover:shadow-xl hover:bg-green-50 transition-all flex flex-col items-center justify-center"
        >
          <span className="text-2xl mb-2">🚗</span>
          <span className="text-lg font-semibold text-gray-800">Vehicle Fleet</span>
        </button>

        <button
          onClick={() => navigate("/drivers")}
          className="bg-white border border-gray-200 shadow-md rounded-2xl py-8 hover:shadow-xl hover:bg-blue-50 transition-all flex flex-col items-center justify-center"
        >
          <span className="text-2xl mb-2">👨‍✈️</span>
          <span className="text-lg font-semibold text-gray-800">Drivers Management</span>
        </button>

        <button
          onClick={() => navigate("/reports")}
          className="bg-white border border-gray-200 shadow-md rounded-2xl py-8 hover:shadow-xl hover:bg-yellow-50 transition-all flex flex-col items-center justify-center"
        >
          <span className="text-2xl mb-2">📊</span>
          <span className="text-lg font-semibold text-gray-800">Reports Overview</span>
        </button>
      </div>

      <button
        onClick={handleLogout}
        className="mt-10 bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
