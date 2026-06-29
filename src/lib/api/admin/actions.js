"use server";

import { getAdminOverview } from "./data";

export async function fetchAdminOverview() {
    return await getAdminOverview();
}