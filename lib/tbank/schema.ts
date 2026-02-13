import z from "zod";

export const InitPaymentSchema = z.object({
  TerminalKey: z.string().min(1).max(20),
  Amount: z
    .number()
    .int()
    .positive()
    .refine((val) => val.toString().length <= 10, {
      message: "Сумма платежа должна быть не более 10 цифр",
    }),
  OrderId: z.string().min(1).max(36),
  Token: z.string().min(1),
  Description: z.string().min(1).max(140),
  DATA: z.object({
    Email: z.email().min(1).max(64),
  }),
  Receipt: z.object({
    Email: z.email().min(1).max(64),
    Taxation: z.enum([
      "osn",
      "usn_income",
      "usn_income_outcome",
      "envd",
      "esn",
      "patent",
    ]),
    Items: z.array(
      z.object({
        Name: z.string().min(1).max(128),
        Price: z.number().int().positive(),
        Quantity: z.number().int().positive(),
        Amount: z
          .number()
          .int()
          .positive()
          .refine((val) => val.toString().length <= 10, {
            message: "Сумма позиции должна быть не более 10 цифр",
          }),
        Tax: z.enum(["none", "vat0", "vat10", "vat20", "vat110", "vat120"]),
      }),
    ),
  }),
});

export const GetQrSchema = z.object({
  TerminalKey: z.string().min(1).max(20),
  PaymentId: z.coerce.number().min(1),
  Token: z.string().min(1),
  DataType: z.enum(["PAYLOAD", "IMAGE"]).optional(),
  BankId: z.string().optional(),
});
