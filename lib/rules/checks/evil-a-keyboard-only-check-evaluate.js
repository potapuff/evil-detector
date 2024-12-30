import { getBaseData as baseDataImport } from './evil-base-check-evaluate.js';

let getBaseData = typeof window !== 'undefined' && window.axe && window.axe.commons.evil
  ? window.axe.commons.evil.getBaseData
  : baseDataImport;

/**
 * Evaluates if an element is hidden from mouse users but keyboard accessible
 * @param {HTMLElement} node - The element to check
 * @returns {Object} The check result
 */
export function keyboardOnlyEvaluate(node, virtualNode) {
  console.log(node, virtualNode);
  const data = getBaseData(node);
  console.log(data);
  // Element is hidden from mouse users if...
  const isHiddenFromMouse = (
    data.styling.hasPointerEventsNone || // pointer-events: none
    !data.visual.isVisible || // display: none, visibility: hidden, etc.
    data.styling.isOffscreen // positioned far off-screen
  );
  console.log(isHiddenFromMouse);
  // But still keyboard accessible if...
  const isKeyboardAccessible = (
    data.interaction.isKeyboardAccessible || // tabindex >= 0
    data.interaction.isClickable // <a>, <button>, etc.
  );
  console.log(isKeyboardAccessible);
  return {
    result: !(isHiddenFromMouse && isKeyboardAccessible),
    data: {
      hiddenFromMouse: isHiddenFromMouse,
      keyboardAccessible: isKeyboardAccessible
    }
  };
}