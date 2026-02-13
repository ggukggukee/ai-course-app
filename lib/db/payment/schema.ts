import z from "zod";

const Schema = z.object({
  id: z.coerce.number().int().positive(),
  orderId: z.coerce.number().int().positive(),
  amount: z.coerce.number().int().positive(),
  currency: z.string(),
  status: z.string(),
  paymentId: z.string(),
  paymentUrl: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const PaymentSchema = Schema.pick({
  id: true,
  amount: true,
  currency: true,
  status: true,
  paymentId: true,
  paymentUrl: true,
});

export type Payment = z.infer<typeof PaymentSchema>;
