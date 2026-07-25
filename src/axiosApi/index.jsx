import axios from "axios";
import { appConfig } from '../config'

const axiosApi = axios.create({
    baseURL: appConfig.API_URL,
});

const setAuthHeader = (token) => {
    axiosApi.defaults.headers.Authorization =
        token || `Bearer ${localStorage.getItem("_token")}`;
    // axiosApi.defaults.headers.requesttoken = requestTokenGenerate();
    // axiosApi.defaults.headers.devicename = appConfig?.DEVICE_TYPE;
};


axiosApi.defaults.headers = {
    Authorization: `Bearer ${localStorage.getItem("_token")}`,
    // requesttoken: requestTokenGenerate(),
    // devicename: appConfig?.DEVICE_TYPE,
};


// setInterval(() => {
//     axiosApi.defaults.headers.requesttoken = requestTokenGenerate();
// }, 2 * 60 * 1000);

axiosApi.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error?.response?.status === 404) {
            console.log("/404");
        } else if (error?.response?.status === 500) {
            console.log("/500");
        } else if (error?.response?.status === 401) {
            // localStorage?.removeItem("_token");
        } else {
            console.log("/other-errors.");
        }
        return Promise.reject(error);
    }
);

export { axiosApi, setAuthHeader }