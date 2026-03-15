import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { TopicChip } from "../topic-chip";

// Mock next/link to render a plain anchor
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("TopicChip", () => {
  it("renders the topic name", () => {
    render(<TopicChip name="AI" slug="ai" />);
    expect(screen.getByText("AI")).toBeInTheDocument();
  });

  it("links to /topics/{slug}", () => {
    render(<TopicChip name="AI" slug="ai" />);
    const link = screen.getByRole("link", { name: "AI" });
    expect(link).toHaveAttribute("href", "/topics/ai");
  });

  it("applies active styles when active prop is true", () => {
    const { container } = render(<TopicChip name="AI" slug="ai" active />);
    const link = container.firstElementChild;
    expect(link).toHaveClass("border-primary");
  });
});
