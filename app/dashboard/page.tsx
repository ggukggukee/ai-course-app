import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { PageWrapper } from "@/components/design/page-wrapper";
import { Heading } from "@/components/design/typography";
import { Book, ShoppingCart } from "lucide-react";
import { LinkCard } from "@/components/dashboard/link-card";
import { Metadata } from "next";

const LINKS = [
  {
    href: "/learn",
    title: "Обучение",
    description: "Узнайте больше о нашем курсе",
    icon: <Book className="size-6 text-muted-foreground" />,
  },
  {
    href: "/orders",
    title: "Заказы",
    description: "Просмотрите ваши заказы",
    icon: <ShoppingCart className="size-6 text-muted-foreground" />,
  },
]

export const metadata: Metadata = {
  title: "Главная",
  description: "Главная страница",
};

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <PageWrapper>
      <Heading as="h1" size="h3" weight="bold">Главная</Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {LINKS.map((link) => (
          <LinkCard key={link.href} href={link.href} title={link.title} description={link.description} icon={link.icon} />
        ))}
      </div>
    </PageWrapper>
  );
}
