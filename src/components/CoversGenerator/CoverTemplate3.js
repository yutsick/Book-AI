import React, { useEffect, useRef, useState } from "react";

const CoverTemplate3 = ({ type, data }) => {
  const { authorName, selectedTopic, selectedSubTopic, croppedImage } = data;
  const authorImageSrc =
    croppedImage instanceof File ? URL.createObjectURL(croppedImage) : croppedImage;

    const spineTitleRef = useRef(null);
    const spineAuthorRef = useRef(null);

    const [spineTitleFontSize, setSpineTitleFontSize] = useState(36);
    const [spineAuthorFontSize, setSpineAuthorFontSize] = useState(20);

    const isMobile = () => {
      return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    };

    useEffect(() => {
      const calculateFontSize = (elementRef, maxFontSize, maxHeight, maxWidth = null) => {
        const element = elementRef.current;
        if (!element) return maxFontSize;
    
        let fontSize = maxFontSize;
        element.style.fontSize = `${fontSize}px`;
        element.style.whiteSpace = "nowrap"; // Важливо для перевірки ширини тексту
    
        while (
          (element.scrollHeight > maxHeight || (maxWidth && element.scrollWidth > maxWidth)) 
          && fontSize > 10
        ) {
          fontSize -= 1;
          element.style.fontSize = `${fontSize}px`;
        }
    
        element.style.whiteSpace = ""; // Скидання стилю після обчислення
        return fontSize;
      };
    
      // Перерахунок розміру шрифта для тайтлу та автора
      const newSpineTitleFontSize = calculateFontSize(spineTitleRef, 48, 40, 400);
      const newSpineAuthorFontSize = calculateFontSize(spineAuthorRef, 34, 40, 140);
    
      // Оновлення стану
      setSpineTitleFontSize(newSpineTitleFontSize);
      setSpineAuthorFontSize(newSpineAuthorFontSize);
    }, [selectedTopic, selectedSubTopic]);
    

    

  return (
    <>
      {type === "front" && (
        <div
          className="w-[431px] h-[648px] mx-auto flex flex-col items-center justify-between bg-cover bg-center bg-no-repeat font-caveat text-[#000082]"
          style={{ backgroundImage: "url('/images/create-book/bg/bg3.png')" }}
        >
          {/* Heading */}
          <div className=" flex flex-col gap-4 max-w-[75%] mx-auto ">
          <div>
            <div className="text-[44px] leading-[44px] font-bold t text-center mt-6 -rotate-1">
              {selectedTopic || "Default Topic"}
            </div>
          </div>

          {/* Subheading */}
          <div>
            <div className="text-[28px] leading-[28px]  text-center ">
              {selectedSubTopic || "Default Sub Topic"}
            </div>
          </div>
          </div>
          {/* Image with Text */}
          <div className="flex flex-col w-full flex-1 relative mt-10">
           <div className=" w-[300px] h-[360px] mx-auto shadow rotate-[-2deg] border-[3px] border-white bg-[#C6B360]">

           
            <img
              src={authorImageSrc}
              alt={authorName || "Default Author"}
              className="  w-full h-full object-cover block  relative"
            />
            </div>
             
              <div className="absolute top-[-10px] left-10 w-[85px]">
                <img src="images/create-book/bg/pag1.png" alt="" />
              </div>
              <div className="absolute top-[-45px] right-10 w-[115px]">
                <img src="images/create-book/bg/pag2.png" alt="" />
              </div>
            
            <div className="font-reenie text-[28px] mx-auto shadow max-w-[80%] bg-white h-[46px] w-full flex items-center justify-center rotate-[2deg] mt-[-30px]">
              {authorName || "Default Author"}
            </div>
          </div>
        </div>
      )}

      {type === "back" && (
        <div
          className="w-[431px] h-[648px] mx-auto flex flex-col items-center justify-between space-y-6 bg-cover bg-center bg-no-repeat bg-[#F9F6EB]">
          <img src={`${isMobile ? 
            "/images/create-book/bg/bg3-back-mob.png " : 
            "/images/create-book/bg/bg3-back.png"}`} 
            alt="Back Cover" />
        </div>
      )}

      {type === "spine" && (
   
        <div className="h-[648px] flex justify-center relative">
          <div
            className="p-2  h-[57px] bg-cover bg-center bg-no-repeat   flex items-center ] w-[648px] gap-10  justify-between absolute rotate-90 origin-top-left left-[calc(50%+28px)]"
            style={{ backgroundImage: "url('/images/create-book/bg/bg3-spine.png')" }}
          >
            <div className="w-full gap-4 flex items-center justify-between absolute font-bold font-caveat flex-1 text-[#000082]">

              <div 
              className="whitespace-nowrap font-bold  text-center pb-2 flex-1 "
              ref={spineTitleRef}
              style={{
                fontSize: `${spineTitleFontSize}px`,
                lineHeight: `${spineTitleFontSize}px`,
              }}
              >
                {selectedTopic || "Default Topic"}
              </div>



              <div className="pr-2  font-medium whitespace-nowrap font-reenie"
                ref={spineAuthorRef}
                style={{
                  fontSize: `${spineAuthorFontSize}px`,
                  lineHeight: `${spineAuthorFontSize}px`,
                }}
              >
                {authorName || "Default Author"}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CoverTemplate3;
