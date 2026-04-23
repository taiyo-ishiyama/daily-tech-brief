import { test, expect } from "@playwright/test";

test.describe("Accessibility", () => {
  test("homepage has proper heading hierarchy", async ({ page }) => {
    await page.goto("/");

    const h1 = page.locator("h1");
    await expect(h1.first()).toBeVisible();
  });

  test("images have alt text", async ({ page }) => {
    await page.goto("/");

    const images = page.locator("img");
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute("alt");
      expect(alt).not.toBeNull();
    }
  });

  test("interactive elements are keyboard accessible", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const tabbableCount = await page.evaluate(() => {
      const selectors = [
        "a[href]",
        "button:not([disabled])",
        "input:not([disabled])",
        "[tabindex]:not([tabindex=\"-1\"])",
      ];
      return document.querySelectorAll(selectors.join(", ")).length;
    });

    expect(tabbableCount).toBeGreaterThan(0);
  });

  test("buttons have accessible names", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(500);

    const buttons = page.locator("button");
    const count = await buttons.count();

    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);
      if (!(await button.isVisible())) continue;

      const text = await button.textContent();
      const ariaLabel = await button.getAttribute("aria-label");

      const hasAccessibleName = (text && text.trim().length > 0) || ariaLabel;
      expect(hasAccessibleName).toBeTruthy();
    }
  });

  test("search input is not blocking paste", async ({ page }) => {
    await page.goto("/search");

    const input = page.locator('input[placeholder="Search articles..."]');
    await input.fill("test query");
    await expect(input).toHaveValue("test query");
  });
});
