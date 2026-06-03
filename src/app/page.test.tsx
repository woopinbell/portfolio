import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Home", () => {
  it("renders the portfolio identity and primary navigation", async () => {
    const { container } = render(await Home({}));

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Design-minded Web Developer",
      }),
    ).toBeInTheDocument();
    expect(container.querySelector("main")).toHaveAttribute(
      "data-home-template",
      "design",
    );

    expect(screen.getAllByRole("link", { name: "Projects" })[0]).toHaveAttribute(
      "href",
      "/projects",
    );
    expect(screen.getAllByRole("link", { name: "Resume" })[0]).toHaveAttribute(
      "href",
      "/resume",
    );
  });

  it("renders featured projects from content", async () => {
    render(await Home({}));

    expect(
      screen.getByRole("heading", { level: 2, name: "Lead case studies" }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText("Sportsbook — Distributed Betting Platform")[0],
    ).toBeInTheDocument();
    expect(screen.getAllByText("Backend Reliability Training")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Pong Pong Realtime MVP")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Portfolio Site")[0]).toBeInTheDocument();
    expect(screen.queryByText("Operations Dashboard")).not.toBeInTheDocument();
    expect(screen.getAllByText("Case Study")[0]).toBeInTheDocument();
  });

  it("renders home sections without source-only projects in featured work", async () => {
    const { container } = render(await Home({}));

    expect(
      screen.getByRole("heading", { level: 2, name: "Technical focus" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Complete work map" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Lead case study")).toBeInTheDocument();
    expect(screen.queryByText("portfolio.sh")).not.toBeInTheDocument();
    expect(screen.getByText("2023.01")).toBeInTheDocument();
    expect(screen.getByText("42 Seoul 입과")).toBeInTheDocument();
    expect(screen.getByText("C Foundation Kit")).toBeInTheDocument();
    expect(container.querySelector(".paired-timeline")).toBeInTheDocument();
    expect(container.querySelector(".paired-timeline-row")).toBeInTheDocument();
    expect(screen.getByAltText("Seungwoo Kim profile portrait placeholder")).toHaveAttribute(
      "src",
      "/profile/portrait-placeholder.svg",
    );
    expect(screen.queryByText("Pong Pong Platform")).not.toBeInTheDocument();
  });

  it("renders the classic template from shared content", async () => {
    const { container } = render(
      await Home({
        searchParams: Promise.resolve({ view: "classic" }),
      }),
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Design-minded Web Developer",
      }),
    ).toBeInTheDocument();
    expect(container.querySelector("main")).toHaveAttribute(
      "data-home-template",
      "classic",
    );
    expect(screen.getByText("portfolio.sh")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Selected work" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Complete work map" }),
    ).toBeInTheDocument();
    expect(container.querySelector(".paired-timeline")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View all projects" })).toHaveAttribute(
      "href",
      "/projects?view=classic",
    );
    expect(screen.getAllByRole("link", { name: "Projects" })[0]).toHaveAttribute(
      "href",
      "/projects?view=classic",
    );
  });

  it("shows JSON edit hints when content debug is enabled", async () => {
    render(
      await Home({
        searchParams: Promise.resolve({ debug: "content", view: "design" }),
      }),
    );

    expect(
      screen.getByText(
        /수정: src\/content\/profile\.json > name\/koreanName\/photo\/role\/headline\/summary \+ src\/content\/presentation\.json > home\.design\.hero/,
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Classic" })).toHaveAttribute(
      "href",
      "/?view=classic&debug=content",
    );
    expect(screen.getAllByRole("link", { name: "Projects" })[0]).toHaveAttribute(
      "href",
      "/projects?debug=content",
    );
  });
});
