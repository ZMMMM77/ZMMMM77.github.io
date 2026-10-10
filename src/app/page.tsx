/* eslint-disable @next/next/no-img-element */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BlurFade from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";
import { MagicCard } from "@/components/magicui/magic-card";
import { profile, site, type Experience } from "@/data/profile";
import {
  ArrowUpRight,
  ChevronDown,
  FileDown,
  ImageIcon,
  UserRound,
} from "lucide-react";

function Lines({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className={`placeholder-line ${i === count - 1 ? "w-2/3" : "w-full"}`}
        />
      ))}
    </div>
  );
}

function EmptyRows({ count = 2 }: { count?: number }) {
  return (
    <div className="space-y-7" aria-label="内容待添加">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="flex items-center gap-3" aria-hidden="true">
          <div className="size-10 shrink-0 rounded-full border bg-muted/60 ring-2 ring-border/40" />
          <div className="flex-1 space-y-2">
            <div className="placeholder-line w-32 sm:w-44" />
            <div className="placeholder-line w-24 sm:w-32 !h-2" />
          </div>
          <div className="placeholder-line !h-2 w-16 sm:w-24" />
        </div>
      ))}
    </div>
  );
}

function ExperienceRows({ items }: { items: Experience[] }) {
  return (
    <div className="space-y-6">
      {items.map((item, i) => (
        <details key={i} className="group">
          <summary className="flex cursor-pointer list-none items-center gap-3 rounded-lg py-1 transition-colors hover:bg-muted/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
            <div className="size-10 shrink-0 overflow-hidden rounded-full border bg-muted/40 p-1">
              {item.logoUrl ? (
                <img
                  src={item.logoUrl}
                  alt=""
                  className="size-full object-contain"
                />
              ) : (
                <span className="flex size-full items-center justify-center text-[10px] font-semibold text-muted-foreground">
                  {item.logoText || item.title.slice(0, 1)}
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="flex items-center gap-2 text-sm font-semibold">
                {item.title}
                <ChevronDown className="size-3 shrink-0 transition-transform group-open:rotate-180" />
              </h3>
              <p className="text-sm text-muted-foreground">{item.subtitle}</p>
            </div>
            <span className="max-w-24 text-right text-xs text-muted-foreground sm:max-w-none">
              {item.dates}
            </span>
          </summary>
          <div className="mt-3 ml-13 space-y-2 text-sm leading-relaxed text-muted-foreground">
            {item.description && <p className="whitespace-pre-line">{item.description}</p>}
            {item.href && (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-foreground underline underline-offset-4"
              >
                查看学校官网 <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}

function SectionHeading({ badge, title }: { badge: string; title: string }) {
  return (
    <div className="mb-8 space-y-5 text-center">
      <div className="flex items-center">
        <div className="h-px flex-1 bg-linear-to-r from-transparent to-border" />
        <span className="rounded-xl border bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">
          {badge}
        </span>
        <div className="h-px flex-1 bg-linear-to-l from-transparent to-border" />
      </div>
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}

function Content({ id, title }: { id: string; title: string }) {
  const empty = site.showPlaceholders;
  if (id === "about")
    return (
      <>
        <h2 className="section-title">{title}</h2>
        {profile.summary ? (
          <p className="whitespace-pre-line leading-relaxed text-muted-foreground">
            {profile.summary}
          </p>
        ) : (
          empty && <Lines count={4} />
        )}
      </>
    );
  if (id === "work" || id === "education" || id === "research")
    return (
      <>
        <h2 className="section-title">{title}</h2>
        {profile[id].length ? (
          <ExperienceRows items={profile[id]} />
        ) : (
          empty && <EmptyRows />
        )}
      </>
    );
  if (id === "skills")
    return (
      <>
        <h2 className="section-title">{title}</h2>
        <div className="flex flex-wrap gap-2">
          {profile.skills.length
            ? profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-xl border px-3 py-1 text-sm"
                >
                  {skill}
                </span>
              ))
            : empty &&
              Array.from({ length: 7 }, (_, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className="h-8 rounded-xl border bg-muted/20"
                  style={{ width: [80, 104, 88, 72, 100, 84, 64][i] }}
                />
              ))}
        </div>
      </>
    );
  if (id === "projects")
    return (
      <>
        <SectionHeading badge={title} title="精选项目" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {profile.projects.length
            ? profile.projects.map((project, i) => (
                <MagicCard key={i}>
                  <article className="h-full">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-48 w-full object-cover"
                      />
                    ) : (
                      <div className="h-48 bg-muted" />
                    )}
                    <div className="space-y-3 p-6">
                      <h3 className="font-semibold">
                        {project.href ? (
                          <a
                            href={project.href}
                            className="inline-flex items-center gap-2"
                          >
                            {project.title}
                            <ArrowUpRight className="size-4" />
                          </a>
                        ) : (
                          project.title
                        )}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {project.dates}
                      </p>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border px-2 py-1 text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                  {i === 0 && <BorderBeam />}
                </MagicCard>
              ))
            : empty &&
              Array.from({ length: 2 }, (_, i) => (
                <MagicCard key={i}>
                  <div aria-label="项目待添加">
                    <div className="flex h-48 items-center justify-center bg-muted/50">
                      <ImageIcon
                        className="size-8 text-muted-foreground/25"
                        strokeWidth={1}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="space-y-5 p-6">
                      <Lines count={3} />
                      <div className="flex gap-2" aria-hidden="true">
                        <span className="h-5 w-14 rounded-md border" />
                        <span className="h-5 w-20 rounded-md border" />
                      </div>
                    </div>
                  </div>
                </MagicCard>
              ))}
        </div>
      </>
    );
  if (id === "interests")
    return (
      <>
        <SectionHeading badge={title} title="兴趣与生活" />
        <div className="ml-5 space-y-8 border-l pl-7">
          {profile.interests.length
            ? profile.interests.map((item, i) => (
                <article key={i} className="relative">
                  <span className="absolute -left-[33px] top-1 size-2.5 rounded-full border bg-background" />
                  <h3 className="mb-2 font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </article>
              ))
            : empty &&
              [0, 1].map((i) => (
                <div
                  key={i}
                  className="relative py-1"
                  aria-label="兴趣内容待添加"
                >
                  <span className="absolute -left-[33px] top-2 size-2.5 rounded-full border bg-background" />
                  <Lines count={2} />
                </div>
              ))}
        </div>
      </>
    );
  if (id === "contact")
    return (
      <div className="relative rounded-xl border px-6 py-10 text-center">
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-xl border bg-primary px-4 py-1 text-sm text-primary-foreground">
          {title}
        </span>
        <h2 className="mb-5 text-3xl font-bold tracking-tighter sm:text-5xl">
          欢迎联系
        </h2>
        {profile.email ? (
          <a
            className="underline underline-offset-4"
            href={`mailto:${profile.email}`}
          >
            {profile.email}
          </a>
        ) : (
          empty && (
            <p className="text-sm text-muted-foreground">联系方式待添加</p>
          )
        )}
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {profile.social.map((item) => (
            <a
              key={item.label}
              href={item.url}
              className="text-sm underline underline-offset-4"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    );
  return null;
}

export default function Page() {
  return (
    <main id="main" className="relative flex min-h-dvh flex-col gap-14">
      <section id="hero">
        <BlurFade
          className="flex flex-col justify-between gap-6 md:flex-row"
          duration={0.45}
          yOffset={8}
          blur="3px"
        >
          <div className="order-2 flex min-w-0 flex-1 flex-col gap-3 md:order-1">
            <h1 className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl">
              你好，我是{profile.name || "…"}
            </h1>
            {profile.description ? (
              <p className="text-muted-foreground md:text-lg lg:text-xl">
                {profile.description}
              </p>
            ) : (
              <div className="max-w-sm space-y-4 pt-1">
                <p className="text-sm text-muted-foreground">内容待添加</p>
                <Lines count={2} />
              </div>
            )}
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-lg border px-3 py-2 text-sm"
                download
              >
                <FileDown className="size-4" />
                下载简历
              </a>
            )}
          </div>
          <Avatar className="order-1 size-24 shrink-0 rounded-full border shadow-lg ring-4 ring-muted md:order-2 md:size-32">
            {profile.avatarUrl && (
              <AvatarImage alt={profile.name} src={profile.avatarUrl} />
            )}
            <AvatarFallback>
              {profile.initials || (
                <UserRound
                  className="size-10 text-muted-foreground/30"
                  strokeWidth={1}
                />
              )}
            </AvatarFallback>
          </Avatar>
        </BlurFade>
      </section>
      {site.sections
        .filter((section) => section.enabled)
        .map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-8">
            <BlurFade inView duration={0.4} yOffset={8} blur="3px">
              <Content id={section.id} title={section.title} />
            </BlurFade>
          </section>
        ))}
    </main>
  );
}
