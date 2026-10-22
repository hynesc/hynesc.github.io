import lighthouse from 'lighthouse';
import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
const server = spawn(
  'python3',
  ['-m', 'http.server', '4394', '--bind', '127.0.0.1', '--directory', 'dist'],
  { stdio: 'ignore' },
);
let browser;
try {
  for (let i = 0; i < 40; i++) {
    if (server.exitCode !== null) throw new Error('Audit server failed to start on port 4394.');
    try {
      if ((await fetch('http://127.0.0.1:4394')).ok) break;
    } catch {}
    if (i === 39) throw new Error('Audit server did not start.');
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  await mkdir('.review', { recursive: true });
  browser = await chromium.launch({ args: ['--remote-debugging-port=9226'] });
  for (const [name, route] of [
    ['home', '/'],
    ['case', '/projects/readmission-prediction/'],
  ]) {
    const result = await lighthouse('http://127.0.0.1:4394' + route, {
      port: 9226,
      output: 'json',
      logLevel: 'error',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    });
    if (result.lhr.runtimeError) throw new Error(result.lhr.runtimeError.message);
    await writeFile(`.review/lighthouse-${name}.json`, result.report);
    console.log(
      name,
      JSON.stringify(
        Object.fromEntries(
          Object.entries(result.lhr.categories).map(([key, value]) => [
            key,
            Math.round(value.score * 100),
          ]),
        ),
      ),
    );
    console.log(
      'LCP',
      result.lhr.audits['largest-contentful-paint'].displayValue,
      'CLS',
      result.lhr.audits['cumulative-layout-shift'].displayValue,
    );
    if (
      result.lhr.categories.performance.score < 0.9 ||
      result.lhr.categories.accessibility.score < 0.95
    )
      process.exitCode = 1;
  }
} finally {
  if (browser) await browser.close();
  server.kill();
}
