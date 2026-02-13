"use server";

import prisma from "@/lib/prisma";
import { BookChapterWithPages } from "./schema";

export async function getBookChaptersWithPages({ userId }: { userId: string }) {
  try {
    const bookChapters = await prisma.bookChapter.findMany({
      where: {
        isDeleted: false,
        items: {
          some: {
            orders: {
              some: {
                userId,
                status: "paid",
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        pages: {
          where: {
            isDeleted: false,
          },
          select: {
            id: true,
            title: true,
            tag: true,
            desc: true,
            img: true,
            number: true,
          },
        },
      },
    });

    return bookChapters satisfies BookChapterWithPages[];
  } catch (error) {
    console.error(error);
    throw new Error("Ошибка при получении глав книги");
  }
}
