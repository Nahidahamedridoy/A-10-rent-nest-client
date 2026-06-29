import { headers } from "next/headers";
import { serverFetch } from "../server";
import { auth } from "@/lib/auth";

export const fetchMyBooking = async (email) => {
    
    // const { token } = await auth.api.getAccessToken({
    //     headers: await headers(),
    // });
    // console.log(token);

    const result = await serverFetch(`/api/property/booking/${email}`);

    return result;
}