import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("homepage loads successfully", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Daily Tech Brief/);
  });

  test("digest page loads successfully", async ({ page }) => {
    await page.goto("/digest");
    await expect(page).toHaveTitle(/Digests/);
    await expect(page.getByRole("heading", { name: "Daily Digests" })).toBeVisible();
  });

  test("topics page loads successfully", async ({ page }) => {
    await page.goto("/topics");
    await expect(page).toHaveTitle(/Topics/);
    await expect(page.getByRole("heading", { name: "Topics" })).toBeVisible();
  });

  test("search page loads successfully", async ({ page }) => {
    await page.goto("/search");
    await expect(page).toHaveTitle(/Search/);
    await expect(page.getByRole("heading", { name: "Search Archive" })).toBeVisible();
  });

  test("can navigate from home to digests", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Digests" }).first().click();
    await expect(page).toHaveURL(/\/digest/);
  });

  test("can navigate from home to topics", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Topics" }).first().click();
    await expect(page).toHaveURL(/\/topics/);
  });

  test("navbar links are visible on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/");

    await expect(page.getByRole("link", { name: "Today" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Digests" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Topics" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Search" }).first()).toBeVisible();
  });

  test("404 page shows for non-existing routes", async ({ page }) => {
    await page.goto("/this-page-does-not-exist");
    await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Back to home" })).toBeVisible();
  });
});
