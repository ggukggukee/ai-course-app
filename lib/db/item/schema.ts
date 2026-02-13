import z from "zod";

const Schema = z.object({
  id: z.coerce.number().int().positive(),
  chapterId: z.coerce.number().int().positive(),
  price: z.coerce.number().int().positive(),
  currency: z.string(),
  status: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const ItemSchema = Schema.pick({
  id: true,
  price: true,
  currency: true,
  status: true,
}).extend({
  chapter: z.object({
    id: z.coerce.number().int().positive(),
    title: z.string(),
  }),
});

export type Item = z.infer<typeof ItemSchema>;
