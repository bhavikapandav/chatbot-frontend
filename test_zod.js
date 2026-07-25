import { z } from "zod";

const testSchema = z.string({ message: "E-mail is required" })
    .trim()
    .min(1, { message: "E-mail is required" })
    .email({ message: "Invalid E-mail" });

console.log("undefined:", testSchema.safeParse(undefined).error?.issues[0].message);
console.log("null:", testSchema.safeParse(null).error?.issues[0].message);
console.log("empty string:", testSchema.safeParse("").error?.issues[0].message);
console.log("spaces:", testSchema.safeParse("   ").error?.issues[0].message);
console.log("invalid email:", testSchema.safeParse("invalid-email").error?.issues[0].message);
console.log("valid email:", testSchema.safeParse("test@example.com").success);
