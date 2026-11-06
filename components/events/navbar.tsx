"use client";

import { useEffect, useState } from "react";
import { Menu, X, CalendarHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Events", href: "#events" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

type NavbarProps = {
  onRegisterClick: () => void;
};

export function Navbar({ onRegisterClick }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-background/80 ring-1 ring-border backdrop-blur-md shadow-sm"
          : "bg-transparent",
      )}
    >
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <button
          type="button"
          onClick={() => handleNav("#home")}
          className="flex items-center gap-2 font-semibold"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-sm">
            <CalendarHeart className="size-5" />
          </span>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Eventory
          </span>
        </button>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                type="button"
                onClick={() => handleNav(link.href)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button
            size="lg"
            className="h-10 rounded-xl px-5 text-sm shadow-sm"
            onClick={onRegisterClick}
          >
            Register
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="grid size-10 place-items-center rounded-lg text-foreground transition-colors hover:bg-muted md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-border bg-background/95 backdrop-blur-md transition-all duration-300 md:hidden",
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <ul className="container mx-auto flex flex-col gap-1 px-4 py-3">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                type="button"
                onClick={() => handleNav(link.href)}
                className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                {link.label}
              </button>
            </li>
          ))}
          <li className="pt-2">
            <Button
              className="h-10 w-full rounded-xl px-5 text-sm"
              onClick={() => {
                setOpen(false);
                onRegisterClick();
              }}
            >
              Register
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
}
