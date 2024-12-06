import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be 6 characters or more"),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;
