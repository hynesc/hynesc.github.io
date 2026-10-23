import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('home presents research and working systems without browser errors', async ({
  page,
  isMobile,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Empirical');
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('.hero-name')).toHaveText('Christopher Hynes');
  await expect(page.locator('.hero-degree')).toContainText('Expected December 2026');
  const resume = page.locator('.hero-actions').getByRole('link', { name: 'Résumé' });
  await expect(resume).toHaveAttribute('href', '/assets/resume.pdf');
  await expect(resume).toBeInViewport();
  await expect(page.locator('.hero-experience')).toContainText('Research assistant, USC');
  await expect(page.locator('.hero-experience')).toContainText('Data analyst intern, GreyNoise');
  expect(
    await page.evaluate(
      () =>
        document.querySelector('.background-section')!.getBoundingClientRect().top <
        document.querySelector('.systems-section')!.getBoundingClientRect().top,
    ),
  ).toBe(true);

  await expect(
    page.getByRole('heading', { name: 'Selected research.', level: 2, exact: true }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'Inside the study' })).toHaveAttribute(
    'href',
    '/projects/readmission-prediction/',
  );
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
  await expect(
    page.locator('.ml-highlight').getByRole('link', { name: 'Explore the experiments' }),
  ).toHaveAttribute('href', '/projects/ml-experimentation/');
  // Keep the project title visible on desktop and primary actions visible on smaller phones.
  await expect(page.locator(isMobile ? '.hero-actions' : '.flagship-copy h3')).toBeInViewport({
    ratio: 1,
  });
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
  await expect(page.locator('[data-project]:visible')).toHaveCount(13);
  await page.getByRole('button', { name: 'Research & evaluation', exact: true }).click();
  await expect(page.locator('[data-project]:visible')).toHaveCount(5);
  await page.getByRole('searchbox').fill('synthetic');
  await expect(page.locator('[data-project]:visible')).toHaveCount(2);
  await page.getByRole('searchbox').fill('Python');
  await expect(
    page.getByRole('link', { name: 'Revisiting neural readmission models', exact: false }).first(),
  ).toBeVisible();
  await page.getByRole('searchbox').fill('no-such-project');
  await expect(
    page.getByRole('heading', { name: 'No projects match that combination.' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await expect(page.locator('[data-project]:visible')).toHaveCount(13);
  await page.getByRole('searchbox').fill('Docker');
  await expect(page.locator('[data-project]:visible')).toHaveCount(2);
  await page.getByRole('searchbox').fill('GreyNoise');
  await expect(page.locator('[data-project]:visible')).toHaveCount(1);
  await page.getByRole('searchbox').fill('FoodAI');
  await expect(page.locator('[data-project]:visible')).toHaveCount(1);
  await page.getByRole('link', { name: 'FoodAI', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('FoodAI');
  await expect(page.getByRole('link', { name: 'Source on GitHub' })).toHaveAttribute(
    'href',
    'https://github.com/hynesc/ai-recipes',
  );
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
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Experience &');
  await expect(page.getByRole('link', { name: 'Download my résumé' })).toHaveAttribute(
    'href',
    '/assets/resume.pdf',
  );
  if (isMobile) await page.getByRole('button', { name: 'Menu' }).click();
  const navigation = page.getByRole('navigation', { name: 'Main navigation' });
  await expect(navigation.getByRole('link', { name: 'Contact', exact: true })).toHaveAttribute(
    'href',
    'mailto:resume@chynes.org',
  );
  await navigation.getByRole('link', { name: 'Skills', exact: true }).click();
  await expect(page).toHaveURL(/experience\.html#skills$/);
  await expect(page.locator('#skills')).toBeInViewport();
});

for (const route of [
  '/',
  '/projects.html',
  '/about.html',
  '/experience.html',
  '/projects/readmission-prediction/',
  '/projects/multi-llm/',
  '/projects/ml-experimentation/',
  '/projects/foodai/',
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
  await expect(page.locator('[data-project]:visible')).toHaveCount(13);
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  await page.goto('http://127.0.0.1:4390/projects/readmission-prediction/');
  await page.getByText('View all results & source').click();
  await expect(page.getByRole('table')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'My contribution', exact: true })).toBeVisible();
  await context.close();
});

test('charts and navigation reflow on narrow screens and with enlarged text', async ({ page }) => {
  for (const { width, enlarged } of [
    { width: 320, enlarged: false },
    { width: 390, enlarged: true },
    { width: 820, enlarged: true },
  ]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of ['/', '/projects/readmission-prediction/']) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      if (enlarged) await page.addStyleTag({ content: 'html { font-size: 200%; }' });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
      const ticks = await page.locator('[data-tick]').evaluateAll((elements) =>
        elements.map((element) => {
          const { left, right } = element.getBoundingClientRect();
          return { left, right };
        }),
      );
      for (let i = 1; i < ticks.length; i++)
        expect(ticks[i].left).toBeGreaterThanOrEqual(ticks[i - 1].right);
      await expect(page.getByRole('button', { name: 'After tuning' })).toBeVisible();
    }
  }
});

// Exercise the actual production bundle on a mocked live origin. Never send test visits to GoatCounter.
async function mockPublishedSite(page: import('@playwright/test').Page) {
  await page.route('https://chynes.org/**', async (route) => {
    const path = new URL(route.request().url()).pathname;
    const response = await page.request.get(`http://127.0.0.1:4390${path}`);
    await route.fulfill({ response });
  });
  await page.route('https://gc.zgo.at/count.js', (route) =>
    route.fulfill({
      contentType: 'application/javascript',
      body: '// Analytics stub: no visits sent.',
    }),
  );
  await page.route('https://hynesc.goatcounter.com/**', (route) => route.abort());
}

test('production analytics sends only canonical page paths and referral origins', async ({
  page,
}) => {
  await mockPublishedSite(page);
  await page.goto('https://chynes.org/projects/readmission-prediction/?private=value#section', {
    referer: 'https://example.org/recruiting/private?token=value',
  });
  const script = page.locator('script[data-goatcounter]');
  await expect(script).toHaveAttribute('data-goatcounter', 'https://hynesc.goatcounter.com/count');
  expect(JSON.parse((await script.getAttribute('data-goatcounter-settings'))!)).toEqual({
    path: '/projects/readmission-prediction/',
    referrer: 'https://example.org',
    no_events: true,
  });
  await expect(page.locator('.analytics-note')).toContainText('Aggregate visitor counts');
});

test('local previews do not request third-party analytics', async ({ page }) => {
  const requests: string[] = [];
  page.on('request', (request) => {
    if (/gc\.zgo\.at|goatcounter\.com/.test(request.url())) requests.push(request.url());
  });
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('script[data-goatcounter]')).toHaveCount(0);
  expect(requests).toEqual([]);
});

for (const signal of ['doNotTrack', 'globalPrivacyControl']) {
  test(`analytics respects ${signal}`, async ({ page }) => {
    await mockPublishedSite(page);
    await page.addInitScript((name) => {
      Object.defineProperty(navigator, name, { value: name === 'doNotTrack' ? '1' : true });
    }, signal);
    const requests: string[] = [];
    page.on('request', (request) => {
      if (/gc\.zgo\.at|goatcounter\.com/.test(request.url())) requests.push(request.url());
    });
    await page.goto('https://chynes.org/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('script[data-goatcounter]')).toHaveCount(0);
    expect(requests).toEqual([]);
  });
}
