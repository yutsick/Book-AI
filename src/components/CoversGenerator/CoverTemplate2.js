import React, { useEffect, useRef, useState } from "react";

const CoverTemplate2 = ({ type, data }) => {
  const { authorName, selectedTopic, selectedSubTopic,croppedImage } = data;

const authorImageSrc =
    croppedImage instanceof File ? URL.createObjectURL(croppedImage) : croppedImage;


  const titleRef = useRef(null);
  const subTitleRef = useRef(null);
  const spineTitleRef = useRef(null);


  const [titleFontSize, setTitleFontSize] = useState(50);
  const [subTitleFontSize, setSubTitleFontSize] = useState(20);
  const [spineTitleFontSize, setSpineTitleFontSize] = useState(36);

  useEffect(() => {

    const calculateFontSize = (elementRef, maxFontSize, maxHeight) => {
      const element = elementRef.current;
      if (!element) return maxFontSize;

    
      let fontSize = maxFontSize;
      element.style.fontSize = `${fontSize}px`;

     
      while (element.scrollHeight > maxHeight && fontSize > 10) {
        fontSize -= 1;
        element.style.fontSize = `${fontSize}px`;
      }

      return fontSize;
    };

  //  ref, minFontSize, maxHeight 
    const newTitleFontSize = calculateFontSize(titleRef, 50, 150); 
    const newSubTitleFontSize = calculateFontSize(subTitleRef, 20, 60); 
    const newSpineTitleFontSize = calculateFontSize(spineTitleRef, 36, 50); 

    setTitleFontSize(newTitleFontSize);
    setSubTitleFontSize(newSubTitleFontSize);
    setSpineTitleFontSize(newSpineTitleFontSize);
  }, [selectedTopic, selectedSubTopic]);

  return (
    <>

      {type === "front" && (
        <div className="w-[431px] h-[648px] bg-black mx-auto flex flex-col items-center justify-between bg-cover bg-center bg-no-repeat font-degular">

          <div className="w-full relative h-[433px]">
            <img
              src={authorImageSrc}
              alt={authorName || "Default Author"}
              className="w-full h-full object-cover block"
            />
            <div className="absolute top-[50px] text-[20px] leading-[26px] font-black font-degular left-[36px] text-white">
              {authorName || "Default Author"}
            </div>
          </div>

          <div className="flex flex-col h-full justify-cener gap-3 bg-[#BB2621] px-8 flex-1">
            <div
              ref={titleRef}
              className="font-black font-degular text-white mt-6"
              style={{
                fontSize: `${titleFontSize}px`,
                lineHeight: `${titleFontSize}px`,
              }}
            >
              {selectedTopic || "Default Topic"}
            </div>

            <div
              ref={subTitleRef}
              className="font-semibold text-white font-degular"
              style={{
                fontSize: `${subTitleFontSize}px`,
              }}
            >
              {selectedSubTopic || "Default Sub Topic"}
            </div>
          </div>
        </div>
      )}

      {type === "back" && (
        <div className="w-[431px] h-[648px] mx-auto flex flex-col items-center justify-between space-y-6 bg-cover bg-center bg-no-repeat">
          <img src="images/create-book/bg/bg2-back.png" alt="Back Cover" />
        </div>
      )}

      {type === "spine" && (
        <div className="h-[648px] flex justify-center relative">
          <div className="flex items-center h-[57px] w-[648px] gap-10 pl-2  bg-black justify-between absolute rotate-90 origin-top-left left-[calc(50%+28px)] font-degular font-black">
            <div className="text-white flex flex-col justify-center items-center text-[36px] font-black leading-[28px] font-degular">
              <div
              className="pb-1 pl-2"
                ref={spineTitleRef}
                style={{
                  fontSize: `${spineTitleFontSize}px`,
                  lineHeight: `${spineTitleFontSize*1.1}px`,
                }}
              >{selectedTopic || "Default Topic"}</div>
            </div>

            <div className="text-white flex flex-col justify-center items-start text-[20px] font-degular h-full w-[215px] bg-[#BB2621] px-4 ">
              <div>{authorName || "Default Author"}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CoverTemplate2;
