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


export const adjustFontSizeByWidth = (elementRef, maxFontSize, maxWidth, shouldWrap = false, minFontSize = 10) => {
  const element = elementRef.current;
  if (!element) return maxFontSize;

  if (element.offsetWidth === 0) {
    return maxFontSize; 
  }

  // Якщо дозволено перенос, встановлюємо відповідні стилі
  if (shouldWrap) {
    element.style.whiteSpace = "normal";
    element.style.wordBreak = "break-word";
  } 

  let fontSize = maxFontSize;
  element.style.fontSize = `${fontSize}px`;

  // Зменшуємо шрифт, якщо текст все ще ширший за maxWidth
  while (element.offsetWidth > maxWidth && fontSize > minFontSize) {
    fontSize -= 1;
    element.style.fontSize = `${fontSize}px`;
    requestAnimationFrame(() => window.getComputedStyle(element).width);
  }

  return fontSize;
};


