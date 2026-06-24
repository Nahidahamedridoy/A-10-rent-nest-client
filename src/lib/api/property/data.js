import { serverFetch } from "../server";

export const myBookings = async (email) => {
    // console.log("email",email);
    
    const result = await serverFetch(`/api/property/${email}`);
    // console.log(result, "MY PRP");
    return result;
}