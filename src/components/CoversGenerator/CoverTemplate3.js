import React, { useEffect, useRef, useState } from "react";
import { adjustFontSizeByWidth, adjustFontSizeByHeight } from "@/utils/fontSizeHelper";

const CoverTemplate3 = ({ type, data }) => {

  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const { authorName, selectedTopic, selectedSubTopic, croppedImage } = data;
  const authorImageSrc =
    croppedImage instanceof File ? URL.createObjectURL(croppedImage) : croppedImage;

  const isMobile = () => /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

  const elements = {
    spineTitle: { ref: useRef(null), maxFontSize: 44, maxWidth: 400 },
    spineAuthor: { ref: useRef(null), maxFontSize: 28, maxWidth: 250, maxHeight: 50 },
    frontAuthor: { ref: useRef(null), maxFontSize: 28, maxWidth: 320, maxHeight: 50 },
  };

  const [fontSizes, setFontSizes] = useState({
    spineTitle: 44,
    spineAuthor: 28,
    frontAuthor: 28,
  });

  useEffect(() => {
    const newFontSizes = {};
  
  
    Object.entries(elements).forEach(([key, { ref, maxFontSize, maxHeight }]) => {
      if (ref.current && maxHeight) {
        newFontSizes[key] = adjustFontSizeByHeight(ref, maxFontSize, maxHeight);
      }
    });
  
 
    Object.entries(elements).forEach(([key, { ref, maxFontSize, maxWidth }]) => {
      if (ref.current && maxWidth) {
        newFontSizes[key] = adjustFontSizeByWidth(
          ref,
          newFontSizes[key] || maxFontSize,
          maxWidth
        );
      }
    });
  
    setFontSizes((prev) => ({ ...prev, ...newFontSizes }));
  }, [authorName, selectedTopic]);
  


  
  return (
    <>
      {type === "front" && (
        <div
          className="w-[431px] h-[648px] mx-auto flex flex-col items-center justify-between bg-cover bg-center bg-no-repeat font-caveat text-[#000082]"
          style={{ backgroundImage: "url('/images/create-book/bg/bg3.png')" }}
        >
          <div className="flex flex-col gap-4 max-w-[75%] mx-auto">
            <div className="text-[44px] leading-[44px] font-bold text-center mt-6 -rotate-1">
              {selectedTopic || "Default Topic"}
            </div>
            <div className="text-[28px] leading-[28px] text-center">
              {selectedSubTopic || "Default Sub Topic"}
            </div>
          </div>

          <div className="flex flex-col w-full flex-1 relative mt-10">
            <div className="w-[300px] h-[360px] mx-auto shadow rotate-[-2deg] border-[3px] border-white bg-[#C6B360]">
              <img
                src={authorImageSrc}
                alt={authorName || "Default Author"}
                className="w-full h-full object-cover block"
              />
            </div>

            <div className=" mx-auto shadow max-w-[80%] bg-white h-[46px] w-full flex items-center justify-center rotate-[2deg] mt-[-30px] px-2">
              <div
                ref={elements.frontAuthor.ref}
                style={{ fontSize: `${fontSizes.frontAuthor}px` }}
                className="font-reenie"
              >
                {authorName || "Default Author"}
              </div>
            </div>
          </div>
        </div>
      )}

{type === "back" && (
  <div
    className="w-[431px] h-[648px] mx-auto flex flex-col items-center justify-between space-y-6 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: isIOS
        ? "url('/images/create-book/bg/bg3-back.png')" 
        : "none",
      backgroundColor: "#EEE8D9", 
    }}
  >
    {!isIOS && (
      <img
        src={isMobile()
          ? "/images/create-book/bg/bg3-back-mob.jpg"
          : "/images/create-book/bg/bg3-back.png"}
        alt="Back Cover"
      />
    )}
  </div>
)}


      {type === "spine" && (
        <div className="h-[648px] flex justify-center relative">
          <div
            className="p-2 h-[57px] bg-cover bg-center bg-no-repeat flex items-center w-[648px] gap-10 justify-between absolute rotate-90 origin-top-left left-[calc(50%+28px)] bg-[#EEE8D9]"
            style={{ backgroundImage: "url('/images/create-book/bg/bg3-spine.png')" }}
          >
            <div className="w-full flex items-center gap-4 justify-between font-bold font-caveat text-[#000082]">
              
              <div className="spine-title-container flex-1 flex justify-center">
                <div
                  ref={elements.spineTitle.ref}
                  className="whitespace-nowrap font-bold text-center pb-2"
                  style={{ fontSize: `${fontSizes.spineTitle}px` }}
                >
                  {selectedTopic || "Default Topic"}
                </div>
              </div>

              <div className="spine-author-container flex justify-end pr-2 w-[180px] text-center">
                <div
                  ref={elements.spineAuthor.ref}
                  className="font-medium font-reenie break-words"
                  style={{
                    fontSize: `${fontSizes.spineAuthor}px`,

                    lineHeight: "1.2",
                    overflow: "hidden",
                  }}
                >
                  {authorName || "Default Author"}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CoverTemplate3;
