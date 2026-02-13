"use server";

import prisma from "@/lib/prisma";
import { enrollSchema } from "./schema";
import z from "zod";

export async function createEnroll({
  body,
}: {
  body: z.infer<typeof enrollSchema>;
}) {
  const validate = enrollSchema.safeParse(body);

  if (!validate.success) {
    return { message: "Некорректные данные" };
  }

  try {
    await prisma.enroll.create({
      data: { ...validate.data },
    });

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    }

    return { message: "Ошибка при создании заявки" };
  }
}
