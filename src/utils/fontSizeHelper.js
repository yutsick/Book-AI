export const adjustFontSizeByHeight = (elementRef, maxFontSize, maxHeight, minFontSize = 10) => {
  const element = elementRef.current;

  if (!element) return { fontSize: maxFontSize, lineHeight: getLineHeight(maxFontSize) };

  let fontSize = maxFontSize;
  element.style.fontSize = `${fontSize}px`;
  element.style.lineHeight = `${getLineHeight(fontSize)}px`;

  setTimeout(() => {
    while (element.scrollHeight > maxHeight && fontSize > minFontSize) {
      console.log(elementRef + 'H:' + element.scrollHeight + ', MAX:' + maxHeight);
      
      fontSize -= 1;
      element.style.fontSize = `${fontSize}px`;
      element.style.lineHeight = `${getLineHeight(fontSize)}px`;
      console.log(element.scrollHeight, maxHeight, fontSize);
      

    }
  }, 100);

  return { fontSize, lineHeight: getLineHeight(fontSize) };
};


const getLineHeight = (fontSize) => {
  // if (fontSize > 28) return fontSize * 0.9;
  if (fontSize > 22) return fontSize * 1.1;
  return fontSize * 1.2;
};




export const adjustFontSizeByWidth = (elementRef, maxFontSize, maxWidth, shouldWrap = false, minFontSize = 10) => {
  const element = elementRef.current;


  if (!element) return { fontSize: maxFontSize, lineHeight: maxFontSize * 1.2 };

  if (element.offsetWidth === 0) {
    return { fontSize: maxFontSize, lineHeight: maxFontSize * 1.2 };
  }

  if (shouldWrap) {
    element.style.whiteSpace = "normal";
    element.style.wordBreak = "break-word";
  }

  let fontSize = maxFontSize;
  element.style.fontSize = `${fontSize}px`;
  element.style.lineHeight = `${getLineHeight(fontSize)}px`;

  setTimeout(() => {
    while (element.offsetWidth > maxWidth && fontSize > minFontSize) {

      fontSize -= 1;
      element.style.fontSize = `${fontSize}px`;
      element.style.lineHeight = `${getLineHeight(fontSize)}px`;

      element.offsetWidth;
    }
  }, 100);

  return { fontSize, lineHeight: getLineHeight(fontSize) };
};



