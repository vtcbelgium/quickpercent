// [HARVESTED TO OTHRYS-BLOCKS] target: blocks/math/percentage-engine/index.ts | date: 2026-11-05 | status: HARVEST_RETAIN
export const MAX = 1e12;
export function parseNumber(raw: string): number | null {
  const value = raw.trim();
  if (!/^[+-]?(?:\d+(?:[.,]\d*)?|[.,]\d+)$/.test(value)) return null;
  const number = Number(value.replace(',', '.'));
  return Number.isFinite(number) && Math.abs(number) <= MAX ? number : null;
}
export function checked(value: number): number {
  if (!Number.isFinite(value) || Math.abs(value) > MAX) throw new Error('Result is outside the supported range (±1 trillion).');
  return Object.is(value, -0) ? 0 : value;
}
export const percentOf = (percent: number, base: number) => checked((percent / 100) * base);
export function percentage(part: number, whole: number) {
  if (whole === 0) throw new Error('A percentage of zero is undefined. Enter a nonzero total.');
  return checked((part / whole) * 100);
}
export function change(original: number, next: number) {
  if (original <= 0) throw new Error('Use a positive original value to calculate an increase or decrease.');
  return checked(((next - original) / original) * 100);
}
export function discount(price: number, rate: number, tax = 0) {
  if (price < 0) throw new Error('The original price must be zero or positive.');
  if (rate < 0 || rate > 100) throw new Error('Discount must be between 0% and 100%.');
  if (tax < 0 || tax > 1000) throw new Error('Tax rate must be between 0% and 1,000%.');
  const saved = percentOf(rate, price);
  const subtotal = checked(price - saved);
  return { saved, subtotal, final: checked(subtotal * (1 + tax / 100)) };
}
export function format(value: number, digits = 6): string {
  return new Intl.NumberFormat('en', { maximumFractionDigits: digits }).format(value === 0 ? 0 : value);
}
