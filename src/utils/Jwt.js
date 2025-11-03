import { jwtDecode } from "jwt-decode";

export function isAdmin(token) {
  try {
    const decoded = jwtDecode(token);
    console.log("Decoded token:", decoded);

    return decoded.rol === "admin";
  } catch (err) {
    console.error("Invalid token:", err);
    return false;
  }
}
