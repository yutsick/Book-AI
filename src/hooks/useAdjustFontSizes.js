import { useEffect } from "react";
import { adjustFontSizeByWidth, adjustFontSizeByHeight } from "@/utils/fontSizeHelper";

const useAdjustFontSizes = (elements, dependencies, setFontSizes) => {
  useEffect(() => {
    const newFontSizes = {};

    // Спочатку визначаємо розмір тітлу
    const titleElement = elements.title;
    if (titleElement?.ref.current) {
      const titleSizes = [
        titleElement.maxWidth && adjustFontSizeByWidth(titleElement.ref, titleElement.maxFontSize, titleElement.maxWidth),
        titleElement.maxHeight && adjustFontSizeByHeight(titleElement.ref, titleElement.maxFontSize, titleElement.maxHeight),
      ].filter(Boolean);

      const { fontSize, lineHeight } = titleSizes.reduce((acc, curr) => ({
        fontSize: Math.min(acc.fontSize, curr.fontSize),
        lineHeight: Math.min(acc.lineHeight, curr.lineHeight),
      }), { fontSize: titleElement.maxFontSize, lineHeight: titleElement.maxFontSize });

      newFontSizes.title = { fontSize, lineHeight };
    }

    // Потім визначаємо розмір сабтітла
    const subTitleElement = elements.subTitle;
    if (subTitleElement?.ref.current) {
      const subTitleSizes = [
        subTitleElement.maxWidth && adjustFontSizeByWidth(subTitleElement.ref, subTitleElement.maxFontSize, subTitleElement.maxWidth),
        subTitleElement.maxHeight && adjustFontSizeByHeight(subTitleElement.ref, subTitleElement.maxFontSize, subTitleElement.maxHeight),
      ].filter(Boolean);

      let { fontSize, lineHeight } = subTitleSizes.reduce((acc, curr) => ({
        fontSize: Math.min(acc.fontSize, curr.fontSize),
        lineHeight: Math.min(acc.lineHeight, curr.lineHeight),
      }), { fontSize: subTitleElement.maxFontSize, lineHeight: subTitleElement.maxFontSize });

      // Якщо сабтітл більше або дорівнює тітлу, зменшуємо сабтітл
      if (fontSize >= newFontSizes.title.fontSize) {
        fontSize = newFontSizes.title.fontSize - 1;
      }

      newFontSizes.subTitle = { fontSize, lineHeight };
    }

    // Обробка решти елементів
    Object.entries(elements).forEach(([key, { ref, maxFontSize, maxWidth, maxHeight }]) => {
      if (!ref.current || key === "title" || key === "subTitle") return;

      const sizes = [
        maxWidth && adjustFontSizeByWidth(ref, maxFontSize, maxWidth),
        maxHeight && adjustFontSizeByHeight(ref, maxFontSize, maxHeight),
      ].filter(Boolean);

      const { fontSize, lineHeight } = sizes.reduce((acc, curr) => ({
        fontSize: Math.min(acc.fontSize, curr.fontSize),
        lineHeight: Math.min(acc.lineHeight, curr.lineHeight),
      }), { fontSize: maxFontSize, lineHeight: maxFontSize });

      newFontSizes[key] = { fontSize, lineHeight };
    });

    setFontSizes((prev) => ({ ...prev, ...newFontSizes }));
  }, dependencies);
};

export default useAdjustFontSizes;
