import { apiFetch } from "./Core";

export async function getAllDrivers() {
    const options = {
        method: "GET",
        auth: "token",
    }
    return apiFetch("/admin/users", options)
}

export async function addDriver(body) {
    const options = {
        method: "POST",
        auth: "apikey",
        body: JSON.stringify(body)
    }
    return apiFetch("/admin/users", options)
}

export async function deleteDriver(id) {
    const options = {
        method: "DELETE",
        auth: "token",
    }
    return apiFetch(`/users/${id}`, options);
}