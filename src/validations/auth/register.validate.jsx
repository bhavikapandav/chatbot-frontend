import { z } from "zod";
import { validateField, validateForm } from "@helpers"
export const registerSchema = z.object({
    firstName: z
        .string({ message: "First name is required" })
        .trim()
        .min(1, { message: "First name is required" })
        .min(2, { message: "First name must be at least 2 characters." })
        .max(50, { message: "First name must not exceed 50 characters." })
        .regex(/^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/, {
            message:
                "First name can only contain letters, spaces, hyphens (-), and apostrophes (').",
        }),

    lastName: z
        .string({ message: "Last name is required" })
        .trim()
        .min(1, { message: "Last name is required" })
        .min(2, { message: "Last name must be at least 2 characters." })
        .max(50, { message: "Last name must not exceed 50 characters." })
        .regex(/^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/, {
            message:
                "Last name can only contain letters, spaces, hyphens (-), and apostrophes (').",
        }),
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
})

export const validateRegister = (name, value, validateMessages) => {
    return {
        errors: validateField(
            registerSchema,
            name,
            value,
            validateMessages
        ),
    };
};

export const validateSubmitRegister = (data) => {
    return {
        errors: validateForm(registerSchema, data),
    };
};