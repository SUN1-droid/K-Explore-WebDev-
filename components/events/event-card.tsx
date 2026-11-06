"use client";

import { CalendarDays, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { EventItem } from "@/lib/events";
import { formatShortDate } from "@/lib/event-utils";

type EventCardProps = {
  event: EventItem;
  onViewDetails: (event: EventItem) => void;
};

export function EventCard({ event, onViewDetails }: EventCardProps) {
  return (
    <Card className="group/event-card relative h-full gap-0 overflow-hidden py-0 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:ring-primary/20">
      {/* Image / gradient banner */}
      <div
        className="relative h-40 w-full overflow-hidden"
        style={{ background: event.gradient }}
      >
        <span className="absolute inset-0 grid place-items-center text-5xl transition-transform duration-300 group-hover/event-card:scale-110">
          {event.emoji}
        </span>
        <Badge className="absolute left-3 top-3 bg-white/90 text-foreground shadow-sm">
          {event.category}
        </Badge>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="text-base font-semibold leading-snug text-foreground">
            {event.name}
          </h3>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="size-3.5" />
              {formatShortDate(event.date)}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" />
              {event.city}
            </span>
          </div>
        </div>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {event.shortDescription}
        </p>

        <div className="mt-auto flex items-center justify-between pt-1">
          <span className="text-sm font-semibold text-foreground">
            {event.price === 0 ? "Free" : `$${event.price}`}
          </span>
          <Button
            size="sm"
            variant="outline"
            className="h-8 rounded-lg px-3"
            onClick={() => onViewDetails(event)}
          >
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
}
