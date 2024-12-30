import { getBaseData } from './evil-base-check-evaluate.js';

export function hiddenAriaDescribedByEvaluate(node) {
  const baseData = getBaseData(node);
  const describedById = node.getAttribute('aria-describedby');
  
  if (!describedById) {
    return { result: true };
  }

  const describedByElement = document.getElementById(describedById);
  if (!describedByElement) {
    return { result: true };
  }

  const describedByData = getBaseData(describedByElement);
  const isDescriptionHidden = !describedByData.visual.isVisible;
  const hasDescriptionContent = describedByData.visual.hasContent;

  return {
    result: !(isDescriptionHidden && hasDescriptionContent),
    data: {
      isDescriptionHidden,
      hasDescriptionContent,
      describedById
    }
  };
}
