import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(__dirname, '..');
const IMAGE = 'https://quickpercent.othrys.be/og-image.svg';

describe('social image metadata', () => {
  const html = readFileSync(resolve(root, 'index.html'), 'utf8');

  it('ships the og-image.svg asset', () => {
    expect(existsSync(resolve(root, 'public/og-image.svg'))).toBe(true);
  });

  it('declares og:image and twitter:image pointing at the asset', () => {
    expect(html).toContain(`<meta property="og:image" content="${IMAGE}">`);
    expect(html).toContain(`<meta name="twitter:image" content="${IMAGE}">`);
    expect(html).toContain('<meta name="twitter:card" content="summary_large_image">');
  });
});
