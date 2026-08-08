"use client";

import { useState } from "react";
import { departments, careersClosing } from "@/data/careers";
import Reveal from "./Reveal";
import ApplicationModal from "./ApplicationModal";

export default function Careers() {
  const [openDept, setOpenDept] = useState<string | null>(null);
  const [applying, setApplying] = useState<{ department: string; position: string } | null>(
    null
  );

  return (
    <section id="careers" className="relative py-28 md:py-40 border-t hairline">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <Reveal className="mb-16 md:mb-20 flex items-end justify-between flex-wrap gap-6">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-ember mb-6">
              Careers
            </p>
            <h2 className="font-display font-extrabold uppercase text-4xl md:text-6xl leading-[0.95]">
              Join the Studio
            </h2>
          </div>
          <p className="text-mist text-sm max-w-sm">
            We&apos;re a small, ambitious team building our first games. If
            you want to help shape that from the ground up, here&apos;s
            where we&apos;re currently looking to grow.
          </p>
          <p className="text-red-500 font-bold text-sm max-w-sm">
             [[Well, we do not accept black people and non-racist minorities, and we do not like stupid or naive people (an IQ test will be done for everyone from managers to volunteers btw).
             ]]</p>
        </Reveal>

        <div className="flex flex-col border-t hairline">
          {departments.map((dept, i) => {
            const isOpen = openDept === dept.slug;
            return (
              <Reveal key={dept.slug} delay={i * 60}>
                <div className="border-b hairline">
                  <button
                    onClick={() => setOpenDept(isOpen ? null : dept.slug)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-6 py-7 md:py-8 text-left group"
                  >
                    <div className="flex items-baseline gap-4 md:gap-6">
                      <span className="font-display text-xs tracking-[0.2em] text-mist">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display font-bold uppercase text-2xl md:text-4xl group-hover:text-ember transition-colors duration-300">
                        {dept.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-[11px] tracking-[0.15em] uppercase text-mist hidden sm:inline">
                        {dept.positions.length} open roles
                      </span>
                      <span
                        className={`text-xl text-mist transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      >
                        +
                      </span>
                    </div>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden min-h-0">
                      <ul className="pb-8 md:pb-10 divide-y hairline">
                        {dept.positions.map((pos) => (
                          <li
                            key={pos.slug}
                            className="flex items-center justify-between gap-6 py-4 pl-0 md:pl-16"
                          >
                            <div>
                              <p className="text-sm md:text-base text-paper">
                                {pos.title}
                              </p>
                              {(pos.employmentType || pos.location) && (
                                <p className="text-[11px] tracking-[0.1em] uppercase text-mist mt-1">
                                  {[pos.employmentType, pos.location]
                                    .filter(Boolean)
                                    .join(" · ")}
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() =>
                                setApplying({ department: dept.name, position: pos.title })
                              }
                              className="shrink-0 px-5 py-2.5 border hairline text-[11px] tracking-[0.15em] uppercase text-paper hover:border-ember hover:text-ember transition-colors duration-300"
                            >
                              Apply
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <p className="mt-14 text-mist text-sm md:text-base max-w-xl">
            {careersClosing}
          </p>
        </Reveal>
      </div>

      {applying && (
        <ApplicationModal
          department={applying.department}
          position={applying.position}
          onClose={() => setApplying(null)}
        />
      )}
    </section>
  );
}
