import z from "zod";

export const NewUserSchema = z.object({
  email: z.email({ message: "Введите корректный email" }).min(1).max(64),
  password: z
    .string()
    .min(8, { message: "Пароль должен содержать хотя бы 8 символов" })
    .max(64, { message: "Пароль слишком длинный" }),
  name: z
    .string()
    .min(2, { message: "Имя должно содержать хотя бы 2 символа" })
    .max(50, { message: "Имя слишком длинное" }),
});

export const UserFlowSchema = z.discriminatedUnion("step", [
  z.object({
    step: z.literal("email"),
    email: z.email({ message: "Введите корректный email" }).min(1).max(64),
  }),
  z.object({
    step: z.literal("existing"),
    email: z.email(),
  }),
  z.object({
    step: z.literal("register"),
    email: z.email({ message: "Введите корректный email" }).min(1).max(64),
    password: z
      .string()
      .min(8, { message: "Пароль должен содержать хотя бы 8 символов" })
      .max(100, { message: "Пароль слишком длинный" }),
    name: z
      .string()
      .min(2, { message: "Имя должно содержать хотя бы 2 символа" })
      .max(50, { message: "Имя слишком длинное" }),
  }),
]);
