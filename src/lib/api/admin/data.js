import { baseURL } from "../baseUrl";


export const getAdminOverview = async () => {
    const res = await fetch(`${baseURL}/api/admin/overview`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch admin overview");
    }

    return res.json();
};