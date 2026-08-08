"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { nav, studio } from "@/data/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-ink/90 backdrop-blur-md border-b hairline" : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-10 h-24">
        <a href="#top" className="flex items-center gap-3.5 shrink-0">
          <span className="relative h-11 w-11 md:h-12 md:w-12 overflow-hidden rounded-sm border hairline shrink-0">
            <Image
              src="/images/logos/penumbra-mark.png"
              alt=""
              fill
              className="object-cover"
              priority
            />
          </span>
          <span className="font-display font-extrabold tracking-[0.16em] text-[13px] md:text-base uppercase text-paper leading-none whitespace-nowrap">
            {studio.name}
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-10">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-xs tracking-[0.2em] uppercase text-mist hover:text-paper transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-ember transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col justify-center items-end gap-[6px] w-8 h-8"
        >
          <span
            className={`h-px bg-paper transition-all duration-300 ${
              open ? "w-6 translate-y-[3.5px] rotate-45" : "w-6"
            }`}
          />
          <span
            className={`h-px bg-paper transition-all duration-300 ${
              open ? "w-6 -translate-y-[3.5px] -rotate-45" : "w-4"
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-out bg-ink border-b hairline ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-6 gap-6">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm tracking-[0.2em] uppercase text-paper"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
