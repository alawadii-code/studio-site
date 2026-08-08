import { studio } from "@/data/content";
import Reveal from "./Reveal";

export default function Philosophy() {
  return (
    <section
      id="philosophy"
      className="relative py-32 md:py-52 border-t hairline flex items-center justify-center text-center overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        {studio.philosophy.map((line, i) => (
          <Reveal key={line} delay={i * 150}>
            <p
              className="font-display font-black uppercase leading-[0.9] text-[14vw] md:text-[7vw]"
              style={{
                color: i === studio.philosophy.length - 1 ? "var(--ember)" : "var(--paper)",
              }}
            >
              {line}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
