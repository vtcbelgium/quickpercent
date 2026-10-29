import { describe, it, expect } from 'vitest';
import { parseNumber, percentOf, percentage, change, discount, format, checked } from './math';
describe('input parsing', () => {
  it('accepts decimal separators, signs and whitespace', () => { expect(parseNumber(' 12,5 ')).toBe(12.5); expect(parseNumber('-.5')).toBe(-.5); expect(parseNumber('0')).toBe(0); });
  it('rejects ambiguous, missing, nonfinite and oversized values', () => { for (const value of ['', ' ', '1,000.5', '1 000', 'NaN', 'Infinity', '1e3', '1000000000001', '--2']) expect(parseNumber(value)).toBeNull(); });
});
describe('calculations', () => {
  it('calculates percent of a number including zero and negatives', () => { expect(percentOf(15, 200)).toBe(30); expect(percentOf(-10, 50)).toBe(-5); expect(percentOf(20, 0)).toBe(0); });
  it('calculates ratios and rejects division by zero', () => { expect(percentage(25, 200)).toBe(12.5); expect(percentage(-5, 10)).toBe(-50); expect(percentage(0, 10)).toBe(0); expect(() => percentage(1, 0)).toThrow(); });
  it('calculates increases and decreases with a positive baseline', () => { expect(change(80, 100)).toBe(25); expect(change(100, 80)).toBe(-20); expect(change(100, 100)).toBe(0); expect(change(100, -50)).toBe(-150); expect(() => change(0, 1)).toThrow(); expect(() => change(-1, 1)).toThrow(); });
  it('applies discounts before optional tax', () => { expect(discount(80, 25, 10)).toEqual({ saved: 20, subtotal: 60, final: 66 }); expect(discount(0, 0).final).toBe(0); expect(discount(80, 100).final).toBe(0); for (const args of [[-1, 5, 0], [10, -1, 0], [10, 101, 0], [10, 10, -1], [10, 10, 1001]]) expect(() => discount(...args as [number, number, number])).toThrow(); });
  it('bounds results and rounds only for display', () => { expect(() => checked(Infinity)).toThrow(); expect(() => percentOf(1e12, 1e12)).toThrow(); expect(format(1 / 3)).toBe('0.333333'); expect(format(1.005, 2)).toBe('1.01'); expect(format(-0)).toBe('0'); expect(checked(-0)).toBe(0); });
});
