import { useEffect } from "react";
import { adjustFontSizeByWidth, adjustFontSizeByHeight } from "@/utils/fontSizeHelper";

const useAdjustFontSizes = (elements, dependencies, setFontSizes) => {
 
  
  useEffect(() => {
    const newFontSizes = {};
  
    Object.entries(elements).forEach(([key, { ref, maxFontSize, maxWidth, maxHeight }]) => {
      if (ref.current) {
        let fontSize = maxFontSize;
        let lineHeight = fontSize ;
  
        if (maxWidth) {
          ({ fontSize, lineHeight } = adjustFontSizeByWidth(ref, fontSize, maxWidth));
        }
        if (maxHeight) {

          ({ fontSize, lineHeight } =  adjustFontSizeByHeight(ref, fontSize, maxHeight));

          
        }
  
        newFontSizes[key] = { fontSize, lineHeight };
      }
    });
  
    setFontSizes((prev) => ({ ...prev, ...newFontSizes }));
  },dependencies);
};

export default useAdjustFontSizes;
