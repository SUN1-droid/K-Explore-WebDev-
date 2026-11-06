"use client";

import { useReveal, useCountUp } from "@/hooks/use-reveal";

type Stat = {
  value: number;
  suffix: string;
  label: string;
  emoji: string;
};

const STATS: Stat[] = [
  { value: 500, suffix: "+", label: "Events Hosted", emoji: "🎪" },
  { value: 50, suffix: "k+", label: "Participants", emoji: "👥" },
  { value: 100, suffix: "+", label: "Cities", emoji: "🌍" },
  { value: 250, suffix: "+", label: "Organizers", emoji: "🤝" },
];

export function AboutSection() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="bg-muted/30 py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className="mx-auto max-w-3xl text-center"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)", transition: "opacity .6s ease, transform .6s ease" }}
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            About Eventory
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            One platform for every event you love
          </h2>
          <p className="mt-4 text-muted-foreground">
            Eventory connects organizers and attendees across the globe.
            Browse curated events, explore full lineups, and register in
            seconds — all in one beautifully simple place. We've helped
            hundreds of thousands of people find their next great experience.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} active={visible} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  stat,
  active,
  delay,
}: {
  stat: Stat;
  active: boolean;
  delay: number;
}) {
  const count = useCountUp(stat.value, active);
  return (
    <div
      className="reveal rounded-2xl border border-border bg-card p-5 text-center shadow-sm transition-all duration-700"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "none" : "translateY(24px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <span className="text-3xl">{stat.emoji}</span>
      <p className="mt-2 text-3xl font-extrabold text-foreground sm:text-4xl">
        {count}
        <span className="text-primary">{stat.suffix}</span>
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
    </div>
  );
}
