import { describe, expect, it } from "vitest";
import {
  getFeaturedProjects,
  getPortfolioContent,
  getProjectById,
  getProjectCardLinks,
  getResumeProjects,
  getTemplateHref,
  isProjectLive,
  resolveContentDebug,
  resolveHomeTemplateId,
} from "./portfolio";

describe("portfolio content", () => {
  it("loads the split JSON content files", () => {
    const content = getPortfolioContent({});

    expect(content.profile).toMatchObject({
      name: "Seungwoo Kim",
      koreanName: "김승우",
      handle: "Woopinbell",
      photo: {
        src: "/profile/portrait-placeholder.svg",
      },
    });
    expect(content.site.navigation.map((item) => item.href)).toEqual([
      "/",
      "/projects",
      "/about",
      "/resume",
      "/contact",
    ]);
    expect(content.presentation.templates.map((template) => template.id)).toEqual([
      "design",
      "classic",
    ]);
    expect(content.presentation.home.design.sections).toEqual([
      "featured",
      "workMap",
      "technicalFocus",
      "stack",
      "journey",
      "contact",
    ]);
    expect(content.presentation.home.classic.sections).toEqual(
      content.presentation.home.design.sections,
    );
    expect(content.presentation.home.shared.workMap.cards.map((card) => card.id)).toEqual([
      "product",
      "curriculum",
      "reliability",
    ]);
    expect(content.presentation.home.design.hero.stats.map((stat) => stat.countKey)).toEqual([
      "productCount",
      "curriculumCount",
      "reliabilityCount",
    ]);
    expect(content.presentation.pages.projects.groups.map((group) => group.category)).toContain(
      "Reliability Training",
    );
    expect(content.presentation.pages.projectDetail.sections.problem.title).toBe(
      "Problem statement",
    );
    expect(content.presentation.pages.resume.hero.downloadLabel).toBe("Download PDF");
  });

  it("filters legacy projects that are outside the current work history", () => {
    const content = getPortfolioContent({
      NEXT_PUBLIC_DASHBOARD_URL: " http://127.0.0.1:4101 ",
      NEXT_PUBLIC_SEOUL_APP_URL: "http://127.0.0.1:4102",
    });

    expect(getProjectById("ops-dashboard", content)).toBeNull();
    expect(getProjectById("seoul-live-app", content)).toBeNull();
    expect(getProjectById("pong-pong-platform", content)).toBeNull();
  });

  it("keeps live demo optional per project", () => {
    const content = getPortfolioContent({});
    const shell = getProjectById("small-shell", content);

    expect(shell).not.toBeNull();
    expect(shell && isProjectLive(shell)).toBe(false);
    expect(shell && getProjectCardLinks(shell).map((link) => link.type)).toEqual([
      "case-study",
    ]);
  });

  it("finds featured and resume projects from JSON ids", () => {
    const content = getPortfolioContent({});

    expect(getFeaturedProjects(content).map((project) => project.id)).toEqual([
      "grounded-travel",
      "chatbot-evaluation",
      "portfolio-site",
    ]);
    expect(getResumeProjects(content).map((project) => project.id)).toEqual([
      "grounded-travel",
      "chatbot-evaluation",
      "portfolio-site",
      "reliability-training-series",
      "small-shell",
    ]);
  });

  it("loads Git-history journey entries in chronological order", () => {
    const content = getPortfolioContent({});

    expect(content.journey[0]).toMatchObject({
      date: "2023-01-01",
      title: "42 Seoul 입과",
      projectId: null,
    });
    expect(content.journey.map((item) => item.date)).toEqual(
      [...content.journey.map((item) => item.date)].sort(),
    );
    expect(content.journey.map((item) => item.projectId)).toContain(
      "grounded-travel",
    );
    expect(content.journey.map((item) => item.projectId)).not.toContain(
      "pong-pong-platform",
    );
  });

  it("resolves home presentation templates from query values", () => {
    const content = getPortfolioContent({});

    expect(resolveHomeTemplateId("classic", content.presentation)).toBe("classic");
    expect(resolveHomeTemplateId(["design"], content.presentation)).toBe("design");
    expect(resolveHomeTemplateId("missing", content.presentation)).toBe("design");
    expect(resolveContentDebug("content")).toBe(true);
    expect(resolveContentDebug(["content"])).toBe(true);
    expect(resolveContentDebug("off")).toBe(false);
  });

  it("keeps template selection on internal links only", () => {
    expect(getTemplateHref("/projects", "classic")).toBe(
      "/projects?view=classic",
    );
    expect(getTemplateHref("/projects?page=2#featured", "classic")).toBe(
      "/projects?page=2&view=classic#featured",
    );
    expect(getTemplateHref("/projects?view=classic", "design")).toBe(
      "/projects",
    );
    expect(getTemplateHref("/", "design", { alwaysInclude: true })).toBe(
      "/?view=design",
    );
    expect(getTemplateHref("/projects", "classic", { contentDebug: true })).toBe(
      "/projects?view=classic&debug=content",
    );
    expect(getTemplateHref("https://example.com", "classic")).toBe(
      "https://example.com",
    );
  });
});
