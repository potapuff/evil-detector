import { getBaseData as baseDataImport } from './evil-base-check-evaluate.js';

let getBaseData = typeof window !== 'undefined' && window.axe && window.axe.commons.evil
  ? window.axe.commons.evil.getBaseData
  : baseDataImport;

export function hiddenFieldEvaluate(node) {
  const data = getBaseData(node);
  
  const isHiddenVisually = (
    !data.visual.isVisible ||
    data.styling.isOffscreen ||
    data.styling.isClipped
  );
  
  const isFormField = (
    node.tagName === 'INPUT' ||
    node.tagName === 'TEXTAREA' ||
    node.tagName === 'SELECT' ||
    node.getAttribute('role') === 'textbox'
  );

  return {
    result: !(isHiddenVisually && isFormField),
    data: {
      isHiddenVisually,
      isFormField
    }
  };
}
