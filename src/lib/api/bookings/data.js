
import { serverFetch } from "../server";


export const fetchMyBooking = async (email) => {
    
    // const { token } = await auth.api.getAccessToken({
    //     headers: await headers(),
    // });
    // console.log(token);

    const result = await serverFetch(`/api/property/booking/${email}`);

    return result;
}