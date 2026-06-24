"use server";

import { serverMutation } from "../server";

export const addProperties = async (data) =>{
    const resData = await serverMutation("/api/properties"  , "POST" , data);
    return resData;
};

export const updatePrp = async (data , id) =>{

    const resData = await serverMutation(`/api/properties/${id}` , "PATCH" , data);
    return resData;
};