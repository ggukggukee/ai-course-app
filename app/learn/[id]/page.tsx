import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { PageWrapper } from "@/components/design/page-wrapper";
import { Heading } from "@/components/design/typography";
import { getBookPage } from "@/lib/db/bookPage/data";
import { BlockEditor } from "@/components/tiptap/components/BlockEditor";
import { LevelButtons } from "@/components/learn/level-buttons";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const { user } = session;
  const { id } = await params;

  if (isNaN(Number(id))) {
    redirect("/learn");
  }

  const bookPage = await getBookPage({ id: Number(id), userId: user.id });

  if (!bookPage) {
    return {
      title: "Обучение",
      description: "Обучение по курсу",
    };
  }

  return {
    title: bookPage.title,
    description: bookPage.desc,
  };
};

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const { user } = session;
  const { id } = await params;

  if (isNaN(Number(id))) {
    redirect("/learn");
  }

  const bookPage = await getBookPage({ id: Number(id), userId: user.id });

  if (!bookPage || bookPage.levels.length === 0) {
    notFound();
  }

  const { level } = await searchParams;

  if (!level || Array.isArray(level) || isNaN(Number(level))) {
    redirect(`/learn/${bookPage.id}?level=${bookPage.levels[0].id}`);
  }

  const bookLevel = bookPage.levels.find((bl) => bl.id === Number(level));

  if (!bookLevel) {
    redirect(`/learn/${bookPage.id}?level=${bookPage.levels[0].id}`);
  }

  return (
    <PageWrapper className='max-w-4xl flex flex-col flex-1' noContainer>
      <Heading as='h1' size='h3' weight='bold'>
        Обучение
      </Heading>
      <BlockEditor
        key={`editor-${bookLevel.id}`}
        editable={false}
        content={JSON.parse(bookLevel.content)}
        solid={bookLevel.solid}
      />
      <LevelButtons
        levels={bookPage.levels.map((x) => ({ id: x.id, title: x.title }))}
        currentLevelId={bookLevel.id}
        bookPageId={bookPage.id}
      />
    </PageWrapper>
  );
}
