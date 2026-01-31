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
<div
  className="flex items-center justify-center min-h-screen w-full"
  style={{ backgroundColor: "#262622", fontFamily: "Courier New, monospace" }}
>
  <form
    onSubmit={handleSubmit}
    className="shadow-lg rounded-xl p-8 w-80"
    style={{ backgroundColor: "#21211e", color: "#ffffff" }}
  >
    <h2
      className="text-2xl font-bold text-center mb-6"
      style={{ color: "#dcdcdc" }}
    >
      Vehsense Admin Panel
    </h2>

    <input
      type="email"
      placeholder="Email"
      className="w-full rounded-md p-2 mb-4"
      style={{
        backgroundColor: "#262622",
        border: "1px solid #3a3d2b",
        color: "#ffffff",
        fontFamily: "Courier New, monospace",
      }}
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <input
      type="password"
      placeholder="Password"
      className="w-full rounded-md p-2 mb-6"
      style={{
        backgroundColor: "#262622",
        border: "1px solid #3a3d2b",
        color: "#ffffff",
        fontFamily: "Courier New, monospace",
      }}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <button
      type="submit"
      className="w-full py-2 rounded-md transition"
      style={{
        backgroundColor: "#6c734f",
        color: "#ffffff",
        fontWeight: "bold",
      }}
    >
      Login
    </button>
  </form>
</div>

  );
}
