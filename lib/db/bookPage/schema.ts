import z from "zod";
import { BookLevelSchema } from "../bookLevel/schema";

const Schema = z.object({
  id: z.coerce.number().int().positive(),
  chapterId: z.coerce.number().int().positive(),
  title: z.string().trim().min(1).max(255),
  tag: z.string().trim().min(1).max(255),
  desc: z.string().trim().min(1).max(255),
  img: z.string().trim().url().min(1),
  type: z.array(z.string()).min(1),
  number: z.coerce.number().int(),
  isDeleted: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const BookPageSchema = Schema.pick({
  id: true,
  title: true,
  tag: true,
  desc: true,
  img: true,
  number: true,
});

export type BookPage = z.infer<typeof BookPageSchema>;

export const BookPageWithLevelsSchema = BookPageSchema.extend({
  levels: z.array(BookLevelSchema),
});

export type BookPageWithLevels = z.infer<typeof BookPageWithLevelsSchema>;
