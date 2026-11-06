// Sovereign Theme Controller — Dieter Rams / Linear Minimal Design System

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'othrys-theme';

export function getPreferredTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'oled' || stored === 'dark') return 'dark';
    if (stored === 'paper' || stored === 'light') return 'light';
  } catch {
    // Storage access restricted in sandboxed iframes
  }

  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  return 'dark';
}

export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage access restricted
  }
}

export function toggleTheme(): Theme {
  const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  const next: Theme = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  return next;
}

export function initThemeController(buttonId = 'theme-toggle'): void {
  const current = getPreferredTheme();
  applyTheme(current);

  const btn = document.getElementById(buttonId);
  if (!btn) return;

  btn.addEventListener('click', () => {
    const next = toggleTheme();
    btn.setAttribute('aria-label', `Switch to ${next === 'dark' ? 'light' : 'dark'} mode`);
  });
}
