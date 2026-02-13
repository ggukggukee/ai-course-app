import z from "zod";
import { BookPageSchema } from "../bookPage/schema";

const Schema = z.object({
  id: z.coerce.number().int().positive(),
  title: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const ChapterSchema = Schema.pick({
  id: true,
  title: true,
});

export type BookChapter = z.infer<typeof ChapterSchema>;

export const BookChapterWithPagesSchema = ChapterSchema.extend({
  pages: z.array(BookPageSchema),
});

export type BookChapterWithPages = z.infer<typeof BookChapterWithPagesSchema>;
