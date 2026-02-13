"use server";

import prisma from "@/lib/prisma";
import { Order } from "./schema";

export async function getOrders({ userId }: { userId: string }) {
  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      select: {
        id: true,
        price: true,
        currency: true,
        status: true,
        item: {
          select: {
            chapter: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
        payments: {
          select: {
            id: true,
            amount: true,
            currency: true,
            status: true,
            paymentId: true,
            paymentUrl: true,
          },
        },
      },
    });

    return orders satisfies Order[];
  } catch (error) {
    console.error(error);
    throw new Error("Ошибка при получении заказов");
  }
}
