import { apiFetch } from "./Core";

export async function getAllVehicles() {
    const options = {
        method: "GET",
        auth: "token",
    }
    return apiFetch("/vehicles", options)
}

export async function getVehicleById(id) {
    const options = {
        method: "GET",
        auth: "token",
    }
    return apiFetch(`/vehicles/${id}`, options)
}

export async function addVehicle(body) {
    const options = {
        method: "POST",
        auth: "token",
        body: JSON.stringify(body)
    }
    return apiFetch(`/vehicles`, options);
}

export async function editVehicle(id, body) {
    const options = {
        method: "PATCH",
        auth: "token",
        body: JSON.stringify(body)
    }
    return apiFetch(`/vehicles/${id}`, options);
}

export async function deleteVehicle(id) {
    const options = {
        method: "DELETE",
        auth: "token",
    }
    return apiFetch(`/vehicles/${id}`, options);
}