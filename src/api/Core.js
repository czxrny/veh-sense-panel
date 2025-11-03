//const BASE_URL = import.meta.env.VITE_BASE_URL;
const BASE_URL = "/api";
const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * Fetch wrapper. Lets not duplicate the boilerplate.
 * @param {string} path - endpoint path
 * @param {object} requestData - fetch requestData (body, method etc..))
 * @param {'token'|'apikey'|false} requestData.auth - authorization type (false by default)
 */
export async function apiFetch(path, requestData = {}) {
    const {
        auth = false, 
        headers = {}, 
        ...rest
    } = requestData;

    const finalHeaders = {
        'Content-Type': 'application/json',
        ...headers,
    };

    if (auth === 'token') {
        const token = localStorage.getItem('token');
        if (token) {
            finalHeaders.Authorization = `Bearer ${token}`;
        }
    } else if (auth === 'apikey') {
        finalHeaders.Authorization = `ApiKey ${API_KEY}`;
    }

    const res = await fetch(`${BASE_URL}${path}`, {
        headers: finalHeaders,
        ...rest
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`API error: ${res.status} ${errorText}`);
    }



    const contentLength = res.headers.get('content-length');
    if (res.status === 204 || contentLength === '0') {
        return null;
    }

    return res.json();
}