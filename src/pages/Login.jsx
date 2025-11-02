import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await fetch(
        `/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `ApiKey ${import.meta.env.VITE_API_KEY}`,
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      console.log(data)

      if (response.ok && data.token) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        alert(data.message || "Login error");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Could not login");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
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
