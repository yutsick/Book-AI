export const adjustFontSizeByHeight = (elementRef, maxFontSize, maxHeight, minFontSize = 10) => {
  const element = elementRef.current;
  
  if (!element) return { fontSize: maxFontSize, lineHeight: getLineHeight(maxFontSize) };

  let fontSize = maxFontSize;
  element.style.fontSize = `${fontSize}px`;
  element.style.lineHeight = `${getLineHeight(fontSize)}px`;

  while (element.scrollHeight > maxHeight && fontSize > minFontSize) {
    fontSize -= 1;
    element.style.fontSize = `${fontSize}px`;
    element.style.lineHeight = `${getLineHeight(fontSize)}px`;
  }

  return { fontSize, lineHeight: getLineHeight(fontSize) };
};

const getLineHeight = (fontSize) => {
  // if (fontSize > 28) return fontSize * 0.9;
  if (fontSize > 22) return fontSize * 1;
  return fontSize * 1.1;
};




export const adjustFontSizeByWidth = (elementRef, maxFontSize, maxWidth, shouldWrap = false, minFontSize = 10) => {
  const element = elementRef.current;
  if (!element) return maxFontSize;

  if (element.offsetWidth === 0) {
    return maxFontSize; 
  }

  if (shouldWrap) {
    element.style.whiteSpace = "normal";
    element.style.wordBreak = "break-word";
  } 

  let fontSize = maxFontSize;
  element.style.fontSize = `${fontSize}px`;

  while (element.offsetWidth > maxWidth && fontSize > minFontSize) {
    fontSize -= 1;
    element.style.fontSize = `${fontSize}px`;
    element.style.lineHeight = `${fontSize*0.9}px`;

    requestAnimationFrame(() => window.getComputedStyle(element).width);
  }

   return {fontSize: fontSize, lineHeight: fontSize * 0.9};
};


