import { getBaseData } from './evil-base-check-evaluate.js';

export function offscreenElementEvaluate(node) {
  const baseData = getBaseData(node);
  const style = window.getComputedStyle(node);
  const rect = node.getBoundingClientRect();

  const isOffscreen = 
    (parseInt(style.left) < -1000 || parseInt(style.right) < -1000) ||
    (parseInt(style.top) < -1000 || parseInt(style.bottom) < -1000);

  const hasInteractiveContent = 
    node.querySelector('a, button, input') !== null || 
    baseData.interaction.isClickable;

  return {
    result: !(isOffscreen && hasInteractiveContent),
    data: {
      isOffscreen,
      hasInteractiveContent,
      position: {
        left: style.left,
        top: style.top
      }
    }
  };
}
