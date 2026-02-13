"use server";

import z from "zod";
import { NewUserSchema } from "./schema";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function registerUser({
  body,
}: {
  body: z.infer<typeof NewUserSchema>;
}): Promise<{ success: boolean } | { message: string }> {
  const validate = NewUserSchema.safeParse(body);

  if (!validate.success) {
    return { message: "Некорректные данные" };
  }

  const { email, password, name } = validate.data;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { message: "Пользователь с таким email уже существует" };
    }

    await auth.api.signUpEmail({
      body: { email, password, name },
    });

    return { success: true };
  } catch (error) {
    console.error(error);

    return { message: "Ошибка при регистрации пользователя" };
  }
}
