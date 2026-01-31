import { apiFetch } from "./Core";

export async function getReports() {
    const options = {
        method: "GET",
        auth: "token",
    }
    return apiFetch("admin/reports", options)
}

export async function getReportById(id) {
    const options = {
        method: "GET",
        auth: "token",
    }
    return apiFetch(`/reports/${id}`, options);
}

export async function getRideDataById(id) {
    const options = {
        method: "GET",
        auth: "token",
    }
    return apiFetch(`/reports/${id}/data`, options);
}

export async function deleteReport(id) {
    const options = {
        method: "DELETE",
        auth: "token",
    }
    return apiFetch(`/reports/${id}`, options);
}