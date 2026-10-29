import './style.css';
import { parseNumber, percentOf, percentage, change, discount, format } from './math';

const modes = ['Percentage of', 'What percentage?', 'Percentage change', 'Shopping discount'];
let mode = 0;
let copyText = '';
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<header class="header wrap"><a class="brand othrys-brand" href="./"><span class="brand-main">Quick<strong>Percent</strong></span><small class="brand-signature">an OTHRYS utility</small></a><span class="privacy">Calculated in your browser</span></header>
<main class="wrap"><section class="intro"><p class="eyebrow">FREE · INSTANT · NO ACCOUNT</p><h1>Percentage calculator</h1><p>Calculate percentages, discounts, and price changes. See the formula behind each answer.</p></section>
<section id="calculator" class="calculator" aria-labelledby="calc-title"><div class="calc-top"><h2 id="calc-title">Choose a calculation</h2><span class="small">Instant results</span></div><div class="modes" role="group" aria-label="Calculation type">${modes.map((name, i) => `<button type="button" data-mode="${i}" aria-pressed="${i === 0}">${name}</button>`).join('')}</div><div class="workspace"><form id="inputs" novalidate></form><section class="result" aria-label="Calculation result"><p class="eyebrow" id="result-label">YOUR RESULT</p><div id="answer" role="status" aria-live="polite" aria-atomic="true"></div><div id="formula"></div><div class="actions"><button id="copy" type="button" disabled>Copy result <span aria-hidden="true">↗</span></button><button id="share" type="button" disabled>Copy share link</button></div><p id="feedback" class="feedback" role="status"></p></section></div><div class="calc-foot"><span>↳ &nbsp;Decimals? Use a period or comma.</span><span>Calculated locally. Never sent anywhere.</span></div></section>
<section class="examples" aria-labelledby="examples-title"><div><p class="eyebrow">EXAMPLES</p><h2 id="examples-title">Common calculations</h2></div><button data-example="0">Percentage of a number <strong>What’s 15% of 200? <span>→</span></strong></button><button data-example="2">Percentage change <strong>80 to 100: what changed? <span>→</span></strong></button><button data-example="3">Shopping discount <strong>25% off a price of 80 <span>→</span></strong></button></section>
<section class="faq" aria-labelledby="faq-title"><div><p class="eyebrow">HELP</p><h2 id="faq-title">Frequently asked questions</h2></div><div><details><summary>How are percentages calculated?</summary><p>A percentage is a fraction out of 100. To find X% of Y, multiply Y by X ÷ 100. To express X as a percentage of Y, divide X by Y and multiply by 100.</p></details><details><summary>How do discounts and tax work together?</summary><p>We subtract the discount first, then apply your optional tax rate to that discounted price. Enter the rate that applies to your purchase; this tool does not assume any local tax rules. Savings are shown before tax.</p></details><details><summary>What about zeros, negatives and rounding?</summary><p>Zero and negative numbers work in the first two calculators, except division by zero. Percentage change requires a positive original value; the new value may be negative. Prices cannot be negative. Inputs and results are limited to ±1 trillion. Results display up to six decimal places, or two for money, with rounding only at display time. Very small results may display as zero. This uses standard browser floating-point arithmetic, not accounting-grade decimal arithmetic.</p></details><details><summary>Are my calculations private?</summary><p>Yes. Calculations stay in your browser, with no analytics or storage. A share link includes the values in its URL fragment only when you choose to copy it. Anyone receiving that link can read those values, so avoid sharing sensitive numbers.</p></details><details><summary>Can I use decimal commas or another currency?</summary><p>Use either 12.5 or 12,5 for decimals. Thousands separators and scientific notation are not accepted. Discount results default to plain numbers; choose a currency label if useful. No currency conversion takes place.</p></details></div></section>
</main><footer class="wrap"><span class="brand">QuickPercent<span class="footer-dot">.</span></span><span>Free calculations in your browser.</span><span>an OTHRYS utility</span></footer>`;

const form = document.querySelector<HTMLFormElement>('#inputs')!;
const answer = document.querySelector<HTMLDivElement>('#answer')!;
const formula = document.querySelector<HTMLDivElement>('#formula')!;
const copy = document.querySelector<HTMLButtonElement>('#copy')!;
const share = document.querySelector<HTMLButtonElement>('#share')!;
const feedback = document.querySelector<HTMLParagraphElement>('#feedback')!;
const field = (id: string, label: string, placeholder: string, suffix = '') => `<label for="${id}">${label}</label><div class="input-box"><input id="${id}" name="${id}" type="text" inputmode="decimal" autocomplete="off" spellcheck="false" placeholder="${placeholder}" aria-describedby="input-help">${suffix ? `<span>${suffix}</span>` : ''}</div>`;
function render(values?: string[]) {
  const labels = [['Percentage', 'Of this number'], ['This number', 'Out of this total'], ['Original value', 'New value'], ['Original price', 'Discount']][mode];
  form.innerHTML = `<p class="input-heading">${['Find a percentage of any number.', 'Put a number in perspective.', 'See how much things changed.', 'Know a good deal when you see one.'][mode]}</p>${field('a', labels[0], mode === 0 ? '15' : '80', mode === 0 ? '%' : '')}${field('b', labels[1], mode === 3 ? '25' : '200', mode === 3 ? '%' : '')}${mode === 3 ? `<div class="options"><div><label for="currency">Display currency</label><select id="currency"><option value="">No currency</option>${['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'INR', 'CHF'].map(c => `<option>${c}</option>`).join('')}</select></div><div>${field('tax', 'Tax / VAT (optional)', '0', '%')}</div></div>` : ''}<p id="input-help" class="input-help">${mode === 2 ? 'Original value must be positive.' : mode === 3 ? 'Discount: 0–100%. Tax is added after discount.' : 'Numbers up to ±1 trillion. No thousands separators.'}</p><button class="reset" type="reset">Clear inputs</button>`;
  if (values) { ['a', 'b', 'tax', 'currency'].forEach((id, i) => { const el = form.querySelector<HTMLInputElement | HTMLSelectElement>('#' + id); if (el) el.value = values[i] || ''; }); }
  document.querySelectorAll<HTMLButtonElement>('[data-mode]').forEach((button, i) => button.setAttribute('aria-pressed', String(i === mode)));
  update();
}
function update() {
  feedback.textContent = ''; copyText = ''; copy.disabled = share.disabled = true;
  const aEl = form.querySelector<HTMLInputElement>('#a')!; const bEl = form.querySelector<HTMLInputElement>('#b')!;
  const a = parseNumber(aEl.value); const b = parseNumber(bEl.value);
  for (const el of [aEl, bEl]) el.setAttribute('aria-invalid', String(el.value.trim() !== '' && parseNumber(el.value) === null));
  formula.textContent = '';
  if (!aEl.value.trim() || !bEl.value.trim()) { answer.textContent = 'Ready when you are.'; answer.className = 'waiting'; formula.textContent = 'Enter two numbers to see your result and the formula.'; return; }
  try {
    if (a === null || b === null) throw new Error('Enter valid numbers up to ±1 trillion. Use one decimal separator and no thousands separators.');
    let result = ''; let explanation = '';
    if (mode === 0) { result = format(percentOf(a, b)); explanation = `${format(a)} ÷ 100 × ${format(b)} = ${result}`; }
    if (mode === 1) { result = `${format(percentage(a, b))}%`; explanation = `${format(a)} ÷ ${format(b)} × 100 = ${result}`; }
    if (mode === 2) { const n = change(a, b); result = `${format(Math.abs(n))}%`; explanation = `${n > 0 ? 'Increase' : n < 0 ? 'Decrease' : 'No change'} · (${format(b)} − ${format(a)}) ÷ ${format(a)} × 100 = ${format(n)}%`; }
    if (mode === 3) {
      const taxEl = form.querySelector<HTMLInputElement>('#tax')!; const tax = taxEl.value.trim() ? parseNumber(taxEl.value) : 0;
      taxEl.setAttribute('aria-invalid', String(tax === null)); if (tax === null) throw new Error('Enter a valid optional tax rate.');
      const currency = form.querySelector<HTMLSelectElement>('#currency')!.value;
      const money = (n: number) => currency ? `${currency} ${format(n, 2)}` : format(n, 2);
      const d = discount(a, b, tax); result = money(d.final);
      explanation = `You save ${money(d.saved)} before tax. ${format(a)} × (1 − ${format(b)} ÷ 100) = ${money(d.subtotal)}.${tax ? ` Then × (1 + ${format(tax)} ÷ 100) = ${result}.` : ''}`;
    }
    answer.className = 'number'; answer.textContent = result; formula.textContent = explanation;
    copyText = `${modes[mode]}: ${result}\n${explanation}`; copy.disabled = share.disabled = false;
  } catch (error) { answer.className = 'error'; answer.textContent = (error as Error).message; }
}
form.addEventListener('submit', e => e.preventDefault());
form.addEventListener('input', update); form.addEventListener('change', update);
form.addEventListener('reset', () => { history.replaceState(null, '', location.pathname + location.search); setTimeout(update, 0); });
document.querySelectorAll<HTMLButtonElement>('[data-mode]').forEach(button => button.addEventListener('click', () => { mode = Number(button.dataset.mode); render(); }));
document.querySelectorAll<HTMLButtonElement>('[data-example]').forEach(button => button.addEventListener('click', () => { mode = Number(button.dataset.example); render(mode === 0 ? ['15', '200'] : mode === 2 ? ['80', '100'] : ['80', '25']); document.querySelector('#calculator')!.scrollIntoView({ behavior: 'smooth', block: 'start' }); form.querySelector('input')!.focus({ preventScroll: true }); }));
async function writeClipboard(value: string, message: string) { try { await navigator.clipboard.writeText(value); feedback.textContent = message; } catch { feedback.textContent = 'Clipboard unavailable. Select and copy the result directly.'; } }
copy.addEventListener('click', () => void writeClipboard(copyText, 'Result copied.'));
share.addEventListener('click', () => { const params = new URLSearchParams({ mode: String(mode) }); new FormData(form).forEach((value, key) => params.set(key, String(value))); const url = new URL(location.href); url.hash = params.toString(); void writeClipboard(url.href, 'Link copied. It includes your entered values; share only with people you choose.'); });
function loadHash() { const p = new URLSearchParams(location.hash.slice(1)); const m = p.get('mode'); if (m !== null && /^[0-3]$/.test(m)) { mode = Number(m); render(['a', 'b', 'tax', 'currency'].map(key => (p.get(key) || '').slice(0, 40))); } else render(); }
window.addEventListener('hashchange', () => { if (new URLSearchParams(location.hash.slice(1)).has('mode')) loadHash(); }); loadHash();
