import { useEffect } from "react";
import { adjustFontSizeByWidth, adjustFontSizeByHeight } from "@/utils/fontSizeHelper";

const useAdjustFontSizes = (elements, dependencies, setFontSizes) => {
  useEffect(() => {
    const newFontSizes = {};

    Object.entries(elements).forEach(([key, { ref, maxFontSize, maxWidth, maxHeight }]) => {
      if (!ref.current) return;

      const sizes = [
        maxWidth && adjustFontSizeByWidth(ref, maxFontSize, maxWidth),
        maxHeight && adjustFontSizeByHeight(ref, maxFontSize, maxHeight),
      ].filter(Boolean);

      const { fontSize, lineHeight } = sizes.reduce((acc, curr) => ({
        fontSize: Math.max(acc.fontSize, curr.fontSize),
        lineHeight: Math.max(acc.lineHeight, curr.lineHeight),
      }), { fontSize: maxFontSize, lineHeight: maxFontSize });

      newFontSizes[key] = { fontSize, lineHeight };
    });

    setFontSizes((prev) => ({ ...prev, ...newFontSizes }));
  }, dependencies);
};

export default useAdjustFontSizes;
