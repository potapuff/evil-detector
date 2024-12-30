import { getBaseData } from './evil-base-check-evaluate.js';

export function transparentOverlayEvaluate(node) {
  const style = window.getComputedStyle(node);
  const baseData = getBaseData(node);
  
  const isTransparent = 
    parseFloat(style.opacity) === 0 ||
    style.backgroundColor === 'transparent';
    
  const isOverlay = 
    style.position === 'absolute' || 
    style.position === 'fixed';
    
  const isInteractive = baseData.interaction.isClickable;

  return {
    result: !(isTransparent && isOverlay && isInteractive),
    data: {
      isTransparent,
      isOverlay,
      isInteractive
    }
  };
}
