import Image from "next/image";
import { gallery } from "@/data/content";
import { publicImagePath } from "@/lib/imagePath";
import Reveal from "./Reveal";

export default function Gallery() {
  return (
    <section className="relative py-28 md:py-40 border-t hairline">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <Reveal className="mb-16 md:mb-20 grid md:grid-cols-2 gap-8 md:gap-16">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-ember mb-6">
              Behind the Scenes
            </p>
            <h2 className="font-display font-extrabold uppercase text-4xl md:text-6xl leading-[0.95]">
              Development Diary
            </h2>
          </div>
          <p className="text-mist text-sm md:text-base leading-relaxed self-end">
            Right now, we sustain the studio by producing art and technical
            work for larger companies while we search for funding to bring
            our own ideas to life. Every contract keeps the lights on and
            gets us one step closer to building the games we actually want
            to make.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {gallery.map((item, i) => (
            <Reveal
              key={i}
              delay={i * 80}
              className={i % 5 === 0 ? "col-span-2 row-span-2" : ""}
            >
              <div className="relative aspect-square overflow-hidden group">
                <Image
                  src={publicImagePath(item.image)}
                  alt={item.caption}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-ink/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-[11px] tracking-[0.1em] uppercase text-paper">
                    {item.caption}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
