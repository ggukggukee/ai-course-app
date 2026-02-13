import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    currency,
  }).format(amount);
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "short",
  }).format(date);
}

export function getStatusLabel(status: string) {
  switch (status) {
    case "pending":
      return "Ожидает оплаты";
    case "paid":
      return "Оплачен";
    case "failed":
      return "Неудачный";
  }
}
