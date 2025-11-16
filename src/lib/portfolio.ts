import contactJson from "@/content/contact.json";
import experienceJson from "@/content/experience.json";
import journeyJson from "@/content/journey.json";
import journeyNarrativeJson from "@/content/journey-narrative.json";
import linksJson from "@/content/links.json";
import presentationJson from "@/content/presentation.json";
import profileJson from "@/content/profile.json";
import projectsJson from "@/content/projects.json";
import resumeJson from "@/content/resume.json";
import siteJson from "@/content/site.json";
import skillsJson from "@/content/skills.json";
import techStackJson from "@/content/tech-stack.json";

export type NavigationItem = {
  label: string;
  href: string;
};

export type SiteContent = {
  title: string;
  description: string;
  language: string;
  brand: string;
  navigation: NavigationItem[];
  footer: {
    note: string;
    copyright: string;
  };
};

export type ProfilePrinciple = {
  title: string;
  body: string;
};

export type ProfilePhoto = {
  src: string;
  alt: string;
};

export type ProfileContent = {
  name: string;
  koreanName: string;
  handle: string;
  role: string;
  headline: string;
  summary: string;
  location: string;
  availability: string;
  photo?: ProfilePhoto;
  principles: ProfilePrinciple[];
};

export type LinkType =
  | "case-study"
  | "demo"
  | "email"
  | "github"
  | "resume"
  | "source"
  | "website";

export type EnvKey = "NEXT_PUBLIC_DASHBOARD_URL" | "NEXT_PUBLIC_SEOUL_APP_URL";

export type ContentLink = {
  id?: string;
  type: LinkType;
  label: string;
  href: string;
  envKey?: EnvKey;
  external?: boolean;
  enabled?: boolean;
};

export type DeploymentStatus =
  | "archived"
  | "case-study-only"
  | "live"
  | "offline"
  | "private"
  | "source-only";

export type DeploymentState = {
  status: DeploymentStatus;
  label: string;
  showBadge?: boolean;
};

export type ProjectImage = {
  src: string;
  alt: string;
};

export type ProjectArchitecture = {
  summary: string;
  items: string[];
};

export type PortfolioProject = {
  id: string;
  order: string;
  title: string;
  category: string;
  featured?: boolean;
  enabled?: boolean;
  period: string;
  role: string;
  summary: string;
  description: string;
  deployment: DeploymentState;
  screenshot: ProjectImage;
  screenshots: ProjectImage[];
  stack: string[];
  links: ContentLink[];
  highlights: string[];
  problem: string;
  solution: string;
  architecture: ProjectArchitecture;
  decisions: string[];
  tradeoffs: string[];
  results: string[];
};

export type HomeTemplateId = "design" | "classic";

export type PresentationTemplate = {
  id: HomeTemplateId;
  label: string;
  description: string;
};

export type HomeSectionId =
  | "contact"
  | "featured"
  | "journey"
  | "stack"
  | "technicalFocus"
  | "workMap";

export type SectionCopy = {
  actionLabel?: string;
  title: string;
  body?: string;
};

export type WorkMapCountKey =
  | "curriculumCount"
  | "productCount"
  | "reliabilityCount";

export type WorkMapCard = {
  id: string;
  label: string;
  body: string;
  countKey: WorkMapCountKey;
};

export type WorkMapPresentation = SectionCopy & {
  cards: WorkMapCard[];
};

export type HomeStatPresentation = {
  label: string;
  countKey: WorkMapCountKey;
};

export type DesignHomeHeroPresentation = {
  primaryActionLabel: string;
  leadLabel: string;
  leadActionLabel: string;
  stats: HomeStatPresentation[];
};

export type ClassicHomeHeroPresentation = {
  primaryActionLabel: string;
};

export type TerminalCommand = {
  command: string;
  output: string[];
};

export type TerminalPresentation = {
  title: string;
  bootLine: string;
  promptUser: string;
  promptPath: string;
  commands: TerminalCommand[];
};

export type HomePresentation = {
  design: {
    hero: DesignHomeHeroPresentation;
    sections: HomeSectionId[];
    featured: SectionCopy;
  };
  classic: {
    hero: ClassicHomeHeroPresentation;
    sections: HomeSectionId[];
    featured: SectionCopy;
    terminal: TerminalPresentation;
  };
  shared: {
    workMap: WorkMapPresentation;
    technicalFocus: SectionCopy;
    stack: SectionCopy;
    journey: SectionCopy;
    contact: {
      actionLabel: string;
      title: string;
    };
  };
};

export type ProjectGroupPresentation = {
  category: string;
  body: string;
};

export type ProjectPageCountKey =
  | "curriculumCount"
  | "projectCount"
  | "sourceOnlyCount";

