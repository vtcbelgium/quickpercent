import './style.css';
import { parseNumber, percentOf, percentage, change, discount, format } from './math';
import { initThemeController } from './theme';
import { showToast } from './toast';

const modes = ['Percentage of', 'What percentage?', 'Percentage change', 'Shopping discount'];
let mode = 0;
let copyText = '';

const form = document.querySelector<HTMLFormElement>('#inputs')!;
const answer = document.querySelector<HTMLDivElement>('#answer')!;
const formula = document.querySelector<HTMLDivElement>('#formula')!;
const copyBtn = document.querySelector<HTMLButtonElement>('#copy')!;
const shareBtn = document.querySelector<HTMLButtonElement>('#share')!;
const feedback = document.querySelector<HTMLParagraphElement>('#feedback')!;

const field = (id: string, label: string, placeholder: string, suffix = '') => `
  <div class="field-group">
    <label class="field-label" for="${id}">${label}</label>
    <div class="input-box">
      <input id="${id}" name="${id}" type="text" inputmode="decimal" autocomplete="off" spellcheck="false" placeholder="${placeholder}" aria-describedby="input-help">
      ${suffix ? `<span class="input-suffix">${suffix}</span>` : ''}
    </div>
  </div>
`;

function render(values?: string[]) {
  const labels = [
    ['Percentage', 'Of this number'],
    ['This number', 'Out of this total'],
    ['Original value', 'New value'],
    ['Original price', 'Discount']
  ][mode];

  form.innerHTML = `
    <p class="input-heading">${[
      'Find a percentage of any number.',
      'Put a number in perspective.',
      'See how much things changed.',
      'Know a good deal when you see one.'
    ][mode]}</p>
    ${field('a', labels[0], mode === 0 ? '15' : '80', mode === 0 ? '%' : '')}
    ${field('b', labels[1], mode === 3 ? '25' : '200', mode === 3 ? '%' : '')}
    ${mode === 3 ? `
      <div class="options-row">
        <div class="field-group">
          <label class="field-label" for="currency">Display currency</label>
          <select id="currency">
            <option value="">No currency</option>
            ${['USD ($)', 'EUR (€)', 'GBP (£)', 'CAD ($)', 'AUD ($)', 'JPY (¥)', 'INR (₹)', 'CHF (Fr)'].map(c => `<option value="${c.split(' ')[0]}">${c}</option>`).join('')}
          </select>
        </div>
        ${field('tax', 'Tax / VAT (optional)', '0', '%')}
      </div>
    ` : ''}
    <p id="input-help" class="input-help">${
      mode === 2 ? 'Original value must be positive.' :
      mode === 3 ? 'Discount: 0–100%. Tax is added after discount.' :
      'Numbers up to ±1 trillion. Use . or , for decimals.'
    }</p>
    <button class="reset-btn" type="reset">Clear inputs ↺</button>
  `;

  if (values) {
    ['a', 'b', 'tax', 'currency'].forEach((id, i) => {
      const el = form.querySelector<HTMLInputElement | HTMLSelectElement>('#' + id);
      if (el) el.value = values[i] || '';
    });
  }

  document.querySelectorAll<HTMLButtonElement>('[data-mode]').forEach((button, i) => {
    button.setAttribute('aria-pressed', String(i === mode));
  });

  update();
}

function update() {
  if (feedback) feedback.textContent = '';
  copyText = '';
  if (copyBtn) copyBtn.disabled = true;
  if (shareBtn) shareBtn.disabled = true;

  const aEl = form.querySelector<HTMLInputElement>('#a');
  const bEl = form.querySelector<HTMLInputElement>('#b');
  if (!aEl || !bEl) return;

  const a = parseNumber(aEl.value);
  const b = parseNumber(bEl.value);

  aEl.setAttribute('aria-invalid', String(aEl.value.trim() !== '' && a === null));
  bEl.setAttribute('aria-invalid', String(bEl.value.trim() !== '' && b === null));
  formula.textContent = '';

  if (!aEl.value.trim() || !bEl.value.trim()) {
    answer.textContent = 'Ready when you are.';
    answer.className = 'answer-display waiting';
    formula.textContent = 'Enter numbers above to see the calculation breakdown and formula.';
    return;
  }

  try {
    if (a === null || b === null) {
      throw new Error('Enter valid numbers up to ±1 trillion. Use one decimal separator (. or ,) and no thousands separators.');
    }

    let result = '';
    let explanation = '';

    if (mode === 0) {
      result = format(percentOf(a, b));
      explanation = `${format(a)}% of ${format(b)} = (${format(a)} ÷ 100) × ${format(b)} = ${result}`;
    } else if (mode === 1) {
      result = `${format(percentage(a, b))}%`;
      explanation = `${format(a)} out of ${format(b)} = (${format(a)} ÷ ${format(b)}) × 100 = ${result}`;
    } else if (mode === 2) {
      const n = change(a, b);
      result = `${n >= 0 ? '+' : ''}${format(n)}%`;
      explanation = `${n > 0 ? 'Increase' : n < 0 ? 'Decrease' : 'No change'}: ((${format(b)} − ${format(a)}) ÷ ${format(a)}) × 100 = ${result}`;
    } else if (mode === 3) {
      const taxEl = form.querySelector<HTMLInputElement>('#tax');
      const tax = taxEl && taxEl.value.trim() ? parseNumber(taxEl.value) : 0;
      if (taxEl) taxEl.setAttribute('aria-invalid', String(tax === null));
      if (tax === null) throw new Error('Enter a valid optional tax rate (0–1000%).');

      const currencyEl = form.querySelector<HTMLSelectElement>('#currency');
      const currency = currencyEl?.value || '';
      const money = (n: number) => currency ? `${currency} ${format(n, 2)}` : format(n, 2);

      const d = discount(a, b, tax);
      result = money(d.final);
      explanation = `Original: ${money(a)} · You save: ${money(d.saved)} (${format(b)}% off) · Subtotal: ${money(d.subtotal)}${tax ? ` · Tax (${format(tax)}%): +${money(d.final - d.subtotal)}` : ''}`;
    }

    answer.className = 'answer-display';
    answer.textContent = result;
    formula.textContent = explanation;

    copyText = `${modes[mode]}: ${result}\nFormula: ${explanation}\nCalculated with QuickPercent (https://quickpercent.othrys.be/)`;
    if (copyBtn) copyBtn.disabled = false;
    if (shareBtn) shareBtn.disabled = false;
  } catch (error) {
    answer.className = 'answer-display error';
    answer.textContent = (error as Error).message;
    formula.textContent = 'Correct the inputs above to proceed.';
  }
}

