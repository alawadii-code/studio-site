import Image from "next/image";
import { nav, studio } from "@/data/content";

export default function Footer() {
  return (
    <footer className="bg-ink border-t hairline">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Image
              src="/images/logos/penumbra-logo.png"
              alt={studio.name}
              width={24}
              height={24}
              className="h-6 w-6 object-contain"
            />
            <p className="font-display font-extrabold tracking-[0.18em] uppercase text-sm">
              {studio.name}
            </p>
          </div>
          <p className="text-[11px] text-mist">
            © {new Date().getFullYear()} {studio.name}. All rights reserved.
          </p>
        </div>

        <ul className="flex flex-wrap gap-x-8 gap-y-3">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-[11px] tracking-[0.15em] uppercase text-mist hover:text-paper transition-colors duration-300"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
