"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { studio } from "@/data/content";

export default function Hero() {
  const imgRef = useRef<HTMLDivElement>(null);

  // subtle parallax on the hero art
  useEffect(() => {
    const onScroll = () => {
      if (!imgRef.current) return;
      const y = window.scrollY;
      imgRef.current.style.transform = `scale(1.08) translateY(${y * 0.08}px)`;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="top"
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden flex items-end"
    >
      {/* Background art */}
      <div ref={imgRef} className="absolute inset-0 -z-10 will-change-transform">
        <Image
          src="/images/studio/hero.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Gradient scrim for legibility */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />

      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-10 pb-20 md:pb-28">
        <p
          className="opacity-0 animate-[fadeIn_1s_ease_0.1s_forwards] text-[11px] md:text-xs tracking-[0.3em] uppercase text-mist mb-6"
        >
          {studio.location ? `${studio.location} · Est. ${studio.founded}` : `Independent Studio · Est. ${studio.founded}`}
        </p>

        <h1
          className="opacity-0 animate-[fadeIn_1s_ease_0.3s_forwards] font-display font-black uppercase leading-[0.95] text-[13vw] md:text-[6.2vw] max-w-5xl text-paper"
        >
          {studio.tagline}
        </h1>

        <p
          className="opacity-0 animate-[fadeIn_1s_ease_0.55s_forwards] mt-6 md:mt-8 max-w-md text-sm md:text-base text-mist leading-relaxed"
        >
          {studio.supportingText}
        </p>

        <div
          className="opacity-0 animate-[fadeIn_1s_ease_0.8s_forwards] mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#games"
            className="px-7 py-3.5 bg-paper text-ink text-xs tracking-[0.2em] uppercase font-semibold hover:bg-ember transition-colors duration-300"
          >
            Our Games
          </a>
          <a
            href="#about"
            className="px-7 py-3.5 border hairline text-paper text-xs tracking-[0.2em] uppercase font-semibold hover:border-paper transition-colors duration-300"
          >
            About the Studio
          </a>
        </div>
      </div>

      <div className="absolute right-6 md:right-10 bottom-8 hidden md:flex flex-col items-center gap-3 text-mist">
        <span className="text-[10px] tracking-[0.3em] uppercase [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="w-px h-10 bg-ash relative overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-1/2 bg-ember animate-[scrollLine_2.2s_ease-in-out_infinite]" />
        </span>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
}
