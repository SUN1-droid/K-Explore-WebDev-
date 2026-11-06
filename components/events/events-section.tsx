"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { EVENTS, CATEGORIES, type EventItem } from "@/lib/events";
import type { CategoryFilter } from "@/lib/event-utils";
import { EventCard } from "@/components/events/event-card";

type EventsSectionProps = {
  onViewDetails: (event: EventItem) => void;
};

export function EventsSection({ onViewDetails }: EventsSectionProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return EVENTS.filter((e) => {
      const matchesCategory = category === "All" || e.category === category;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        e.name.toLowerCase().includes(q) ||
        e.shortDescription.toLowerCase().includes(q) ||
        e.city.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q)
      );
    });
  }, [query, category]);

  return (
    <section id="events" className="bg-background py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Browse & register
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Upcoming & Featured Events
          </h2>
          <p className="mt-3 text-muted-foreground">
            Search by name, city or category — then tap any event to see the
            full lineup and register in seconds.
          </p>
        </div>

        {/* Search + filters */}
        <div className="mt-8 flex flex-col gap-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search events, cities, categories..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-11 rounded-xl pl-10 text-sm shadow-sm"
              aria-label="Search events"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <SlidersHorizontal className="size-3.5" />
              Filter:
            </span>
            {CATEGORIES.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all",
                    active
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground",
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-dashed border-border bg-muted/30 py-16 text-center">
            <p className="text-3xl">🔍</p>
            <p className="mt-3 font-semibold text-foreground">
              No events match your search
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different keyword or category.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
              className="mt-4 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Showing {filtered.length} of {EVENTS.length} events
        </p>
      </div>
    </section>
  );
}
