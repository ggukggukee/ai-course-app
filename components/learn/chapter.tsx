'use client';

import { BookChapterWithPages } from "@/lib/db/bookChapter/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Text } from "../design";
import Link from "next/link";

export function Chapter({ chapter }: { chapter: BookChapterWithPages }) {
  return (
    <Card className="flex flex-col w-full p-4 gap-4">
      <CardHeader className="p-0">
        <CardTitle>{chapter.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 gap-1 p-0">
        {chapter.pages.map((page) => (
          <Link key={page.id} href={`/learn/${page.id}`} className="block">
            <Card className="flex flex-row gap-4 p-4 rounded-xl hover:bg-muted">
              <Text size="sm" textColor='muted'>{page.number}</Text>
              <CardHeader className="p-0 space-y-0.5 w-full">
                <CardTitle className="leading-none">{page.title}</CardTitle>
                <CardDescription className="leading-tight">{page.desc}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}