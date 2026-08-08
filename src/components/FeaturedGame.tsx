import Image from "next/image";
import { games } from "@/data/content";
import { publicImagePath } from "@/lib/imagePath";
import Reveal from "./Reveal";

export default function FeaturedGame() {
  const game = games.find((g) => g.featured) ?? games[0];
  if (!game) return null;

  const keyArt = publicImagePath(game.featuredImage ?? game.coverImage);

  return (
    <section className="relative py-28 md:py-40 border-t hairline">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <Reveal className="order-2 md:order-1">
          <p className="text-xs tracking-[0.3em] uppercase text-ember mb-6">
            Our First Game
          </p>
          <h2 className="font-display font-extrabold uppercase text-4xl md:text-6xl leading-[0.95] mb-6">
            {game.title}
          </h2>
          <p className="text-mist text-base md:text-lg leading-relaxed mb-10 max-w-md">
            {game.description}
          </p>

          <dl className="grid grid-cols-3 gap-6 mb-10 max-w-md border-t hairline pt-6">
            <div>
              <dt className="text-[10px] tracking-[0.2em] uppercase text-mist mb-1">
                Genre
              </dt>
              <dd className="text-sm text-paper">{game.genre}</dd>
            </div>
            <div>
              <dt className="text-[10px] tracking-[0.2em] uppercase text-mist mb-1">
                Status
              </dt>
              <dd className="text-sm text-paper">{game.status}</dd>
            </div>
            <div>
              <dt className="text-[10px] tracking-[0.2em] uppercase text-mist mb-1">
                Platform
              </dt>
              <dd className="text-sm text-paper">{game.platform}</dd>
            </div>
          </dl>

          <div className="flex flex-wrap gap-4">
            <a
              href={game.learnMoreUrl || "#"}
              className="px-7 py-3.5 bg-paper text-ink text-xs tracking-[0.2em] uppercase font-semibold hover:bg-ember transition-colors duration-300"
            >
              Learn More
            </a>
            <a
              href={game.wishlistUrl || "#"}
              className="px-7 py-3.5 border hairline text-paper text-xs tracking-[0.2em] uppercase font-semibold hover:border-ember hover:text-ember transition-colors duration-300"
            >
              Wishlist
            </a>
          </div>
        </Reveal>

        <Reveal delay={150} className="order-1 md:order-2">
          <div className="relative w-full">
            <Image
              src={keyArt}
              alt={`${game.title} key art`}
              width={0}
              height={0}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="w-full h-auto"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
