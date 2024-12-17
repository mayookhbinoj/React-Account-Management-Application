import {string, z} from "zod"

export const loginSchema=z.object({
    email:z.string().email("Email is required "),
    password: z.string().min(8, "Password must be at least 8 characters long").regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
})


export const registerSchema = z.object({
    name: z.string().min(5, "Name must be at least 5 letters."),
    email: z.string().email("A valid email is required."),
    phoneNumber: z.string().regex(/^\d+$/, "Phone number must contain only digits").min(10, "Phone number must be at least 10 digits"),
    password: z.string().min(8, "Password must be at least 8 characters long").regex(/[A-Z]/, "Password must contain at least one uppercase letter").regex(/[0-9]/, "Password must contain at least one number").regex(/[@$!%*?&]/, "Password must contain at least one special character"),
});

export const updationSchema=z.object({
    name: z.string().min(5, "Name must be at least 5 letters."),
    email: z.string().email("A valid email is required."),
    phoneNumber: z.string().regex(/^\d+$/, "Phone number must contain only digits").min(10, "Phone number must be at least 10 digits")
})