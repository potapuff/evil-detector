import { calculateSimilarity } from '../utils/text-similarity.js';

export function ariaLabelMismatchEvaluate(node) {
  const ariaLabel = node.getAttribute('aria-label');
  const visibleText = node.textContent.trim();
  
  if (!ariaLabel || !visibleText) {
    return { result: true };
  }

  const similarity = calculateSimilarity(ariaLabel, visibleText);
  const THRESHOLD = 0.3;

  return {
    result: similarity >= THRESHOLD,
    data: {
      ariaLabel,
      visibleText,
      similarity
    }
  };
}

