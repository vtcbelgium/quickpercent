# QuickPercent

A private, browser-only percentage and discount calculator. Vite, vanilla TypeScript and semantic HTML/CSS. No runtime dependencies, remote fonts, analytics, cookies, APIs or persistence.

## Develop

Requires Node.js 22.12+, 24.x, or 26+ and npm (matching Vitest's supported Node releases).

```sh
npm install
npm run dev
npm test
npm run typecheck
npm run build
```

`dist/` is the static production output. Nothing is deployed automatically. The app currently targets a site root; set Vite's `base` and adjust the favicon path for subdirectory hosting.

## Calculation policy

- Inputs accept a decimal comma or period, optional sign and whitespace around a number. No grouping separators or scientific notation. A single comma is always decimal (1,000 means 1).
- Inputs/results are bounded to ±1 trillion. Division by zero is explained rather than shown as infinity. Percentage change requires a positive baseline; its new value may be negative.
- Discount price must be nonnegative, discount 0–100%, optional tax 0–1,000%. Tax is applied after discount, using only the user-entered rate. Currency is an optional label, not a conversion.
- JavaScript floating-point arithmetic; intermediate results are not rounded. Display uses up to six decimals (two for money, including JPY for consistent price precision). Tiny values may display as zero. Not intended for accounting settlement.
- Share is explicit: the copied URL contains validated calculation inputs in the fragment. No URL update or network transmission occurs automatically. The recipient can read those values. Clipboard access requires a secure context; a failure is displayed.

## Release checklist

The page deliberately includes `noindex, nofollow` until publication is approved. Remove that only after approval. Set real canonical/OG URL and preview image only when a real hostname and assets are available; none are fabricated here. Test keyboard navigation, mobile sizes and clipboard behavior over HTTPS before publishing. No backend or hosting setup is included.

Tests cover formulas, negative/zero inputs, invalid parsing, range limits, discount/tax boundaries and display rounding.
