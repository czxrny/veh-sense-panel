import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/Auth";
import { isAdmin } from "../utils/Jwt";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login({ email, password });
      console.log("Login data:", data);

      if (data && isAdmin(data.token)) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        throw new Error("User is not admin or login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Could not login: " + err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-80"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Vehsense Admin Panel</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Hasło"
          className="w-full border border-gray-300 rounded-md p-2 mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
            Login
        </button>
      </form>
    </div>
  );
}
