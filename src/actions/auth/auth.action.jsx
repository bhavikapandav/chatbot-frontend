import { axiosApi } from "../../axiosApi";


export const doFetchLogin = async (data) => {
    try {
        const response = await axiosApi({
            method: "post",
            url: "v1/user/login",
            data: data,
        });
        console.log("response===============", response);

        return response.data;
    } catch (error) {
        console.log({ error });
        return error.response;
    }   
};

export const doFetchRegistration = async (data) => {
    try {
        const response = await axiosApi({
            method: "post",
            url: "v1/user/register",
            data: data,
        });
        return response.data;
    } catch (error) {
        console.log({ error });
        return error.response;
    }
};