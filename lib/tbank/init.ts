"use server";

import { createHash, randomUUID } from "crypto";
import { InitPaymentSchema } from "./schema";
import { InitPaymentResponse } from "./types";

export async function initPayment({
  email,
  amount,
  description,
}: {
  email: string;
  amount: number;
  description: string;
}) {
  const terminalKey = process.env.TBANK_TERMINAL_KEY;
  const terminalPassword = process.env.TBANK_TERMINAL_PASSWORD;

  if (!terminalKey || !terminalPassword) {
    return { message: "Неверные ключи терминала" };
  }

  const url = "https://securepay.tinkoff.ru/v2/Init";

  try {
    const orderId = randomUUID();

    const tokenObject = {
      Amount: amount * 100,
      Description: description,
      OrderId: orderId,
      Password: terminalPassword,
      TerminalKey: terminalKey,
    };

    const values = Object.values(tokenObject).join("");
    const token = createHash("sha256").update(values).digest("hex");

    const body = {
      TerminalKey: terminalKey,
      Amount: amount * 100,
      OrderId: orderId,
      Description: description,
      Token: token,
      DATA: { Email: email },
      Receipt: {
        Email: email,
        Taxation: "usn_income",
        Items: [
          {
            Name: description,
            Price: amount * 100,
            Quantity: 1,
            Amount: amount * 100,
            Tax: "none",
          },
        ],
      },
    };

    const validatedBody = InitPaymentSchema.safeParse(body);

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

    const data: InitPaymentResponse = await response.json();

    if (!data.Success) {
      console.log(data);
      throw new Error(data.Message || "Ошибка при инициализации платежа");
    }

    return data;
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      return { message: error.message };
    }

    return { message: "Ошибка при создании платежа" };
  }
}

// const formatWithOffset = (date: Date) => {
//   const pad = (num: number) => num.toString().padStart(2, "0");

//   const yyyy = date.getFullYear();
//   const mm = pad(date.getMonth() + 1);
//   const dd = pad(date.getDate());
//   const hh = pad(date.getHours());
//   const min = pad(date.getMinutes());
//   const ss = pad(date.getSeconds());

//   const offsetMinutes = date.getTimezoneOffset();
//   const offsetSign = offsetMinutes <= 0 ? "+" : "-";
//   const absOffset = Math.abs(offsetMinutes);
//   const offsetHours = pad(Math.floor(absOffset / 60));
//   const offsetMins = pad(absOffset % 60);

//   return `${yyyy}-${mm}-${dd}T${hh}:${min}:${ss}${offsetSign}${offsetHours}:${offsetMins}`;
// };
