import Image from "next/image";
import { team } from "@/data/content";
import { publicImagePath } from "@/lib/imagePath";
import ArtPlaceholder from "./ArtPlaceholder";
import Reveal from "./Reveal";

export default function Team() {
  return (
    <section id="team" className="relative py-28 md:py-40 border-t hairline">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <Reveal className="mb-16 md:mb-20">
          <p className="text-xs tracking-[0.3em] uppercase text-ember mb-6">
            The Team
          </p>
          <h2 className="font-display font-extrabold uppercase text-4xl md:text-6xl leading-[0.95]">
            {team.length} Genralz. <br className="hidden md:block" />
            One obsession.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-12">
          {team.map((person, i) => (
            <Reveal key={person.name} delay={i * 120}>
              <div className="relative aspect-square mb-6 overflow-hidden">
                {person.photo ? (
                  <Image
                    src={publicImagePath(person.photo)}
                    alt={person.name}
                    fill
                    sizes="(min-width: 640px) 320px, 90vw"
                    className="object-cover transition-all duration-500"
                  />
                ) : (
                  <ArtPlaceholder
                    label={`[${person.name} — photo]`}
                    className="w-full h-full transition-all duration-500"
                  />
                )}
              </div>
              <h3 className="font-display font-bold uppercase text-xl mb-1">
                {person.name}
              </h3>
              <p className="text-xs tracking-[0.15em] uppercase text-ember mb-4">
                {person.role}
              </p>
              <p className="text-sm text-mist leading-relaxed mb-4">
                {person.bio}
              </p>
              {person.socials && person.socials.length > 0 && (
                <div className="flex gap-4">
                  {person.socials.map((s) => (
                    <a
                      key={s.url}
                      href={s.url}
                      className="text-[11px] tracking-[0.15em] uppercase text-mist hover:text-paper transition-colors"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}