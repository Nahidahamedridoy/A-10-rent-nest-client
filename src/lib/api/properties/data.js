import { serverFetch } from "../server"

export const myProperties = async (email) =>{
    const result = await serverFetch(`"/api/properties/${email}"`);
    console.log(result , "MY PRP");
    return result;
}