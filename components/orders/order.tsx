'use client'

import type { Order } from "@/lib/db/order/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Text } from "../design";
import { formatCurrency, getStatusLabel } from "@/lib/utils";
import { Button } from "../ui/button";
import { useMemo, useState } from "react";
import Link from "next/link";
import { payPayment } from "@/lib/db/payment/actions";
import { Loader2 } from "lucide-react";

export function Order({ order }: { order: Order }) {
  const payments = useMemo(() => order.payments.filter(p => p.status === "pending"), [order.payments]);

  return (
    <Card className="gap-3">
      <CardHeader className="gap-0">
        <CardTitle>{order.item.chapter.title}</CardTitle>
        <CardDescription>Заказ №{order.id}{' · '}{getStatusLabel(order.status)}</CardDescription>
      </CardHeader>
      <CardContent>
        <Text size='lg' weight='bold'>{formatCurrency(order.price, order.currency)}</Text>
      </CardContent>
      <CardContent>
        {order.status === 'pending' && payments.map((payment) => (
          <Payment key={payment.id} payment={payment} />
        ))}
        {order.status === 'paid' && <Button className="cursor-pointer" asChild>
          <Link href='/learn'>Перейти к курсу</Link></Button>}
      </CardContent>
    </Card>
  )
}

function Payment({ payment }: { payment: Order['payments'][number] }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const action = await payPayment({ id: payment.id });

      if ("message" in action) {
        setError(action.message);
      } else {
        window.location.href = action.url;
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Произошла ошибка");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-1">
      <Button className="cursor-pointer" onClick={() => handlePayment()} disabled={isLoading}>
        {isLoading && <Loader2 className="size-4 animate-spin" />}
        {isLoading ? "Загрузка..." : "Оплатить"}</Button>
      {error && <Text size='sm' className="text-red-500">{error}</Text>}
    </div>
  )
}