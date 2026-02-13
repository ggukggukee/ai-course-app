"use server";

import prisma from "@/lib/prisma";
import { Enroll } from "./schema";

export async function getEnrolls() {
  try {
    const enrolls = await prisma.enroll.findMany({
      select: {
        id: true,
        name: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return enrolls satisfies Enroll[];
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }

    throw new Error("Ошибка при получении заявок");
  }
}
