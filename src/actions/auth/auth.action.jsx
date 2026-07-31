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

export const doFetchUserAuthDetails = async (userId) => {
    try {
        const response = await axiosApi({
            method: "get",
            url: `v1/user/${userId}/details`,
        });
        return response.data;
    } catch (error) {
        console.log({ error });
        return error.response;
    }
};

export const doUpdateUserAuthDetails = async (userId, data) => {
    try {
        const response = await axiosApi({
            method: "post",
            url: `v1/user/${userId}/edit-profile`,
            data: data,
        });
        return response.data;
    } catch (error) {
        console.log({ error });
        return error.response;
    }
};
