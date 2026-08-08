import { studio } from "@/data/content";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="relative py-28 md:py-40 border-t hairline">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid md:grid-cols-[1fr_1.3fr] gap-12 md:gap-20">
        <Reveal>
          <p className="text-xs tracking-[0.3em] uppercase text-ember mb-6">
            About the Studio
          </p>
          <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl leading-[1] sticky top-28">
            A small team can build something much bigger than itself.
          </h2>
        </Reveal>

        <Reveal delay={150} className="space-y-8">
          {studio.story.map((p, i) => (
            <p key={i} className="text-lg md:text-xl text-mist leading-relaxed">
              {p}
            </p>
          ))}

          <div className="grid grid-cols-2 gap-8 pt-8 border-t hairline max-w-md">
            <div>
              <p className="font-display font-extrabold text-4xl text-paper">
                {studio.teamSize}
              </p>
              <p className="text-[11px] tracking-[0.2em] uppercase text-mist mt-2">
                People
              </p>
            </div>
            <div>
              <p className="font-display font-extrabold text-4xl text-paper">
                {studio.founded}
              </p>
              <p className="text-[11px] tracking-[0.2em] uppercase text-mist mt-2">
                Founded
              </p>
            </div>
          </div>

          {studio.location && (
            <p className="text-sm text-mist pt-2">
              Based in {studio.location}.
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
