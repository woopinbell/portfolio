import { expect, test } from "@playwright/test";

test("shows portfolio entry points and optional project links", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("main")).toHaveAttribute(
    "data-home-template",
    "design",
  );

  await expect(
    page.getByRole("heading", { level: 1, name: "Design-minded Web Developer" }),
  ).toBeVisible();

  await expect(
    page.getByRole("link", { name: "Projects" }).first(),
  ).toHaveAttribute("href", "/projects");
  await expect(
    page.getByRole("link", { name: "Classic" }),
  ).toHaveAttribute("href", "/?view=classic");
  await expect(page.getByText("2023.01").first()).toBeVisible();
  await expect(page.getByText("42 Seoul 입과").first()).toBeVisible();
  await expect(page.locator(".paired-timeline")).toBeVisible();
  await expect(
    page.getByAltText("Seungwoo Kim profile portrait placeholder"),
  ).toBeVisible();

  await page.goto("/?view=design&debug=content");
  await expect(
    page.getByText(
      /수정: src\/content\/profile\.json > name\/koreanName\/photo\/role\/headline\/summary \+ src\/content\/presentation\.json > home\.design\.hero/,
    ),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Classic" }),
  ).toHaveAttribute("href", "/?view=classic&debug=content");
  await expect(
    page.getByRole("link", { name: "Projects" }).first(),
  ).toHaveAttribute("href", "/projects?debug=content");

  await page.goto("/?view=classic");
  await expect(page.locator("main")).toHaveAttribute(
    "data-home-template",
    "classic",
  );
  await expect(page.getByText("portfolio.sh")).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: "Selected work" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: "Complete work map" }),
  ).toBeVisible();
  await expect(page.locator(".paired-timeline")).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 1, name: "Design-minded Web Developer" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "View all projects" }),
  ).toHaveAttribute("href", "/projects?view=classic");

  await page.getByRole("link", { name: "View all projects" }).click();
  await expect(page).toHaveURL(/\/projects\?view=classic$/);
  await expect(page.locator("main")).toHaveAttribute(
    "data-home-template",
    "classic",
  );
  await expect(
    page.getByRole("heading", { level: 1, name: "Project archive" }),
  ).toBeVisible();
  await expect(page.getByText("projects.index", { exact: true })).toBeVisible();
  await expect(page.getByText("Archive tracks", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: "Grouped index" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Grounded Travel Agent case study/ }).first(),
  ).toHaveAttribute("href", "/projects/grounded-travel?view=classic");

  await page.goto("/projects?view=classic&debug=content");
  await expect(
    page.getByText("수정: src/content/presentation.json > pages.projects.classic.hero"),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Design" }),
  ).toHaveAttribute("href", "/projects?view=design&debug=content");

  await page.goto("/projects");
  await expect(
    page.getByRole("heading", { level: 1, name: "Projects" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: "Lead projects" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 1, name: "Project archive" }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: /Grounded Travel Agent case study/ }).first(),
  ).toHaveAttribute("href", "/projects/grounded-travel");

  await expect(
    page.getByText("22 visible entries · 18 42 archive").first(),
  ).toBeVisible();

  await page.goto("/projects/reliability-training-series");
  await expect(
    page.getByRole("heading", { level: 1, name: "Reliability Training Series" }),
  ).toBeVisible();
  await expect(page.getByText("Training series").first()).toBeVisible();
  await expect(page.getByRole("link", { name: /Live Demo/ })).toHaveCount(0);
});
