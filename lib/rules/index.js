import { readFileSync } from 'fs';
import { rollup } from 'rollup';

// Define evil checks
const EVIL_IDS = [
  'evil-a-keyboard-only',
  'evil-b-hidden-field',
  'evil-c-hidden-describedby',
  'evil-d-offscreen',
  'evil-e-aria-label-mismatch',
  'evil-f-transparent-overlay',
  'evil-g-small-font'
];

const rules = EVIL_IDS.map(id => 
  JSON.parse(readFileSync(`lib/rules/rules/${id}.json`))
);

// Get all unique check IDs from rules' arrays
const checkIds = rules.reduce((acc, rule) => {
  const arrays = ['all', 'none', 'any']
    .filter(key => Array.isArray(rule[key]))
    .map(key => rule[key]);
  
  const allChecks = [].concat(...arrays);
  return [...new Set([...acc, ...allChecks])];
}, []);


async function loadChecks() {
  const checks = [];
  
  for (const id of checkIds) {
    const check = JSON.parse(readFileSync(`lib/rules/checks/${id}.json`));
    const safeName = id.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
    // Bundle the evaluate file
    const bundle = await rollup({
      input: `lib/rules/checks/${id}-evaluate.js`,
      // Add any necessary rollup config here
    });
    
    const { output } = await bundle.generate({
      format: 'iife',
      name: safeName, // Using camelCase name instead of hyphenated
      extend: true // Allows extending existing variables
    });
    
    check.evaluateCode = output[0].code;
    check.evaluate = `function(a,b) {return window.${safeName}.${check.evaluate}(a,b); }`
    checks.push(check);
  }
  
  return checks;
}

const checks = await loadChecks();

if (process.env.NODE_ENV === 'development') {
  console.table({
    'Registered IDs': EVIL_IDS,
    'Loaded rules': rules.map(r => r.id),
    'Loaded checks': checks.map(c => c.id),
  });
}

export const EVIL_RULES = {
  ids: EVIL_IDS,
  rules,
  checks,
};