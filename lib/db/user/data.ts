"use server";

import prisma from "@/lib/prisma";

export async function getUserByEmail({ email }: { email: string }) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { email: true, id: true },
    });

    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Ошибка при проверке пользователя");
  }
}
