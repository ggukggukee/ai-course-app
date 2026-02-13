import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { PageWrapper } from "@/components/design/page-wrapper";
import { Heading, Text } from "@/components/design/typography";
import { getBookChaptersWithPages } from "@/lib/db/bookChapter/data";
import { Chapter } from "@/components/learn/chapter";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Обучение",
  description: "Обучение по курсу",
};

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const { user } = session;

  const bookChapters = await getBookChaptersWithPages({ userId: user.id });

  return (
    <PageWrapper>
      <Heading as='h1' size='h3' weight='bold'>
        Обучение
      </Heading>
      <div className='space-y-6 flex-1 flex flex-col'>
        {bookChapters.map((chapter) => (
          <Chapter key={chapter.id} chapter={chapter} />
        ))}
        {bookChapters.length === 0 && (
          <div className='bg-muted h-96 rounded-xl p-4 flex flex-col flex-1 gap-2 items-center justify-center'>
            <Text size='sm' weight='medium'>
              У вас пока нет доступа к курсу
            </Text>
            <Button asChild>
              <Link href='/orders'>Купить курс</Link>
            </Button>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
