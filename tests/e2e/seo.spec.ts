import { test, expect } from "@playwright/test";

test.describe("SEO", () => {
  test("homepage has correct meta tags", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Daily Tech Brief/);

    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute("content", /.+/);

    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute("content", /.+/);

    const ogType = page.locator('meta[property="og:type"]');
    await expect(ogType).toHaveAttribute("content", "website");

    const ogSiteName = page.locator('meta[property="og:site_name"]');
    await expect(ogSiteName).toHaveAttribute("content", "Daily Tech Brief");
  });

  test("sitemap.xml is accessible", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).toContain("<?xml");
    expect(body).toContain("<urlset");
  });

  test("robots.txt is accessible", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).toContain("User-Agent");
    expect(body).toContain("Sitemap");
  });

  test("search page has noindex", async ({ page }) => {
    await page.goto("/search");

    const robots = page.locator('meta[name="robots"]');
    const content = await robots.getAttribute("content");
    expect(content).toContain("noindex");
  });

  test("digest page has canonical URL", async ({ page }) => {
    await page.goto("/digest");

    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute("href", /\/digest/);
  });

  test("topics page has canonical URL", async ({ page }) => {
    await page.goto("/topics");

    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute("href", /\/topics/);
  });
});
