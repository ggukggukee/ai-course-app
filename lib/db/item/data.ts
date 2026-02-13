"use server";

import prisma from "@/lib/prisma";
import { Item } from "./schema";

export async function getItems({
  status,
  userId,
}: {
  status?: string;
  userId: string;
}) {
  try {
    const items = await prisma.item.findMany({
      where: {
        status,
        orders: {
          some: {
            userId,
            status: { not: "paid" },
          },
        },
      },
      select: {
        id: true,
        price: true,
        currency: true,
        status: true,
        chapter: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return items satisfies Item[];
  } catch (error) {
    console.error(error);
    throw new Error("Ошибка при получении товаров");
  }
}
