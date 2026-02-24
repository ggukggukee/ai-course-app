"use server";

import { createHash } from "crypto";
import { StateSchema } from "./schema";

export async function checkOrder({ orderId }: { orderId: string }) {
  const terminalKey = process.env.TBANK_TERMINAL_KEY;
  const terminalPassword = process.env.TBANK_TERMINAL_PASSWORD;

  if (!terminalKey || !terminalPassword) {
    return { message: "Неверные ключи терминала" };
  }

  const url = "https://securepay.tinkoff.ru/v2/CheckOrder";

  try {
    const tokenObject = {
      OrderId: orderId,
      Password: terminalPassword,
      TerminalKey: terminalKey,
    };

    const values = Object.values(tokenObject).join("");
    const token = createHash("sha256").update(values).digest("hex");

    const body = {
      TerminalKey: terminalKey,
      OrderId: orderId,
      Token: token,
    };

    const validatedBody = StateSchema.safeParse(body);

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
      // console.log(errorData);
      throw new Error("Ошибка при инициализации платежа");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      return { message: error.message };
    }

    return { message: "Ошибка при создании платежа" };
  }
}
