import z from "zod";
import { PaymentSchema } from "../payment/schema";

const Schema = z.object({
  id: z.coerce.number().int().positive(),
  userId: z.string(),
  itemId: z.coerce.number().int().positive(),
  price: z.coerce.number().int().positive(),
  currency: z.string(),
  status: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const OrderSchema = Schema.pick({
  id: true,
  price: true,
  currency: true,
  status: true,
}).extend({
  item: z.object({
    chapter: z.object({
      id: z.coerce.number().int().positive(),
      title: z.string(),
    }),
  }),
  payments: z.array(PaymentSchema),
});

export type Order = z.infer<typeof OrderSchema>;