export type ProjectPageContent = {
  groups: ProjectGroupPresentation[];
  design: {
    hero: {
      title: string;
      body: string;
      stats: {
        visibleEntries: string;
        archive: string;
        sourceFirst: string;
      };
    };
    featured: {
      eyebrow: string;
      title: string;
      body: string;
    };
    group: {
      countLabel: string;
    };
  };
  classic: {
    hero: {
      eyebrow: string;
      title: string;
      body: string;
      stats: Array<{
        label: string;
        countKey: ProjectPageCountKey;
      }>;
    };
    terminal: {
      ariaLabel: string;
      title: string;
      promptUser: string;
      promptPath: string;
      command: string;
      entryLabel: string;
      maxGroups: number;
    };
    selected: {
      eyebrow: string;
      title: string;
      body: string;
    };
    grouped: {
      eyebrow: string;
      title: string;
      body: string;
      countLabel: string;
    };
  };
};

export type ProjectDetailPageContent = {
  backLabel: string;
  sections: Record<
    | "architecture"
    | "decisions"
    | "problem"
    | "result"
    | "screenshots"
    | "solution"
    | "stack"
    | "tradeoffs",
    {
      eyebrow: string;
      title: string;
    }
  >;
};

export type AboutPageContent = {
  hero: { title: string };
  principles: { title: string };
  journey: { title: string };
  skills: { title: string };
};

export type JourneyPageContent = {
  hero: { title: string; eyebrow: string };
  narrative: { title: string; body: string };
  timeline: { title: string; body: string };
  now: { title: string; anchorLabel: string };
};

export type ResumePageContent = {
  hero: {
    title: string;
    body: string;
    downloadLabel: string;
  };
  summary: { title: string };
  projects: {
    title: string;
    caseStudyLabel: string;
  };
  training: { title: string };
};

export type ContactPageContent = {
  availability: { title: string };
  notes: { title: string };
};

export type PresentationContent = {
  defaultHomeTemplate: HomeTemplateId;
  templates: PresentationTemplate[];
  home: HomePresentation;
  pages: {
    about: AboutPageContent;
    contact: ContactPageContent;
    journey: JourneyPageContent;
    projectDetail: ProjectDetailPageContent;
    projects: ProjectPageContent;
    resume: ResumePageContent;
  };
};

export type TechStackIcon =
  | "api"
  | "box"
  | "c"
  | "check"
  | "cmake"
  | "cplusplus"
  | "database"
  | "docker"
  | "eslint"
  | "flow"
  | "json"
  | "nextjs"
  | "nodejs"
  | "playwright"
  | "postgresql"
  | "prisma"
  | "react"
  | "redis"
  | "shield"
  | "tailwind"
  | "terminal"
  | "tool"
  | "typescript"
  | "vitest";

export type TechStackItem = {
  id: string;
  label: string;
  icon: TechStackIcon;
  color: string;
};

