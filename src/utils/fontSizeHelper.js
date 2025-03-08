export const adjustFontSizeByHeight = (elementRef, maxFontSize, maxHeight, minFontSize = 10) => {
  const element = elementRef.current;
  
  if (!element) return { fontSize: maxFontSize, lineHeight: maxFontSize * 0.9 };

  let fontSize = maxFontSize;
  element.style.fontSize = `${fontSize}px`;

  while (element.scrollHeight > maxHeight && fontSize > minFontSize) {
    fontSize -= 1;
    element.style.fontSize = `${fontSize}px`;
    element.style.lineHeight = `${fontSize * 0.9}px`;
  }


  return { fontSize, lineHeight: fontSize * 0.9 };
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
    element.style.lineHeight = `${fontSize*0.9}px`;

    requestAnimationFrame(() => window.getComputedStyle(element).width);
  }

   return {fontSize: fontSize, lineHeight: fontSize * 0.9};
};


