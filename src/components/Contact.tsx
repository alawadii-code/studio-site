import { contact } from "@/data/content";
import Reveal from "./Reveal";

const links = [
  { key: "email", label: "Email", href: contact.email ? `mailto:${contact.email}` : "" , value: contact.email },
  { key: "discord", label: "Discord", href: contact.discord, value: contact.discord },
  { key: "twitter", label: "X / Twitter", href: contact.twitter, value: contact.twitter },
  { key: "youtube", label: "YouTube", href: contact.youtube, value: contact.youtube },
  { key: "steam", label: "Steam", href: contact.steam, value: contact.steam },
].filter((l) => l.value);

export default function Contact() {
  return (
    <section id="contact" className="relative py-28 md:py-40 border-t hairline">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <Reveal className="mb-14">
          <p className="text-xs tracking-[0.3em] uppercase text-ember mb-6">
            Get in Touch
          </p>
          <h2 className="font-display font-extrabold uppercase text-4xl md:text-6xl leading-[0.95]">
            Let&apos;s talk.
          </h2>
        </Reveal>

        {links.length > 0 ? (
          <Reveal delay={150}>
            <ul className="flex flex-col divide-y hairline border-t hairline max-w-2xl">
              {links.map((l) => (
                <li key={l.key}>
                  <a
                    href={l.href}
                    target={l.key === "email" ? undefined : "_blank"}
                    rel="noreferrer"
                    className="group flex items-center justify-between py-6 text-2xl md:text-3xl font-display uppercase hover:text-ember transition-colors duration-300"
                  >
                    <span>{l.label}</span>
                    <span className="text-mist text-sm group-hover:text-ember transition-colors duration-300">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        ) : (
          <Reveal delay={150}>
            <p className="text-mist text-sm max-w-md">
              [No contact links provided yet — add an email address and social
              links in src/data/content.ts to populate this section.]
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
