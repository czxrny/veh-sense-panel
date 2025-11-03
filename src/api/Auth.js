import { apiFetch } from "./Core";

export async function login(body) {
    const options = {
        method: "POST",
        auth: "apikey",
        body: JSON.stringify(body)
    }
    return apiFetch("/auth/login", options)
}
