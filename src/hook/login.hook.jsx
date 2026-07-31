import { doFetchLogin } from "@actions";
import { useNavigate } from "react-router";
import { useState } from "react";
import { validateLogin, validateSubmitLogin } from "@validations";
import { setAuthHeader } from "../axiosApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { storeUserAuthDetails } from "../redux/reducers(slices)/userDetails.reducer";

export const useLoginHook = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [loginData, setLoginData] = useState({});
    const [validateMessages, setValidateMessages] = useState({});

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        const { errors } = validateLogin(name, value, validateMessages);
        setValidateMessages(errors);

        setLoginData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleLoginSubmit = () => {
        try {
            const { errors } = validateSubmitLogin(loginData);
            setValidateMessages(errors);
            if (Object.keys(errors).length === 0) {
                loginCallback();
            }
        } catch (error) {
            console.log({ error });
        }
    };

    const loginCallback = async () => {
        try {
            setIsLoading(true);

            const requestData = {
                email: loginData?.email,
                password: loginData?.password,
            };

            const loginResponse = await doFetchLogin(requestData);
            if (loginResponse?.status === 200) {
                localStorage.clear();
                if (loginResponse?.data?.token) {
                    localStorage.setItem("_token", loginResponse?.data?.token);
                    localStorage.setItem("_userId", loginResponse?.data?._id);
                    setAuthHeader(`Bearer ${loginResponse?.data?.token}`);
                }
                dispatch(storeUserAuthDetails(loginResponse?.data));
                navigate("/");
            } else {
                toast.error(loginResponse?.data?.message);
            }
        } catch (error) {
            console.error("Error occurred during admin login:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        loginData,
        validateMessages,
        handleInputChange,
        handleLoginSubmit,
    };
};