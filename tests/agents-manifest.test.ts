import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(__dirname, '..');
const manifests = ['agents.txt', '.well-known/agents.txt'];

function fieldsOf(text: string): Record<string, string> {
  const fields: Record<string, string> = {};
  for (const line of text.split(/\r?\n/)) {
    const separator = line.indexOf(':');
    if (separator === -1) continue;
    fields[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
  }
  return fields;
}

function expectValidManifest(path: string): void {
  expect(existsSync(path), `missing manifest: ${path}`).toBe(true);
  const text = readFileSync(path, 'utf8');
  const fields = fieldsOf(text);
  expect(fields.Name).toBe('QuickPercent');
  expect(fields.URL).toBe('https://quickpercent.othrys.be/');
  expect(fields.Description).toBeTruthy();
  expect(fields['LLMs-Txt']).toBe('https://quickpercent.othrys.be/llms.txt');
  expect(fields.Sitemap).toBe('https://quickpercent.othrys.be/sitemap.xml');
  expect(fields.Protocol).toBe('public-read-only');
  expect(fields.Privacy).toBe('zero-tracking-cookies, local-browser-execution, zero-cloud-uploads');
  expect(text.toLowerCase()).not.toMatch(/zero ads|never ads|ad[-\s]free forever/);
}

describe('AI discovery manifests (build sources)', () => {
  for (const manifest of manifests) {
    it(`public/${manifest} declares the required discovery fields`, () => {
      expectValidManifest(resolve(root, 'public', manifest));
    });
  }

  it('referenced llms.txt and sitemap.xml ship as public assets', () => {
    expect(existsSync(resolve(root, 'public/llms.txt'))).toBe(true);
    expect(existsSync(resolve(root, 'public/sitemap.xml'))).toBe(true);
  });
});

const dist = resolve(root, 'dist');
const hasBuildOutput = existsSync(dist);

describe('AI discovery manifests (build output)', () => {
  for (const manifest of manifests) {
    it.skipIf(!hasBuildOutput)(`dist/${manifest} is copied verbatim from public`, () => {
      expectValidManifest(resolve(dist, manifest));
      expect(readFileSync(resolve(dist, manifest), 'utf8')).toBe(
        readFileSync(resolve(root, 'public', manifest), 'utf8'),
      );
    });
  }
});
