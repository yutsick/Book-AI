export const adjustFontSizeByHeight = (elementRef, maxFontSize, maxHeight, minFontSize = 10) => {

  const element = elementRef.current;
  if (!element) return maxFontSize;

  let fontSize = maxFontSize;
  element.style.fontSize = `${fontSize}px`;

  const adjustSize = () => {
    if (element.scrollHeight > maxHeight && fontSize > minFontSize) {
      
      fontSize -= 1;
      element.style.fontSize = `${fontSize}px`;

      setTimeout(adjustSize, 10); 
    }
  };

  setTimeout(adjustSize, 10); 

  return fontSize;
};


export const adjustFontSizeByWidth = (elementRef, maxFontSize, maxWidth, minFontSize = 10) => {
  const element = elementRef.current;
  if (!element) return maxFontSize;

  if (element.offsetWidth === 0) {
    return maxFontSize; 
  }

  let fontSize = maxFontSize;
  element.style.fontSize = `${fontSize}px`;

  while (element.offsetWidth> maxWidth && fontSize > minFontSize) {
    fontSize -= 1;
    element.style.fontSize = `${fontSize}px`;
    requestAnimationFrame(() => window.getComputedStyle(element).width);
  }

  return fontSize;
};

