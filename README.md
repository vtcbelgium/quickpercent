# QuickPercent

[![Live Site](https://img.shields.io/badge/Live_Tool-quickpercent.othrys.be-0284c7?style=flat-square)](https://quickpercent.othrys.be)
[![Privacy](https://img.shields.io/badge/Privacy-100%25_Client--Side-16a34a?style=flat-square)](https://quickpercent.othrys.be)
[![Cookies](https://img.shields.io/badge/Cookies-0-blue?style=flat-square)](https://quickpercent.othrys.be)
[![WCAG AA](https://img.shields.io/badge/Accessibility-WCAG_AA-blueviolet?style=flat-square)](https://quickpercent.othrys.be)

> Fast, private, client-side client-side percentage change, margin and VAT calculator. Runs 100% in your browser with zero server uploads, zero cookies, and zero third-party tracking.

## Features
- **100% Client-Side:** Files and confidential data never leave your device.
- **Zero Cookies & Zero Trackers:** Closed-valve privacy architecture with 0 third-party telemetry scripts.
- **Keyboard Spotlight:** Jump to any of the 20 sovereign tools anytime by pressing <kbd>⌘K</kbd> or <kbd>Ctrl+K</kbd>.
- **PWA Ready:** Works offline on laptops, MacBooks, tablets, and mobile devices.

## Direct Web Access
Use the live tool instantly without installing anything:
[https://quickpercent.othrys.be](https://quickpercent.othrys.be)


# QuickPercent

A private, browser-only percentage and discount calculator. Vite, vanilla TypeScript and semantic HTML/CSS. No runtime dependencies, remote fonts, cookies, persistence, or third-party trackers (uses only cookieless first-party page-view counts via stats.othrys.be honoring Do Not Track / GPC, 90-day expiry).

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
