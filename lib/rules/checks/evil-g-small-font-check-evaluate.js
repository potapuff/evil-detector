export function smallFontSizeEvaluate(node) {
  const style = window.getComputedStyle(node);
  const fontSize = parseInt(style.fontSize);
  const hasContent = node.textContent.trim().length > 0;
  
  const isTooSmall = fontSize < 4 && hasContent;
  
  return {
    result: !isTooSmall,
    data: {
      fontSize,
      hasContent,
      isTooSmall
    }
  };
}
