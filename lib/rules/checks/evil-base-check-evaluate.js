let getComputedStyle = typeof window !== 'undefined' 
  ? window.getComputedStyle
  : () => ({});

export function getBaseData(node) {
 
  const style = getComputedStyle(node);
  const rect = node.getBoundingClientRect();

  return {
    visual: {
      isVisible: style.display !== 'none' && 
                 style.visibility !== 'hidden' && 
                 style.opacity !== '0',
      hasContent: node.textContent.trim().length > 0,
      isInViewport: rect.width > 0 && rect.height > 0,
      dimensions: { width: rect.width, height: rect.height }
    },
    accessibility: {
      ariaAttributes: {
        label: node.getAttribute('aria-label'),
        describedby: node.getAttribute('aria-describedby')
      },
      hasAriaLabel: node.hasAttribute('aria-label'),
      hasAriaDescribedby: node.hasAttribute('aria-describedby')
    },
    styling: {
      isClipped: style.clip === 'rect(0px, 0px, 0px, 0px)',
      hasZeroOpacity: style.opacity === '0',
      hasPointerEventsNone: style.pointerEvents === 'none',
      isOffscreen: style.position === 'absolute' && 
                   (Math.abs(parseInt(style.left)) > 1000 || 
                    Math.abs(parseInt(style.top)) > 1000)
    },
    interaction: {
      isClickable: node.hasAttribute('onclick') || 
                   node.tagName === 'BUTTON' || 
                   node.tagName === 'A',
      isKeyboardAccessible: node.tabIndex >= 0
    }
  };
}


