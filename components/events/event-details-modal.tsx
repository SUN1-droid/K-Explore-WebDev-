"use client";

import {
  CalendarDays,
  Clock,
  MapPin,
  User,
  Tag,
  Check,
  Ticket,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { EventItem } from "@/lib/events";
import { formatDate, formatPrice } from "@/lib/event-utils";

type EventDetailsModalProps = {
  event: EventItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRegister: (event: EventItem) => void;
};

export function EventDetailsModal({
  event,
  open,
  onOpenChange,
  onRegister,
}: EventDetailsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto p-0 sm:max-w-2xl"
        showCloseButton
      >
        {event && (
          <div>
            {/* Banner */}
            <div
              className="relative h-44 w-full overflow-hidden rounded-t-xl sm:h-56"
              style={{ background: event.gradient }}
            >
              <span className="absolute inset-0 grid place-items-center text-6xl sm:text-7xl">
                {event.emoji}
              </span>
              <Badge className="absolute left-4 top-4 bg-white/90 text-foreground shadow-sm">
                {event.category}
              </Badge>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              <div>
                <DialogTitle className="text-xl font-bold text-foreground sm:text-2xl">
                  {event.name}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Event details for {event.name}
                </DialogDescription>
              </div>

              {/* Quick facts */}
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <FactRow icon={<CalendarDays className="size-4" />} label="Date" value={formatDate(event.date)} />
                <FactRow icon={<Clock className="size-4" />} label="Time" value={event.time} />
                <FactRow icon={<MapPin className="size-4" />} label="Venue" value={`${event.venue}, ${event.city}`} />
                <FactRow icon={<User className="size-4" />} label="Organizer" value={event.organizer} />
              </div>

              {/* Description */}
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  About this event
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-foreground">
                  {event.fullDescription}
                </p>
              </div>

              {/* Highlights */}
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Schedule & highlights
                </h4>
                <ul className="mt-2 space-y-2">
                  {event.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-foreground"
                    >
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                        <Check className="size-3" />
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price + CTA */}
              <div className="flex flex-col items-center justify-between gap-3 rounded-2xl bg-muted/50 p-4 ring-1 ring-border sm:flex-row">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Tag className="size-5" />
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground">Ticket price</p>
                    <p className="text-xl font-bold text-foreground">
                      {formatPrice(event.price)}
                    </p>
                  </div>
                </div>
                <Button
                  size="lg"
                  className="h-11 w-full rounded-xl px-6 text-sm font-semibold sm:w-auto"
                  onClick={() => onRegister(event)}
                >
                  <Ticket className="mr-1 size-4" />
                  Register Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function FactRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5 rounded-xl border border-border bg-card px-3 py-2.5">
      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  );
}
