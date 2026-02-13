"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { initPayment } from "@/lib/tbank/init";
import { getQr } from "@/lib/tbank/qr";
import { headers } from "next/headers";
import { getUserByEmail } from "../user/data";

export async function buyItem({
  itemId,
  email,
}: {
  itemId: number;
  email?: string;
}): Promise<{ url: string } | { message: string }> {
  let customer: { email: string; id: string } | null = null;

  if (!email) {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return { message: "Необходимо авторизоваться для покупки товара" };
    }

    const { user } = session;

    if (!user.email) {
      return { message: "Необходимо авторизоваться для покупки товара" };
    }

    customer = { email: user.email, id: user.id };
  }

  try {
    if (email) {
      const user = await getUserByEmail({ email });

      if (!user) {
        return { message: "Пользователь не найден" };
      }

      customer = { email: user.email, id: user.id };
    }

    if (!customer) {
      return { message: "Необходимо авторизоваться для покупки товара" };
    }

    const order = await prisma.order.findFirst({
      where: { itemId, userId: customer.id },
      select: {
        id: true,
        status: true,
        payments: {
          select: {
            paymentUrl: true,
          },
        },
      },
    });

    if (order) {
      if (order.status === "paid") {
        return {
          message: "Товар уже вами куплен. Войдите в аккаунт для просмотра",
        };
      }

      if (
        order.status === "pending" &&
        order.payments.length > 0 &&
        order.payments[0].paymentUrl
      ) {
        return { url: order.payments[0].paymentUrl };
      }

      return {
        message:
          "Вы уже пытались купить этот товар. Пожалуйста, свяжитесь с поддержкой",
      };
    }

    const item = await prisma.item.findUnique({
      where: { id: itemId },
      select: {
        id: true,
        price: true,
        currency: true,
        chapter: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    if (!item) {
      throw new Error("Товар не найден");
    }

    const payment = await initPayment({
      email: customer.email,
      description: `Онлайн-урок "Первые шаги в ИИ"`,
      amount: item.price,
    });

    if ("message" in payment) {
      throw new Error(payment.message);
    }

    const qr = await getQr({ paymentId: Number(payment.PaymentId) });

    if ("message" in qr) {
      throw new Error(qr.message);
    }

    await prisma.order.create({
      data: {
        userId: customer.id,
        itemId: item.id,
        price: item.price,
        currency: item.currency,
        status: "pending",
        payments: {
          create: {
            amount: item.price,
            currency: item.currency,
            status: "pending",
            paymentId: payment.PaymentId,
            paymentUrl: qr.Data,
          },
        },
      },
      include: {
        payments: true,
      },
    });

    return { url: qr.Data };
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      return { message: error.message };
    }

    return { message: "Ошибка при покупке товара" };
  }
}
