"use server";

import { authClient } from "@/lib/auth-client";
import { deleteMutation, serverMutation } from "../server";

export const addProperty = async (data) => {


    const resData = await serverMutation("/api/property", "POST", data);
    return resData;
};

export const updateProperty = async (data, id) => {

    const resData = await serverMutation(`/api/property/${id}`, "PATCH", data);
    return resData;
};

export const deleteProperty = async (id) => {
    const resData = await deleteMutation(`/api/property/${id}`, "DELETE");
    return resData;
};