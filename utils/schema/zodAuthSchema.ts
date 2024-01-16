import { ZodType, z } from "zod";

export const zodLoginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required!",
    })
    .email(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(5, "Password must be greater then 5 characters"),
});