export type SkillFocusArea = {
  title: string;
  body: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type SkillsContent = {
  focusAreas: SkillFocusArea[];
  groups: SkillGroup[];
};

export type ExperienceItem = {
  period: string;
  title: string;
  body: string;
};

export type JourneyItem = {
  date: string;
  endDate: string | null;
  title: string;
  category: string;
  body: string;
  projectId: string | null;
  sourcePath: string | null;
};

export type ContactContent = {
  title: string;
  intro: string;
  availability: string;
  preferred: string[];
  notes: string[];
};

export type ResumeTraining = {
  name: string;
  period: string;
  description: string;
};

export type ResumeEducation = {
  name: string;
  period: string;
  description: string;
};

export type ResumeContent = {
  downloadUrl: string | null;
  summary: string[];
  projectIds: string[];
  training: ResumeTraining[];
  education: ResumeEducation[];
  notes: string[];
};

export type JourneyMilestone = {
  id: string;
  date: string;
  title: string;
  state: string;
  reason: string;
  result: string;
  anchorProjectIds: string[];
};

export type JourneyNarrativeContent = {
  intro: string;
  milestones: JourneyMilestone[];
  currentPosition: {
    title: string;
    body: string;
  };
};

export type PortfolioContent = {
  site: SiteContent;
  profile: ProfileContent;
  projects: PortfolioProject[];
  presentation: PresentationContent;
  skills: SkillsContent;
  techStack: TechStackItem[];
  experience: ExperienceItem[];
  journey: JourneyItem[];
  journeyNarrative: JourneyNarrativeContent;
  links: ContentLink[];
  contact: ContactContent;
  resume: ResumeContent;
};

export type PortfolioEnv = Partial<Record<EnvKey, string | undefined>>;
export type RouteSearchParams = Promise<
  Record<string, string | string[] | undefined>
>;

const site = siteJson as SiteContent;
const profile = profileJson as ProfileContent;
const presentation = presentationJson as PresentationContent;
const projects = projectsJson as PortfolioProject[];
const skills = skillsJson as SkillsContent;
const techStack = techStackJson as TechStackItem[];
const experience = experienceJson as ExperienceItem[];
const journey = (journeyJson as JourneyItem[]).slice().sort((left, right) => {
  const dateOrder = left.date.localeCompare(right.date);

  if (dateOrder !== 0) {
    return dateOrder;
  }

  return left.title.localeCompare(right.title);
});
const links = linksJson as ContentLink[];
const contact = contactJson as ContactContent;
const resume = resumeJson as ResumeContent;
const journeyNarrative = journeyNarrativeJson as JourneyNarrativeContent;
const techStackById = new Map(techStack.map((item) => [item.id, item]));

function withEnvHref(link: ContentLink, env: PortfolioEnv): ContentLink {
  const envValue = link.envKey ? env[link.envKey]?.trim() : undefined;

  return {
    ...link,
    href: envValue && envValue.length > 0 ? envValue : link.href,
  };
}

export function getEnabledLinks(contentLinks: ContentLink[] = links) {
  return contentLinks.filter((link) => link.enabled !== false);
}

export function getPortfolioContent(
  env: PortfolioEnv = {
    NEXT_PUBLIC_DASHBOARD_URL: process.env.NEXT_PUBLIC_DASHBOARD_URL,
    NEXT_PUBLIC_SEOUL_APP_URL: process.env.NEXT_PUBLIC_SEOUL_APP_URL,
  },
): PortfolioContent {
  const resolvedProjects = projects
    .filter((project) => project.enabled !== false)
    .map((project) => ({
      ...project,
      links: project.links
        .filter((link) => link.enabled !== false)
        .map((link) => withEnvHref(link, env)),
    }));

  return {
    site,
    profile,
    projects: resolvedProjects,
    presentation,
    skills,
    techStack,
    experience,
    journey,
    journeyNarrative,
    links: getEnabledLinks(),
    contact,
    resume,
  };
}

export function resolveHomeTemplateId(
  value: string | string[] | undefined,
  content: PresentationContent = presentation,
): HomeTemplateId {
  const templateId = Array.isArray(value) ? value[0] : value;

  if (
    templateId &&
    content.templates.some((template) => template.id === templateId)
  ) {
    return templateId as HomeTemplateId;
  }

  return content.defaultHomeTemplate;
}

export function resolveContentDebug(value: string | string[] | undefined) {
  return (Array.isArray(value) ? value[0] : value) === "content";
}

export function getTemplateHref(
  href: string,
  templateId?: HomeTemplateId,
  options: { alwaysInclude?: boolean; contentDebug?: boolean } = {},
) {
  if (!templateId || !href.startsWith("/") || href.startsWith("//")) {
    return href;
  }

  const hashIndex = href.indexOf("#");
  const withoutHash = hashIndex === -1 ? href : href.slice(0, hashIndex);
  const hash = hashIndex === -1 ? "" : href.slice(hashIndex);
  const [pathname, query] = withoutHash.split("?", 2);
  const params = new URLSearchParams(query);
  const shouldIncludeView = options.alwaysInclude || templateId !== "design";

  if (shouldIncludeView) {
    params.set("view", templateId);
  } else {
    params.delete("view");
  }

  if (options.contentDebug) {
    params.set("debug", "content");
  }

  const queryString = params.toString();

  return `${pathname}${queryString ? `?${queryString}` : ""}${hash}`;
}

export function resolveTechStackItem(
  id: string,
): TechStackItem {
  return (
    techStackById.get(id) ?? {
      id,
      label: id,
      icon: "tool",
      color: "#9cc8b1",
    }
  );
}

export function getFeaturedProjects(
  content: PortfolioContent = getPortfolioContent(),
) {
  return content.projects.filter((project) => project.featured);
}

export function getProjectById(
  projectId: string,
  content: PortfolioContent = getPortfolioContent(),
) {
  return content.projects.find((project) => project.id === projectId) ?? null;
}

export function getResumeProjects(
  content: PortfolioContent = getPortfolioContent(),
) {
  const byId = new Map(content.projects.map((project) => [project.id, project]));

  return content.resume.projectIds
    .map((projectId) => byId.get(projectId))
    .filter((project): project is PortfolioProject => Boolean(project));
}

export function getPreferredContactLinks(
  content: PortfolioContent = getPortfolioContent(),
) {
  const byId = new Map(content.links.map((link) => [link.id, link]));

  return content.contact.preferred
    .map((id) => byId.get(id))
    .filter((link): link is ContentLink => Boolean(link));
}

export function getProjectLink(project: PortfolioProject, type: LinkType) {
  return project.links.find((link) => link.type === type) ?? null;
}

export function isProjectLive(project: PortfolioProject) {
  return Boolean(
    project.deployment.status === "live" && getProjectLink(project, "demo"),
  );
}

export function getProjectCardLinks(project: PortfolioProject) {
  return project.links.filter((link) => {
    if (link.type === "demo") {
      return isProjectLive(project);
    }

    return link.type === "github" || link.type === "case-study";
  });
}

export function getExternalLinkProps(link: ContentLink) {
  if (!link.external) {
    return {};
  }

  return {
    rel: "noreferrer",
    target: "_blank",
  };
}
