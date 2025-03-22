import { useEffect } from "react";
import { adjustFontSizeByWidth, adjustFontSizeByHeight } from "@/utils/fontSizeHelper";

const useAdjustFontSizes = (elements, dependencies, setFontSizes) => {
  useEffect(() => {
    const adjustFontSizes = async () => {
      const newFontSizes = {};

      for (const [key, { ref, maxFontSize, maxWidth, maxHeight }] of Object.entries(elements)) {
        if (!ref.current) continue;

        const sizes = await Promise.all(
          [
            maxWidth && adjustFontSizeByWidth(ref, maxFontSize, maxWidth),
            maxHeight && adjustFontSizeByHeight(ref, maxFontSize, maxHeight),
          ].filter(Boolean)
        );

        const { fontSize, lineHeight } = sizes.reduce((acc, curr) => ({
          fontSize: Math.min(acc.fontSize, curr.fontSize),
          lineHeight: Math.max(acc.lineHeight, curr.lineHeight),
        }), { fontSize: maxFontSize, lineHeight: maxFontSize });

        newFontSizes[key] = { fontSize, lineHeight };

        const el = ref.current;
        el.style.fontSize = `${fontSize}px`;
        el.style.lineHeight = `${lineHeight}px`;
      }

      setFontSizes((prev) => ({ ...prev, ...newFontSizes }));
    };

    adjustFontSizes();
  }, dependencies);
};

export default useAdjustFontSizes;


