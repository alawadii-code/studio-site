import Image from "next/image";
import { games } from "@/data/content";
import { publicImagePath } from "@/lib/imagePath";
import Reveal from "./Reveal";

export default function Games() {
  return (
    <section id="games" className="relative py-28 md:py-40 border-t hairline">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <Reveal className="mb-16 md:mb-20 flex items-end justify-between flex-wrap gap-6">
          <h2 className="font-display font-extrabold uppercase text-4xl md:text-6xl leading-[0.95]">
            Our Games
          </h2>
          <p className="text-mist text-sm max-w-xs">
            Every world we build starts here. More is on the way.
          </p>
        </Reveal>

        <div className="flex flex-col">
          {games.map((game, i) => (
            <Reveal key={game.slug} delay={i * 100}>
              <a
                href={game.learnMoreUrl || "#"}
                className="group grid md:grid-cols-[120px_1fr_auto] items-center gap-6 md:gap-10 py-8 md:py-10 border-t hairline last:border-b"
              >
                <span className="font-display text-xs tracking-[0.2em] text-mist">
                  GAME {String(i + 1).padStart(2, "0")}
                </span>

                <div className="grid md:grid-cols-[160px_1fr] items-center gap-6">
                  <div className="relative aspect-square w-full md:w-40">
                    <Image
                      src={publicImagePath(game.coverImage)}
                      alt={game.title}
                      fill
                      sizes="160px"
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-display font-bold uppercase text-2xl md:text-3xl mb-2 group-hover:text-ember transition-colors duration-300">
                      {game.title}
                    </h3>
                    <p className="text-mist text-sm max-w-md">{game.tagline}</p>
                    <p className="text-[11px] tracking-[0.15em] uppercase text-mist mt-3">
                      {game.status} · {game.platform}
                    </p>
                  </div>
                </div>

                <span className="hidden md:inline-block text-xs tracking-[0.2em] uppercase text-mist group-hover:text-paper transition-colors duration-300 whitespace-nowrap">
                  View Game →
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
