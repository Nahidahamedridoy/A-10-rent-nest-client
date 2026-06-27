import { serverFetch } from "../server";

export const myBookings = async (email) => {
    // console.log("email",email);

    const result = await serverFetch(`/api/property/${email}`);
    // console.log(result, "MY PRP");
    return result;
}
// for all showing
export const fetchEvents = async (query) => {
    // console.log("email",email);

    const result = await serverFetch(`/api/property?${query.toString()}`);
    // console.log(result, "MY PRP");
    return result;
}