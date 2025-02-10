import React, { useEffect, useRef, useState } from "react";
import { adjustFontSizeByHeight } from "@/utils/fontSizeHelper";
import { adjustFontSizeByWidth } from "@/utils/fontSizeHelper";

const CoverTemplate2 = ({ type, data }) => {
  const { authorName, selectedTopic, selectedSubTopic, croppedImage } = data;

  const authorImageSrc =
    croppedImage instanceof File ? URL.createObjectURL(croppedImage) : croppedImage;

  const isMobile = () => /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

  const elements = {
    title: { ref: useRef(null), maxFontSize: 50, maxHeight: 150 },
    subTitle: { ref: useRef(null), maxFontSize: 20, maxHeight: 60 },
    spineTitle: { ref: useRef(null), maxFontSize: 36, maxHeight: 50 },
    spineAuthor: { ref: useRef(null), maxFontSize: 20, maxWidth: 188 },
  };

  const [fontSizes, setFontSizes] = useState({
    title: 50,
    subTitle: 20,
    spineTitle: 36,
    spineAuthor: 20,
  });

  useEffect(() => {
    const newFontSizes = {};
    Object.entries(elements).forEach(([key, { ref, maxFontSize, maxHeight, maxWidth }]) => {
      if (maxWidth) {
        newFontSizes[key] = adjustFontSizeByWidth(ref, maxFontSize, maxWidth); 
      } else {
        newFontSizes[key] = adjustFontSizeByHeight(ref, maxFontSize, maxHeight);
      }
    });

    setFontSizes(newFontSizes);
  }, [selectedTopic, selectedSubTopic, authorName]);

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
            <div className="absolute top-[50px] text-[20px] leading-[26px] font-black text-white left-[36px]">
              {authorName || "Default Author"}
            </div>
          </div>

          <div className="flex flex-col h-full justify-center gap-1 bg-[#BB2621] px-8 flex-1">
            <div
              ref={elements.title.ref}
              className="font-black text-white mt-2"
              style={{ fontSize: `${fontSizes.title}px`, lineHeight: `${fontSizes.title}px` }}
            >
              {selectedTopic || "Default Topic"}
            </div>

            <div
              ref={elements.subTitle.ref}
              className="font-semibold text-white"
              style={{ fontSize: `${fontSizes.subTitle}px` }}
            >
              {selectedSubTopic || "Default Sub Topic"}
            </div>
          </div>
        </div>
      )}

      {type === "back" && (
        <div className="w-[431px] h-[648px] mx-auto flex items-center justify-between space-y-6 bg-black bg-cover bg-center bg-no-repeat">
          <img
            src={isMobile()
              ? "/images/create-book/bg/bgwhite-back-mob.png"
              : "/images/create-book/bg/bg2-back.png"}
            alt="Back Cover"
          />
        </div>
      )}

      {type === "spine" && (
        <div className="h-[648px] flex justify-center relative w-full">
          <div className="flex flex-1 items-center h-[57px] w-[648px] gap-10 pl-4 bg-black justify-between absolute rotate-90 origin-top-left left-[calc(50%+28px)] font-degular font-black">
            <div
              ref={elements.spineTitle.ref}
              className="text-white flex justify-center items-center text-[36px] font-black"
              style={{ fontSize: `${fontSizes.spineTitle}px`, lineHeight: `${fontSizes.spineTitle * 1.1}px` }}
            >
              {selectedTopic || "Default Topic"}
            </div>

            <div className="text-white flex items-center h-full w-[215px] bg-[#BB2621] px-4">
              <div
                ref={elements.spineAuthor.ref}
                className="whitespace-nowrap"
                style={{ fontSize: `${fontSizes.spineAuthor}px`, lineHeight: `${fontSizes.spineAuthor *0.9 }px` }}
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

export default CoverTemplate2;
