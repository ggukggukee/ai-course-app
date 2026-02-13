"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getQr } from "@/lib/tbank/qr";
import { headers } from "next/headers";

export async function payPayment({
  id,
}: {
  id: number;
}): Promise<{ url: string } | { message: string }> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { message: "Необходимо авторизоваться для оплаты платежа" };
  }

  const { user } = session;

  if (!user.email) {
    return { message: "Необходимо авторизоваться для оплаты платежа" };
  }

  try {
    const payment = await prisma.payment.findUnique({
      where: { id },
      select: { id: true, paymentId: true, status: true },
    });

    if (!payment) {
      throw new Error("Платеж не найден");
    }

    if (payment.status === "paid") {
      throw new Error("Платеж уже оплачен");
    }

    const qr = await getQr({ paymentId: Number(payment.paymentId) });

    if ("message" in qr) {
      throw new Error(qr.message);
    }

    await prisma.payment.update({
      where: { id },
      data: { status: "pending", paymentUrl: qr.Data },
    });

    return { url: qr.Data };
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      return { message: error.message };
    }

    return { message: "Ошибка при оплате платежа" };
  }
}
