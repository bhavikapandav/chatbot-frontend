import { z } from "zod";
import { validateField, validateForm } from "../../helpers";
export const loginSchema = z.object({
    email: z
        .string({ message: "E-mail is required" })
        .trim()
        .min(1, { message: "E-mail is required" })
        .email({ message: "Invalid E-mail" }),
    password: z
        .string({ message: "Password is required" })
        .trim()
        .min(1, { message: "Password is required" })
        .min(8, { message: "Password must be at least 8 characters." })
        .max(16, { message: "Password must not exceed 16 characters." })
        .regex(/[A-Z]/, {
            message: "Password must contain at least one uppercase letter.",
        })
        .regex(/[!@#$%^&*(),.?":{}|<>_\-\\[\]/+=~`]/, {
            message: "Password must contain at least one special character.",
        }),
});

export const validateLogin = (name, value, validateMessages) => {
    return {
        errors: validateField(
            loginSchema,
            name,
            value,
            validateMessages
        ),
    };
};
// assad
export const validateSubmitLogin = (data) => {
    return {
        errors: validateForm(loginSchema, data),
    };
};
