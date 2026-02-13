import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      Status: string;
      PaymentId: string;
    };
    console.log(body);
    if (body.Status === "CONFIRMED") {
      const payment = await prisma.payment.findFirst({
        where: { paymentId: body.PaymentId },
        select: { id: true, orderId: true },
      });

      if (!payment) {
        return Response.json({ message: "Платеж не найден" }, { status: 404 });
      }

      await prisma.$transaction(async (tx) => {
        await tx.payment.update({
          where: { id: payment.id },
          data: { status: "paid" },
        });
        await tx.order.update({
          where: { id: payment.orderId },
          data: { status: "paid" },
        });
      });

      return new NextResponse("OK", {
        status: 200,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    return new NextResponse("OK", {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Ошибка при выполнении webhook" },
      { status: 500 },
    );
  }
}
