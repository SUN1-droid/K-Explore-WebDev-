"use client";

import { CalendarHeart, Github, Twitter, Linkedin, Instagram, Mail } from "lucide-react";

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Events", href: "#events" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  { label: "Twitter", href: "#", icon: Twitter },
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "GitHub", href: "#", icon: Github },
];

export function Footer() {
  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      className="border-t border-border bg-foreground text-background"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                <CalendarHeart className="size-5" />
              </span>
              <span className="text-lg font-bold">Eventory</span>
            </div>
            <p className="mt-3 max-w-md text-sm text-background/70">
              Discover, explore and register for the world's best events —
              all in one beautiful, searchable place.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid size-9 place-items-center rounded-lg bg-background/10 text-background/80 transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-background/90">
              Quick Links
            </h3>
            <ul className="mt-3 space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => handleNav(link.href)}
                    className="text-sm text-background/70 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-background/90">
              Get in touch
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-background/70">
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-primary" />
                hello@eventory.app
              </li>
              <li>123 Event Plaza, Suite 400</li>
              <li>San Francisco, CA 94107</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-background/10 pt-6 sm:flex-row">
          <p className="text-xs text-background/60">
            © {new Date().getFullYear()} Eventory. All rights reserved.
          </p>
          <p className="text-xs text-background/60">
            Built with HTML5, CSS3 & JavaScript — powered by Next.js.
          </p>
        </div>
      </div>
    </footer>
  );
}
