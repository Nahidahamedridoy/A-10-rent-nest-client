"use server";

import { serverMutation } from "../server";

export const addProperties = async (data) =>{
    const resData = await serverMutation("/api/properties"  , "POST" , data);
    return resData;
}