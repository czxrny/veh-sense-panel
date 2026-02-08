import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddDriver = () => {
  const navigate = useNavigate();
  const [user_name, setUserName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      user_name,
      email,
      password,
    };

    try {
      await addDriver(payload);
      alert("Driver added successfully!");
      navigate("/drivers");
    } catch (err) {
      console.error(err);
      alert("Failed to add driver");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-6 font-mono"
      style={{ fontFamily: "Courier New, monospace" }}
    >
      <div className="shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-[#c7cfa7] text-center">
          Add New Driver
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-bold mb-1 text-[#929c6b]">Name</label>
            <input
              type="text"
              name="user_name"
              value={user_name}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="w-full rounded-md px-3 py-2 border border-[#3a3d2b] bg-[#464940] text-white focus:outline-none focus:ring-2 focus:ring-[#6c734f]"
            />
          </div>

          <div>
            <label className="block font-bold mb-1 text-[#929c6b]">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md px-3 py-2 border border-[#3a3d2b] bg-[#464940] text-white focus:outline-none focus:ring-2 focus:ring-[#6c734f]"
            />
          </div>

          <div>
            <label className="block font-bold mb-1 text-[#929c6b]">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-md px-3 py-2 border border-[#3a3d2b] bg-[#464940] text-white focus:outline-none focus:ring-2 focus:ring-[#6c734f]"
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate("/drivers")}
              className="px-4 py-2 rounded-md bg-[#3a3d2b] hover:bg-[#6c734f] transition font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-[#6c734f] text-white hover:bg-[#929c6b] transition font-bold"
            >
              Add Driver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDriver;
