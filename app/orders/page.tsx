import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { PageWrapper } from "@/components/design/page-wrapper";
import { Heading } from "@/components/design/typography";
import { getOrders } from "@/lib/db/order/data";
import { getItems } from "@/lib/db/item/data";
import { Item } from "@/components/orders/item";
import { Order } from "@/components/orders/order";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Заказы",
  description: "Заказы покупок",
};

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const { user } = session;

  const [orders, items] = await Promise.all([getOrders({ userId: user.id }), getItems({ status: "active", userId: user.id })]);

  return (
    <PageWrapper>
      <Heading as="h1" size="h3" weight="bold">Заказы</Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order) => (
          <Order key={order.id} order={order} />
        ))}
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </div>
    </PageWrapper>
  );
}
