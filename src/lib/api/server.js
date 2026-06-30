import { baseURL } from "./baseUrl"
import { getTokenServer } from "../getTokenServer";

//update delete add
export const serverMutation = async (path, method, data) => {

    const token = await getTokenServer();

    const res = await fetch(`${baseURL}${path}`, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });
    return await res.json();
};

export const deleteMutation = async (path) => {
    const res = await fetch(`${baseURL}${path}`, {
        method: "DELETE",

    });
    return await res.json();
}

export const serverFetch = async (path) => {

    const token = await getTokenServer()
    console.log(token);

    const res = await fetch(`${baseURL}${path}`, {
        cache: "no-store",
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return res.json();
};