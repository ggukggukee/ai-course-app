import z from "zod";

const Schema = z.object({
  id: z.coerce.number().int().positive(),
  pageId: z.coerce.number().int().positive(),
  title: z.string().trim().min(1).max(255),
  content: z.string().trim().min(1).max(255),
  solid: z.boolean().default(false),
  isDeleted: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const BookLevelSchema = Schema.pick({
  id: true,
  title: true,
  content: true,
  solid: true,
});

export type BookLevel = z.infer<typeof BookLevelSchema>;
