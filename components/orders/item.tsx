'use client'

import type { Item } from "@/lib/db/item/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { buyItem } from "@/lib/db/order/actions";
import { useState } from "react";
import { Text } from "../design";
import { Loader2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export function Item({ item }: { item: Item }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBuyItem = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const action = await buyItem({ itemId: item.id });

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
    <Card className="gap-3 bg-secondary ring-0">
      <CardHeader className="gap-0">
        <CardTitle>{item.chapter.title}</CardTitle>
        <CardDescription>Товар №{item.id}</CardDescription>
      </CardHeader>
      <CardContent>
        <Text size='lg' weight='bold'>{formatCurrency(item.price, item.currency)}</Text>
      </CardContent>
      <CardContent className="space-y-1">
        <Button onClick={() => handleBuyItem()} disabled={isLoading} className="cursor-pointer">
          {isLoading && <Loader2 className="size-4 animate-spin" />}
          {isLoading ? "Загрузка..." : "Купить"}</Button>
        {error && <Text size='sm' className="text-red-500">{error}</Text>}
      </CardContent>
    </Card>
  )
}