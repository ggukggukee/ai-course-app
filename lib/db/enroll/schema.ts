import z from "zod";

export const enrollSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Имя должно содержать хотя бы 2 символа" }),
  phone: z.string().min(10, { message: "Введите корректный номер телефона" }),
});

export const Schema = z.object({
  id: z.coerce.number().int().positive(),
  name: z.string().nullable(),
  phone: z.string().nullable(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
});

export type Enroll = z.infer<typeof Schema>;
