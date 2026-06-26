import { serverFetch } from "../server";

export const myBookings = async (email) => {
    // console.log("email",email);

    const result = await serverFetch(`/api/property/${email}`);
    // console.log(result, "MY PRP");
    return result;
}
// for all showing
export const fetchEvents = async () => {
    // console.log("email",email);

    const result = await serverFetch(`/api/property`);
    // console.log(result, "MY PRP");
    return result;
}