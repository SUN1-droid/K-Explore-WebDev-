"use client";

import { useCallback, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Navbar } from "@/components/events/navbar";
import { Hero } from "@/components/events/hero";
import { EventsSection } from "@/components/events/events-section";
import { AboutSection } from "@/components/events/about-section";
import { Footer } from "@/components/events/footer";
import { EventDetailsModal } from "@/components/events/event-details-modal";
import { RegistrationFormModal } from "@/components/events/registration-form-modal";
import type { EventItem } from "@/lib/events";

export default function HomePage() {
  const [detailsEvent, setDetailsEvent] = useState<EventItem | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const [regOpen, setRegOpen] = useState(false);
  const [regEvent, setRegEvent] = useState<EventItem | null>(null);

  const openDetails = useCallback((event: EventItem) => {
    setDetailsEvent(event);
    setDetailsOpen(true);
  }, []);

  const closeDetails = useCallback((open: boolean) => {
    setDetailsOpen(open);
    if (!open) setDetailsEvent(null);
  }, []);

  const openRegistration = useCallback((event: EventItem | null) => {
    setRegEvent(event);
    setRegOpen(true);
  }, []);

  const closeRegistration = useCallback((open: boolean) => {
    setRegOpen(open);
    if (!open) setRegEvent(null);
  }, []);

  const scrollToEvents = useCallback(() => {
    const el = document.querySelector("#events");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleRegisterFromDetails = useCallback(
    (event: EventItem) => {
      setDetailsOpen(false);
      // open the registration modal pre-filled with this event
      setRegEvent(event);
      setRegOpen(true);
    },
    [],
  );

  const handleRegistered = useCallback(() => {
    toast.success("Registration confirmed!", {
      description: "A confirmation email is on its way.",
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onRegisterClick={() => openRegistration(null)} />

      <main>
        <Hero onExploreClick={scrollToEvents} />

        <EventsSection onViewDetails={openDetails} />

        <AboutSection />
      </main>

      <Footer />

      <EventDetailsModal
        event={detailsEvent}
        open={detailsOpen}
        onOpenChange={closeDetails}
        onRegister={handleRegisterFromDetails}
      />

      <RegistrationFormModal
        open={regOpen}
        onOpenChange={closeRegistration}
        selectedEvent={regEvent}
        onSubmitted={handleRegistered}
      />

      <Toaster position="top-center" richColors />
    </div>
  );
}
