import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AISummaryBadge } from "../ai-summary-badge";

describe("AISummaryBadge", () => {
  it("renders 'AI Summary' text", () => {
    render(<AISummaryBadge />);
    expect(screen.getByText("AI Summary")).toBeInTheDocument();
  });

  it("renders the sparkles icon", () => {
    const { container } = render(<AISummaryBadge />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("accepts a custom className", () => {
    const { container } = render(<AISummaryBadge className="custom-class" />);
    const badge = container.firstElementChild;
    expect(badge).toHaveClass("custom-class");
  });
});