form.addEventListener('submit', (e) => e.preventDefault());
form.addEventListener('input', update);
form.addEventListener('change', update);
form.addEventListener('reset', () => {
  history.replaceState(null, '', location.pathname + location.search);
  setTimeout(update, 0);
  showToast('Inputs cleared');
});

// Mode Tabs
document.querySelectorAll<HTMLButtonElement>('[data-mode]').forEach((button) => {
  button.addEventListener('click', () => {
    mode = Number(button.dataset.mode);
    render();
  });
});

// Preset Example Cards
document.querySelectorAll<HTMLButtonElement>('[data-example]').forEach((button) => {
  button.addEventListener('click', () => {
    mode = Number(button.dataset.example);
    const val1 = button.dataset.val1 || '';
    const val2 = button.dataset.val2 || '';
    render([val1, val2]);
    document.querySelector('#calculator')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    form.querySelector('input')?.focus({ preventScroll: true });
    showToast(`Loaded ${button.querySelector('strong')?.textContent || 'example'}`);
  });
});

// Footer Mode Links
document.querySelectorAll<HTMLAnchorElement>('[data-mode-link]').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    mode = Number(link.dataset.modeLink);
    render();
    document.querySelector('#calculator')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Footer Preset Links
document.querySelectorAll<HTMLAnchorElement>('[data-preset-link]').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const presetIdx = Number(link.dataset.presetLink);
    const presetPresets = [
      { mode: 0, vals: ['15', '200'] },
      { mode: 2, vals: ['80', '100'] },
      { mode: 3, vals: ['80', '25'] },
      { mode: 1, vals: ['35', '140'] },
    ][presetIdx] || { mode: 0, vals: ['15', '200'] };
    mode = presetPresets.mode;
    render(presetPresets.vals);
    document.querySelector('#calculator')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    showToast('Loaded calculation preset');
  });
});

async function writeClipboard(value: string, message: string) {
  try {
    await navigator.clipboard.writeText(value);
    showToast(message);
    if (feedback) feedback.textContent = message;
  } catch {
    showToast('Clipboard unavailable. Select text directly.');
    if (feedback) feedback.textContent = 'Clipboard unavailable. Select text directly.';
  }
}

copyBtn?.addEventListener('click', () => {
  void writeClipboard(copyText, 'Result and formula copied to clipboard!');
});

shareBtn?.addEventListener('click', () => {
  const params = new URLSearchParams({ mode: String(mode) });
  new FormData(form).forEach((value, key) => params.set(key, String(value)));
  const url = new URL(location.href);
  url.hash = params.toString();
  void writeClipboard(url.href, 'Shareable link copied to clipboard!');
});

function loadHash() {
  const hashParams = new URLSearchParams(location.hash.slice(1));
  const searchParams = new URLSearchParams(location.search);
  const p = hashParams.has('mode') ? hashParams : searchParams;
  const m = p.get('mode');
  if (m !== null && /^[0-3]$/.test(m)) {
    mode = Number(m);
    render(['a', 'b', 'tax', 'currency'].map((key) => (p.get(key) || '').slice(0, 40)));
  } else {
    render();
  }
}

window.addEventListener('hashchange', () => {
  if (new URLSearchParams(location.hash.slice(1)).has('mode')) loadHash();
});

// Boot Controller
initThemeController('theme-toggle');
loadHash();
