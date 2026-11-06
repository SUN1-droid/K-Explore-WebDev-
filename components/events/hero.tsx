"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type HeroProps = {
  onExploreClick: () => void;
};

const FLOATERS = [
  { className: "left-[8%] top-[22%] size-16", delay: "0s", emoji: "🎟️" },
  { className: "right-[12%] top-[18%] size-14", delay: "1.2s", emoji: "🎤" },
  { className: "left-[18%] bottom-[16%] size-20", delay: "0.6s", emoji: "🏆" },
  { className: "right-[8%] bottom-[20%] size-16", delay: "1.8s", emoji: "🎨" },
  { className: "left-[46%] top-[14%] size-12", delay: "0.9s", emoji: "🚀" },
  { className: "right-[40%] bottom-[10%] size-14", delay: "2.1s", emoji: "🎻" },
];

export function Hero({ onExploreClick }: HeroProps) {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 pt-28 pb-20 sm:pt-36 sm:pb-28"
    >
      {/* Animated floating shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {FLOATERS.map((f, i) => (
          <span
            key={i}
            className={`absolute ${f.className} grid place-items-center rounded-2xl bg-white/10 text-2xl ring-1 ring-white/20 backdrop-blur-sm floaty`}
            style={{ animationDelay: f.delay }}
          >
            {f.emoji}
          </span>
        ))}
        {/* soft glow blobs */}
        <span className="absolute -left-20 -top-20 size-72 rounded-full bg-fuchsia-400/30 blur-3xl blob" />
        <span
          className="absolute -right-24 bottom-0 size-80 rounded-full bg-indigo-300/30 blur-3xl blob"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="container relative mx-auto px-4 text-center">
        <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white ring-1 ring-white/25 backdrop-blur-sm">
          <Sparkles className="size-4" />
          500+ curated events across 100+ cities
        </div>

        <h1 className="mx-auto max-w-4xl text-balance text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
          Discover, explore & register for events you'll love
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-white/85 sm:text-lg">
          From tech summits and live music to startup bootcamps and marathons —
          Eventory brings the world's best events to one beautiful,
          searchable place.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            onClick={onExploreClick}
            className="h-12 rounded-xl bg-white px-7 text-sm font-semibold text-indigo-700 shadow-lg transition-all hover:bg-white/90 hover:shadow-xl"
          >
            Explore Events
            <ArrowRight className="ml-1 size-4" />
          </Button>
          <a
            href="#about"
            className="inline-flex h-12 items-center rounded-xl border border-white/40 bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            Learn more
          </a>
        </div>

        {/* stat strip */}
        <dl className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-4 text-white">
          {[
            ["500+", "Events"],
            ["50k+", "Participants"],
            ["100+", "Cities"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-2xl bg-white/10 px-3 py-4 ring-1 ring-white/15 backdrop-blur-sm">
              <dt className="sr-only">{label}</dt>
              <dd>
                <span className="block text-2xl font-bold sm:text-3xl">{value}</span>
                <span className="text-xs text-white/80 sm:text-sm">{label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* bottom wave divider */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    </section>
  );
}
