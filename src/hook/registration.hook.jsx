import { doFetchRegistration } from "@actions";
import { useNavigate } from "react-router";
import { useState } from "react";
import { validateRegister, validateSubmitRegister } from "@validations";
import { setAuthHeader } from "../axiosApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { storeUserAuthDetails } from "../redux/reducers(slices)/userDetails.reducer";


export const useRegisterHook = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [registerData, setRegisterData] = useState({});
    const [validateMessages, setValidateMessages] = useState({});

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        const { errors } = validateRegister(name, value, validateMessages);
        setValidateMessages(errors);

        setRegisterData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleRegisterSubmit = () => {
        try {
            const { errors } = validateSubmitRegister(registerData);
            setValidateMessages(errors);
            if (Object.keys(errors).length === 0) {
                registerCallback();
            }
        } catch (error) {
            console.log({ error });
        }
    }
    const registerCallback = async () => {
        try {
            setIsLoading(true);

            const requestData = {
                firstName: registerData?.firstName,
                lastName: registerData?.firstName,
                email: registerData?.email,
                password: registerData?.password,
            };

            const registerResponse = await doFetchRegistration(requestData);
            console.log("registerResponse========", registerResponse);

            if (registerResponse?.status === 200) {
                localStorage.clear();
                if (registerResponse?.data?.token) {
                    localStorage.setItem("_token", registerResponse?.data?.token);
                    localStorage.setItem("_userId", registerResponse?.data?._id);
                    setAuthHeader(`Bearer ${registerResponse?.data?.token}`);
                }
                dispatch(storeUserAuthDetails(registerResponse?.data));
                navigate("/");
            } else {
                toast.error(registerResponse?.data?.message);
            }
        } catch (error) {
            console.error("Error occurred during admin login:", error);
        } finally {
            setIsLoading(false);
        }
    };
    return {
        isLoading,
        registerData,
        validateMessages,
        handleInputChange,
        handleRegisterSubmit,
    }
};

