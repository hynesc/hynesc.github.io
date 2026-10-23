import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
const port = 4393;
const server = spawn(
  'python3',
  ['-m', 'http.server', String(port), '--bind', '127.0.0.1', '--directory', 'dist'],
  { stdio: 'ignore' },
);
let serverError;
server.on('error', (error) => {
  serverError = error;
});
let browser;
try {
  for (let i = 0; i < 40; i++) {
    if (serverError) throw serverError;
    if (server.exitCode !== null)
      throw new Error('Preview server failed to start. Check port 4393.');
    try {
      const res = await fetch(`http://127.0.0.1:${port}`);
      if (res.ok) break;
    } catch {}
    if (i === 39) throw new Error('Preview server did not become ready.');
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  await mkdir('.review', { recursive: true });
  browser = await chromium.launch();
  for (const [name, width, height, route] of [
    ['home-desktop', 1440, 1000, '/'],
    ['home-tablet', 820, 1100, '/'],
    ['home-mobile', 390, 844, '/'],
    ['case-study', 1440, 1000, '/projects/readmission-prediction/'],
    ['work-mobile', 390, 844, '/projects.html'],
    ['about-desktop', 1440, 1000, '/about.html'],
    ['about-mobile', 390, 844, '/about.html'],
  ]) {
    const page = await browser.newPage({
      viewport: { width, height },
      deviceScaleFactor: 1,
      reducedMotion: 'reduce',
    });
    await page.goto(`http://127.0.0.1:${port}${route}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    // Trigger lazy images before taking a full-page capture.
    await page.evaluate(async () => {
      for (const img of document.images) {
        img.loading = 'eager';
        try {
          await img.decode();
        } catch {}
      }
    });
    await page.screenshot({ path: `.review/${name}.png`, fullPage: true, animations: 'disabled' });
    if (name === 'home-desktop')
      await page.screenshot({ path: '.review/home-desktop-viewport.png', animations: 'disabled' });
    if (name === 'home-mobile')
      await page
        .locator('[data-results]')
        .screenshot({ path: '.review/figure-mobile.png', animations: 'disabled' });
    console.log(`Saved .review/${name}.png`);
    await page.close();
  }
} finally {
  if (browser) await browser.close();
  server.kill();
}
