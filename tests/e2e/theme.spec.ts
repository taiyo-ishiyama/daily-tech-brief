import { test, expect } from "@playwright/test";

test.describe("Theme Toggle", () => {
  test("theme toggle button is visible", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(500);
    const themeButton = page.getByRole("button", { name: "Toggle theme" });
    await expect(themeButton).toBeVisible();
  });

  test("can toggle between light and dark mode", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(500);

    const html = page.locator("html");
    const themeButton = page.getByRole("button", { name: "Toggle theme" });

    const initialClass = await html.getAttribute("class");

    await themeButton.click();
    await page.waitForTimeout(300);

    const newClass = await html.getAttribute("class");
    expect(newClass).not.toBe(initialClass);
  });

  test("theme persists across navigation", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(500);

    const themeButton = page.getByRole("button", { name: "Toggle theme" });
    await themeButton.click();
    await page.waitForTimeout(300);

    const html = page.locator("html");
    const themeAfterToggle = await html.getAttribute("class");

    await page.goto("/topics");
    await page.waitForTimeout(500);

    const themeAfterNav = await html.getAttribute("class");
    expect(themeAfterNav).toBe(themeAfterToggle);
  });
});
