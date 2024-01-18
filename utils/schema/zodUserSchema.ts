import { z } from "zod";

export const zodUserSchema = z.object({
  name: z
    .string({
      required_error: "Name is required!",
    })
    .min(4, "Username must not be less then 5 characters"),
  email: z
    .string({
      required_error: "Email is required!",
    })
    .email("Enter valid Email"),
  password: z
    .string({ required_error: "Password is required!" })
    .min(6, "Password must  be greater then 5 characters"),
});
