import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('home presents research and working systems without browser errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Empirical');
  await expect(page.getByRole('heading', { name: 'The question comes first.' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Inside the study' })).toHaveAttribute(
    'href',
    '/projects/readmission-prediction/',
  );
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
  expect(errors).toEqual([]);
});

test('research figure changes configuration and metric with fixed scales', async ({ page }) => {
  await page.goto('/projects/readmission-prediction/');
  const figure = page.locator('[data-results]');
  const ticks = await figure.locator('[data-tick]').allTextContents();
  await expect(figure.locator('[data-value]').first()).toHaveText('0.6391');
  await figure.getByRole('button', { name: 'After tuning' }).click();
  await expect(figure.locator('[data-value]').first()).toHaveText('0.6464');
  await expect(figure.getByRole('button', { name: 'After tuning' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  expect(await figure.locator('[data-tick]').allTextContents()).toEqual(ticks);
  await figure.getByRole('combobox', { name: 'Evaluation metric' }).selectOption('roc');
  await expect(figure.locator('[data-value]').first()).toHaveText('0.8026');
  await expect(figure.locator('[data-interpretation]')).toContainText('secondary metric');
  await figure.getByText('View all results & source').click();
  await expect(figure.getByRole('table')).toBeVisible();
});

test('project filters combine with search, reset, and handle no results', async ({ page }) => {
  await page.goto('/projects.html');
  await expect(page.locator('[data-project]:visible')).toHaveCount(11);
  await page.getByRole('button', { name: 'Research & evaluation', exact: true }).click();
  await expect(page.locator('[data-project]:visible')).toHaveCount(4);
  await page.getByRole('searchbox').fill('synthetic');
  await expect(page.locator('[data-project]:visible')).toHaveCount(1);
  await page.getByRole('searchbox').fill('no-such-project');
  await expect(
    page.getByRole('heading', { name: 'No projects match that combination.' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await expect(page.locator('[data-project]:visible')).toHaveCount(11);
});

test('navigation works at the current viewport', async ({ page, isMobile }) => {
  await page.goto('/');
  if (isMobile) {
    const menu = page.getByRole('button', { name: 'Menu' });
    await menu.click();
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await expect(menu).toBeFocused();
    await menu.click();
  }
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'Experience', exact: true })
    .click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('foundation in research');
  await expect(page.getByRole('link', { name: 'Download my résumé' })).toHaveAttribute(
    'href',
    '/assets/resume.pdf',
  );
});

for (const route of [
  '/',
  '/projects.html',
  '/about.html',
  '/experience.html',
  '/projects/readmission-prediction/',
  '/projects/multi-llm/',
  '/projects/chile-neoliberal-reforms/code.html',
  '/404.html',
]) {
  test(`accessible layout: ${route}`, async ({ page }) => {
    await page.goto(route);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);
    const a11y = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(
      a11y.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        elements: v.nodes.map((n) => n.target).slice(0, 5),
      })),
    ).toEqual([]);
  });
}

test('all content and result tables remain available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4390/projects.html');
  await expect(page.locator('[data-project]:visible')).toHaveCount(11);
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  await page.goto('http://127.0.0.1:4390/projects/readmission-prediction/');
  await page.getByText('View all results & source').click();
  await expect(page.getByRole('table')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'My contribution', exact: true })).toBeVisible();
  await context.close();
});
