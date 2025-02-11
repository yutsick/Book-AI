import React, { useRef, useState, useEffect } from "react";
import { adjustFontSizeByW, adjustFontSizeByWidth } from "@/utils/fontSizeHelper";

const CoverTemplate1 = ({ type, data }) => {

  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const { authorName, selectedTopic, authorImage, selectedSubTopic, croppedImage } = data;
  
  const authorRef = useRef(null);
  const [authorFontSize, setAuthorFontSize] = useState(21); 

  useEffect(() => {
    if (type === "spine") {
      const newFontSize = adjustFontSizeByWidth(authorRef, 21, 150); 
      setAuthorFontSize(newFontSize);
    }
  }, [authorName, type]);

  const authorImageSrc =
    croppedImage instanceof File ? URL.createObjectURL(croppedImage) : croppedImage;

  const isMobile = () => {
    return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  };

  return (
    <>
      {type === "front" && (
        <div
          className="w-[431px] h-[648px] mx-auto flex flex-col items-center justify-between bg-cover bg-center bg-no-repeat font-anton "
          style={{ backgroundImage: "url('/images/create-book/bg/bg1-front.png')" }}
        >
          <div className="flex mt-8 flex-col gap-4 max-w-[360px] mx-auto">
            <div>
              <div className="tracking-[0.01em] text-[33px] leading-[36px] text-[#F96E47] text-center mt-4 uppercase">
                {selectedTopic || "Default Topic"}
              </div>
            </div>

            <div>
              <div className="uppercase tracking-[0.03em] text-[19px] text-center text-white font-anton">
                {selectedSubTopic || "Default Sub Topic"}
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full flex-1 justify-end">
            <img
              src={authorImageSrc}
              alt={authorName || "Default Author"}
              className=" max-h-[340px] object-cover block"
            />
            <div className="text-[28px] bg-white h-[80px] w-full flex items-center justify-center text-[#14465F] font-anton">
              {authorName || "Default Author"}
            </div>
          </div>
        </div>
      )}

      {type === "back" && (
        <div
        className="w-[431px] h-[648px] mx-auto flex flex-col items-center justify-between space-y-6 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/create-book/bg/bg1-back.png')" }}
      >
        <img src={isMobile() ? 
          "/images/create-book/bg/bg1-back-mob.png" : 
          "/images/create-book/bg/bg1-back-text.png"} 
          alt="Back Cover" 
          className="w-full h-full"/>
      </div>
      
      )}

      {type === "spine" && (
        <div className="h-[648px] flex justify-center relative">
          <div
            className="pl-14 pr-4 h-[57px] bg-cover bg-center bg-no-repeat flex items-center w-[648px] gap-10 justify-between absolute rotate-90 origin-top-left left-[calc(50%+28px)]"
            style={{ backgroundImage: "url('/images/create-book/bg/bg1-spine.png')" }}
          >
            <div className="text-white px-2 flex items-center justify-between text-[18px] leading-[22px] tracking-[0.01em] font-anton flex-1">
              <div className="uppercase whitespace-nowrap">
                {selectedTopic || "Default Topic"}
              </div>
              <div
                ref={authorRef}
                className="text-[#14465F] whitespace-nowrap font-anton"
                style={{ fontSize: `${authorFontSize}px` }}
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

export default CoverTemplate1;
