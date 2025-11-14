// app/work/[id]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";

import { PROJECTS } from "@/content/home/projects";

export default async function WorkDetailPage(props: {
  params: { id: string | Promise<string> };
}) {
  // Next 15/16: params is a Promise
  const { id } = await props.params;

  const project = PROJECTS.find((p) => p.id === id);
  if (!project) return notFound();

  const { title, tag, cover, desc, techStack, client, location } = project as {
    title: string;
    tag?: string;
    cover?: string;
    desc?: string;
    techStack?: string[];
    client?: string;
    location?: string;
  };

  const stack =
    techStack && techStack.length > 0
      ? techStack
      : ["Next.js", "TypeScript", "Tailwind CSS"];

  return (
    <section
      aria-labelledby="work-hero-title"
      className="min-h-[calc(100vh-4.5rem)]"
    >
      <div className=" gutter section-pt section-pb">
        {/* TOP: title only */}
        <h1
          id="work-hero-title"
          className="font-hero font-bold uppercase text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.9] tracking-[-0.01em]"
        >
          {title}
        </h1>

        {/* BOTTOM ROW: desc / meta / tech stack */}
        <div className="mt-8 grid gap-10 md:grid-cols-[minmax(0,2.4fr)_minmax(0,1.6fr)_minmax(0,1.2fr)] items-start">
          {/* LEFT — description */}
          <div>
            <p className="font-mono text-[14px] leading-[1.7]">
              {desc ??
                "Project description coming soon. This case study will walk through how we approached the brief, made decisions, and delivered a result that feels inevitable."}
            </p>
          </div>

          {/* MIDDLE — client / type / location */}
          <div className="font-mono text-[13px] leading-[1.7] space-y-1">
            {client && (
              <p>
                <span className="uppercase tracking-[0.12em] text-foreground-2">
                  Client
                </span>{" "}
                – {client}
              </p>
            )}
            <p>
              <span className="uppercase tracking-[0.12em] text-foreground-2">
                Type
              </span>{" "}
              – {tag ?? "Design / Development / Website"}
            </p>
            {location && (
              <p>
                <span className="uppercase tracking-[0.12em] text-foreground-2">
                  Location
                </span>{" "}
                – {location}
              </p>
            )}
          </div>

          {/* RIGHT — tech stack */}
          <div className="font-mono text-[13px] leading-[1.8] md:justify-self-end">
            <p className="uppercase tracking-[0.14em] text-foreground-2 mb-1">
              Tech Stack
            </p>
            <ul className="mt-1 space-y-1">
              {stack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* HERO IMAGE */}
        <div className="mt-10 md:mt-12 h-full">
          {cover ? (
            <div className="relative border aspect-video border-border bg-muted  overflow-hidden">
              <Image
                src={cover}
                alt={`${title} cover`}
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          ) : (
            <div className="h-[260px] md:h-[360px] lg:h-[420px] border border-border bg-foreground-2/10" />
          )}
        </div>
      </div>
    </section>
  );
}
