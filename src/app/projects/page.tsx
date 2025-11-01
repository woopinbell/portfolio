import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { AvailabilityBadge } from "@/components/portfolio/availability-badge";
import { ContentHint } from "@/components/portfolio/content-hint";
import { ProjectCard } from "@/components/portfolio/project-card";
import { PageShell } from "@/components/portfolio/site-shell";
import { StackList } from "@/components/portfolio/stack-list";
import {
  getPortfolioContent,
  getTemplateHref,
  resolveContentDebug,
  resolveHomeTemplateId,
  type HomeTemplateId,
  type ProjectPageContent,
  type PortfolioProject,
  type RouteSearchParams,
} from "@/lib/portfolio";

function groupProjects(
  projects: PortfolioProject[],
  groups: ProjectPageContent["groups"],
) {
  const grouped = new Map<string, PortfolioProject[]>();
  const groupOrder = groups.map((group) => group.category);

  for (const project of projects) {
    grouped.set(project.category, [...(grouped.get(project.category) ?? []), project]);
  }

  return [...grouped.entries()].sort(([left], [right]) => {
    const leftIndex = groupOrder.indexOf(left);
    const rightIndex = groupOrder.indexOf(right);

    if (leftIndex === -1 && rightIndex === -1) {
      return left.localeCompare(right);
    }

    if (leftIndex === -1) {
      return 1;
    }

    if (rightIndex === -1) {
      return -1;
    }

    return leftIndex - rightIndex;
  });
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams?: RouteSearchParams;
}) {
  const content = getPortfolioContent();
  const params = searchParams ? await searchParams : {};
  const activeTemplate = resolveHomeTemplateId(params.view, content.presentation);
  const contentDebug = resolveContentDebug(params.debug);
  const pageCopy = content.presentation.pages.projects;
  const featuredProjects = content.projects.filter((project) => project.featured);
  const trackProjects = content.projects.filter((project) => !project.featured);
  const groupedProjects = groupProjects(trackProjects, pageCopy.groups);
  const sourceOnlyCount = content.projects.filter(
    (project) => project.deployment.status === "source-only",
  ).length;
  const curriculumCount = content.projects.filter((project) =>
    project.screenshot.src.startsWith("/projects/42/") || project.id === "pong-pong",
  ).length;
  const shellProps = {
    contentDebug,
    homeTemplate: activeTemplate,
    profile: content.profile,
    site: content.site,
    templateSwitcher: {
      activeId: activeTemplate,
      contentDebug,
      currentPath: "/projects",
      templates: content.presentation.templates,
    },
  };

  if (activeTemplate === "classic") {
    return (
      <PageShell {...shellProps}>
        <ClassicProjectsView
          activeTemplate={activeTemplate}
          contentDebug={contentDebug}
          curriculumCount={curriculumCount}
          featuredProjects={featuredProjects}
          groupedProjects={groupedProjects}
          pageCopy={pageCopy}
          projects={content.projects}
          sourceOnlyCount={sourceOnlyCount}
        />
      </PageShell>
    );
  }

  return (
    <PageShell {...shellProps}>
      <DesignProjectsView
        activeTemplate={activeTemplate}
        contentDebug={contentDebug}
        curriculumCount={curriculumCount}
        featuredProjects={featuredProjects}
        groupedProjects={groupedProjects}
        pageCopy={pageCopy}
        projects={content.projects}
        sourceOnlyCount={sourceOnlyCount}
      />
    </PageShell>
  );
}

