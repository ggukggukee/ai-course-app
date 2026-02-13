"use server";

import prisma from "@/lib/prisma";
import { BookPageWithLevels } from "./schema";

export async function getBookPage({
  id,
  userId,
}: {
  id: number;
  userId: string;
}) {
  try {
    const bookPage = await prisma.bookPage.findFirst({
      where: {
        id,
        isDeleted: false,
        chapter: {
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
      },
      select: {
        id: true,
        title: true,
        tag: true,
        desc: true,
        img: true,
        number: true,
        levels: {
          select: {
            id: true,
            title: true,
            content: true,
            solid: true,
          },
        },
      },
    });

    if (!bookPage) {
      return null;
    }

    return bookPage satisfies BookPageWithLevels;
  } catch (error) {
    console.error(error);
    throw new Error("Ошибка при получении страницы книги");
  }
}
