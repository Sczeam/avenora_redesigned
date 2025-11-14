"use client";

import Image from "next/image";
import Link, { type LinkProps } from "next/link";
import { Project, PROJECTS } from "@/content/home/projects";

export function ProjectsSection() {
  return (
    <section>
      <div className=" gutter section-pt section-pb">
        <h2 className="font-mono font-light text-[22px] md:text-[32px] leading-none text-foreground/50 mb-6">
          Take a look at our{" "}
          <span className="font-sans font-bold text-foreground">
            latest Projects
          </span>
        </h2>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {PROJECTS.map((p) => (
            <li key={p.id}>
              {p.href ? (
                <Link
                  href={p.href}
                  className="group block rounded-sm border border-foreground bg-background  transition-transform hover:-translate-y-0.5 p-2"
                >
                  <CardInner p={p} />
                </Link>
              ) : (
                <div className="group block rounded-sm border border-foreground bg-background  p-2">
                  <CardInner p={p} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CardInner({ p }: { p: Project }) {
  return (
    <>
      {/* Inset canvas */}
      <div className="rounded-t-sm bg-surface ">
        <figure className="relative aspect-16/7 w-full overflow-hidden rounded-md">
          <Image
            src={p.cover}
            alt={p.title}
            fill
            priority
            className="object-cover object-top"
          />
        </figure>
      </div>

      {/* Footer bar */}
      <div className="flex items-center justify-between px-3 md:px-4 py-2 md:py-3 rounded-b-sm">
        <span className="font-sans text-[14px] md:text-[24px]">{p.title}</span>
        {p.tag ? (
          <span className="inline-flex items-center rounded-sm border border-border px-2.5 py-1 text-[12px] font-mono tracking-[0.08em] text-foreground-2 group-hover:text-foreground">
            {p.tag}
          </span>
        ) : (
          <span />
        )}
      </div>
    </>
  );
}