function DesignProjectsView({
  activeTemplate,
  contentDebug,
  curriculumCount,
  featuredProjects,
  groupedProjects,
  pageCopy,
  projects,
  sourceOnlyCount,
}: {
  activeTemplate: HomeTemplateId;
  contentDebug: boolean;
  curriculumCount: number;
  featuredProjects: PortfolioProject[];
  groupedProjects: [string, PortfolioProject[]][];
  pageCopy: ProjectPageContent;
  projects: PortfolioProject[];
  sourceOnlyCount: number;
}) {
  const copy = pageCopy.design;
  const groupCopy = new Map(pageCopy.groups.map((group) => [group.category, group.body]));

  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <ContentHint
            enabled={contentDebug}
            path="src/content/projects.json > projects[]"
          />
          <p className="text-sm font-medium text-muted">
            {projects.length} {copy.hero.stats.visibleEntries} · {curriculumCount} {copy.hero.stats.archive} · {sourceOnlyCount} {copy.hero.stats.sourceFirst}
          </p>
          <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-tight text-foreground md:text-6xl">
            {copy.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted">
            {copy.hero.body}
          </p>
        </div>
      </section>
      <section className="border-b border-line bg-background-soft">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-14 sm:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <ContentHint
                enabled={contentDebug}
                path="src/content/presentation.json > pages.projects.design.featured"
              />
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                {copy.featured.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-foreground">
                {copy.featured.title}
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-muted">
              {copy.featured.body}
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                contentDebug={contentDebug}
                homeTemplate={activeTemplate}
                key={project.id}
                priority={index < 2}
                project={project}
              />
            ))}
          </div>
        </div>
      </section>
      <div>
        {groupedProjects.map(([category, projects], groupIndex) => (
          <section
            className={`border-b border-line ${
              groupIndex % 2 === 0 ? "" : "bg-background-soft"
            }`}
            key={category}
          >
            <div className="mx-auto grid max-w-6xl gap-6 px-5 py-14 sm:px-8">
              <div className="grid gap-4 lg:grid-cols-[0.38fr_0.62fr] lg:items-end">
                <div>
                  <ContentHint
                    enabled={contentDebug}
                    path={`src/content/presentation.json > pages.projects.groups[category=${category}]`}
                  />
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                    {projects.length} {copy.group.countLabel}
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold text-foreground">
                    {category}
                  </h2>
                </div>
                <p className="max-w-2xl text-sm leading-6 text-muted lg:justify-self-end">
                  {groupCopy.get(category)}
                </p>
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                {projects.map((project) => (
                  <ProjectCard
                    contentDebug={contentDebug}
                    homeTemplate={activeTemplate}
                    key={project.id}
                    project={project}
                  />
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

function ClassicProjectsView({
  activeTemplate,
  contentDebug,
  curriculumCount,
  featuredProjects,
  groupedProjects,
  pageCopy,
  projects,
  sourceOnlyCount,
}: {
  activeTemplate: HomeTemplateId;
  contentDebug: boolean;
  curriculumCount: number;
  featuredProjects: PortfolioProject[];
  groupedProjects: [string, PortfolioProject[]][];
  pageCopy: ProjectPageContent;
  projects: PortfolioProject[];
  sourceOnlyCount: number;
}) {
  const leadProject = featuredProjects[0];
  const copy = pageCopy.classic;
  const groupCopy = new Map(pageCopy.groups.map((group) => [group.category, group.body]));
  const counts = {
    curriculumCount,
    projectCount: projects.length,
    sourceOnlyCount,
  };

  return (
    <>
      <section className="classic-projects-hero border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <ContentHint
              enabled={contentDebug}
              path="src/content/presentation.json > pages.projects.classic.hero"
            />
            <p className="text-sm font-medium text-muted">
              {copy.hero.eyebrow}
            </p>
            <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-tight text-foreground md:text-6xl">
              {copy.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted">
              {copy.hero.body}
            </p>
            <dl className="mt-8 grid max-w-2xl grid-cols-3 overflow-hidden rounded-md border border-line bg-surface">
              {copy.hero.stats.map((stat, index) => (
                <div
                  className={index < copy.hero.stats.length - 1 ? "border-r border-line p-4" : "p-4"}
                  key={stat.label}
                >
                  <dt className="text-xs font-semibold uppercase text-muted">
                    {stat.label}
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold text-foreground">
                    {counts[stat.countKey]}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <aside
            aria-label={copy.terminal.ariaLabel}
            className="terminal-window mx-auto w-full max-w-xl"
          >
            <ContentHint
              enabled={contentDebug}
              path="src/content/presentation.json > pages.projects.classic.terminal"
            />
            <div className="terminal-titlebar">
              <span className="bg-[#ff6b5f]" />
              <span className="bg-[#f6c76f]" />
              <span className="bg-[#67d391]" />
              <p>{copy.terminal.title}</p>
            </div>
            <div className="terminal-body">
              <p className="terminal-line">
                <span className="text-accent">{copy.terminal.promptUser}</span>
                <span className="text-muted">:</span>
                <span className="text-signal">{copy.terminal.promptPath}</span>
                <span className="text-muted">$ </span>
                {copy.terminal.command}
              </p>
              <div className="mt-5 grid gap-3">
                {groupedProjects.slice(0, copy.terminal.maxGroups).map(([category, items]) => (
                  <p className="terminal-line terminal-output" key={category}>
                    {category.padEnd(26, ".")} {items.length} {copy.terminal.entryLabel}
                  </p>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
      {leadProject ? (
        <section className="border-b border-line bg-background-soft">
          <div className="mx-auto grid max-w-6xl gap-6 px-5 py-14 sm:px-8">
            <div className="grid gap-3 lg:grid-cols-[0.4fr_0.6fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                  {copy.selected.eyebrow}
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-foreground">
                  {copy.selected.title}
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-muted lg:justify-self-end">
                {copy.selected.body}
              </p>
            </div>
            <ProjectCard
              contentDebug={contentDebug}
              homeTemplate={activeTemplate}
              priority
              project={leadProject}
              variant="featured"
            />
          </div>
        </section>
      ) : null}
      <section>
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-14 sm:px-8">
          <div className="grid gap-3 lg:grid-cols-[0.4fr_0.6fr] lg:items-end">
            <div>
              <ContentHint
                enabled={contentDebug}
                path="src/content/presentation.json > pages.projects.classic.grouped"
              />
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                {copy.grouped.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-foreground">
                {copy.grouped.title}
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-muted lg:justify-self-end">
              {copy.grouped.body}
            </p>
          </div>
          <div className="grid gap-3">
            {groupedProjects.map(([category, items]) => (
              <article
                className="rounded-md border border-line bg-surface p-5"
                key={category}
              >
                <div className="grid gap-5 lg:grid-cols-[0.3fr_0.7fr]">
                  <div>
                    <ContentHint
                      enabled={contentDebug}
                      path={`src/content/presentation.json > pages.projects.groups[category=${category}]`}
                    />
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-accent">
                      {items.length} {copy.grouped.countLabel}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-foreground">
                      {category}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted">
                      {groupCopy.get(category)}
                    </p>
                  </div>
                  <ul className="grid gap-3">
                    {items.map((project) => (
                      <li
                        className="grid gap-3 border-t border-line pt-3 first:border-t-0 first:pt-0"
                        key={project.id}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <Link
                            className="inline-flex items-center gap-2 font-semibold text-foreground transition hover:text-accent-strong"
                            href={getTemplateHref(
                              `/projects/${project.id}`,
                              activeTemplate,
                              { contentDebug },
                            )}
                          >
                            {project.title}
                            <ArrowRightIcon />
                          </Link>
                          <AvailabilityBadge project={project} />
                        </div>
                        <p className="text-sm leading-6 text-muted">
                          {project.summary}
                        </p>
                        <StackList items={project.stack} limit={5} />
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
