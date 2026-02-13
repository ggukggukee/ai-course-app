"use server";

import { createHash } from "crypto";
import { GetQrSchema } from "./schema";
import { GetQrResponse } from "./types";

export async function getQr({ paymentId }: { paymentId: number }) {
  const terminalKey = process.env.TBANK_TERMINAL_KEY;
  const terminalPassword = process.env.TBANK_TERMINAL_PASSWORD;

  if (!terminalKey || !terminalPassword) {
    return { message: "Неверные ключи терминала" };
  }

  const url = "https://securepay.tinkoff.ru/v2/GetQr";

  try {
    const tokenObject = {
      Password: terminalPassword,
      PaymentId: paymentId,
      TerminalKey: terminalKey,
    };

    const values = Object.values(tokenObject).join("");
    const token = createHash("sha256").update(values).digest("hex");

    const body = {
      TerminalKey: terminalKey,
      Token: token,
      PaymentId: paymentId,
    };

    const validatedBody = GetQrSchema.safeParse(body);

    if (!validatedBody.success) {
      throw new Error("Некорректные данные");
    }

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validatedBody.data),
    });

    if (!response.ok) {
      // const contentType = response.headers.get("content-type");
      // let errorData;

      // if (contentType && contentType.includes("application/json")) {
      //   errorData = await response.json();
      // } else {
      //   errorData = await response.text();
      // }

      throw new Error("Ошибка при получении QR-кода");
    }

    const data: GetQrResponse = await response.json();

    if (!data.Success) {
      throw new Error("Ошибка при получении QR-кода");
    }

    return data;
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      return { message: error.message };
    }

    return { message: "Ошибка при получении QR-кода" };
  }
}
