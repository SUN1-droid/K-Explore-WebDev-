import type { EventItem } from "@/lib/events";

export type CategoryFilter = "All" | EventItem["category"];

export function formatPrice(price: number): string {
  if (price === 0) return "Free";
  return `$${price}`;
}

export function formatDate(date: string): string {
  const d = new Date(date + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatShortDate(date: string): string {
  const d = new Date(date + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
