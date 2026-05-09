import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name too long"),

  email: z.string().trim().toLowerCase()
    .email("Invalid email"),

  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .max(64, "Password too long")
    .superRefine((val, ctx) => {
      if (!/[A-Z]/.test(val)) {
        ctx.addIssue({ message: "One uppercase letter required" });
      }
      if (!/[a-z]/.test(val)) {
        ctx.addIssue({ message: "One lowercase letter required" });
      }
      if (!/[0-9]/.test(val)) {
        ctx.addIssue({ message: "One number required" });
      }
      if (!/[^A-Za-z0-9]/.test(val)) {
        ctx.addIssue({ message: "One symbol required" });
      }
    }),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase()
    .email("Invalid email"),
  password: z.string()
});

export const emailSchema = z.object({
     email: z.string().trim().toLowerCase()
    .email("Invalid email"),
})

export const passwordSchema = z.object({
    password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .max(64, "Password too long")
    .superRefine((val, ctx) => {
      if (!/[A-Z]/.test(val)) {
        ctx.addIssue({ message: "One uppercase letter required" });
      }
      if (!/[a-z]/.test(val)) {
        ctx.addIssue({ message: "One lowercase letter required" });
      }
      if (!/[0-9]/.test(val)) {
        ctx.addIssue({ message: "One number required" });
      }
      if (!/[^A-Za-z0-9]/.test(val)) {
        ctx.addIssue({ message: "One symbol required" });
      }
    }),
})

export const todoSchema = z.object({
    taskId: z.string().optional(), // For update operations
    title: z.string().trim().min(3, "Title must be at least 3 characters long").max(100, "Title too long"),
    description: z.string().trim().min(5, "Description must be at least 5 characters long").max(500, "Description too long"),
});