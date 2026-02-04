import { z } from "zod";

export const loginSchema = z.object({
    identifier: z.string().min(1, "Username or Email is required"),
    password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    mobileNo: z.string().regex(/^[0-9+]+$/, "Invalid mobile number").min(10, "Mobile number too short"),
    birthDate: z.string().refine((date) => new Date(date) < new Date(), "Birth date must be in the past"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
    termsAccepted: z.boolean().refine((val) => val === true, "You must accept the terms"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
