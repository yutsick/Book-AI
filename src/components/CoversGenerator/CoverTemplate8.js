import React, { useEffect, useRef, useState } from "react";
import { adjustFontSizeByWidth, adjustFontSizeByHeight } from "@/utils/fontSizeHelper";

const CoverTemplate8 = ({ type, data }) => {
  const { authorName, selectedTopic, selectedSubTopic, croppedImage } = data;

  const authorImageSrc =
    croppedImage instanceof File ? URL.createObjectURL(croppedImage) : croppedImage;

  const isMobile = () => /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

  const elements = {
    frontAuthor: { ref: useRef(null), maxFontSize: 26, maxWidth: 280, maxHeight: 40 },
    title: { ref: useRef(null), maxFontSize: 27, maxHeight: 80 },
    subTitle: { ref: useRef(null), maxFontSize: 20, maxHeight: 65 },
    spineTitle: { ref: useRef(null), maxFontSize: 28, maxWidth: 375 },
    spineAuthor: { ref: useRef(null), maxFontSize: 20, maxWidth: 220 },
  };

  const [fontSizes, setFontSizes] = useState({
    frontAuthor: 26,
    title: 27,
    subTitle: 20,
    spineTitle: 28,
    spineAuthor: 20,
  });

  useEffect(() => {
    const newFontSizes = {};
  
    Object.entries(elements).forEach(([key, { ref, maxFontSize, maxWidth, maxHeight }]) => {
      if (ref.current) {
        let fontSize = maxFontSize;
        if (maxWidth) {
          fontSize = adjustFontSizeByWidth(ref, fontSize, maxWidth);
        }
        if (maxHeight) {
          fontSize = adjustFontSizeByHeight(ref, fontSize, maxHeight);
        }
  
        newFontSizes[key] = fontSize;
      }
    });
  
    setFontSizes((prev) => ({ ...prev, ...newFontSizes }));
  }, [selectedTopic, selectedSubTopic, authorName]);
  
  return (
    <>
      {/* Front Cover */}
      {type === "front" && (
        <div className="w-[431px] h-[648px] bg-white p-3 mx-auto relative">
          <div
            className="relative h-full w-full flex flex-col items-center justify-between"
            style={{ backgroundImage: "url('/images/create-book/bg/bg8.png')" }}
          >
            {/* Heading */}
            <div className="w-full h-full flex items-end">
              <img
                src={authorImageSrc}
                alt={authorName || "Default Author"}
                className="w-full h-full max-h-[400px] object-cover block"
              />
            </div>
          </div>

          <div className="absolute w-full h-full top-0 left-0 flex flex-col justify-center items-center gap-4 px-8 text-center flex-1 text-black pt-8 pb-11">
            <div className="text-left text-[20px] h-full flex flex-col justify-between w-full">
              <div className="max-w-[300px] w-full pb-[70px] relative">
                <img src="/images/create-book/bg/title8.png" alt="" />
                <div className="max-w-[260px] font-degular absolute top-10 left-10">
                  
                  <div
                    ref={elements.title.ref}
                    className="font-black max-w-[200px]"
                    style={{
                      fontSize: `${fontSizes.title}px`,
                      lineHeight: `${fontSizes.title}px`,
                    }}
                  >
                    {selectedTopic || "Default Topic"}
                  </div>

                  <div
                    ref={elements.subTitle.ref}
                    className="mt-1 font-degular font-semibold max-w-[200px]"
                    style={{
                      fontSize: `${fontSizes.subTitle}px`,
                      lineHeight: `${fontSizes.subTitle * 0.9}px`,
                    }}
                  >
                    {selectedSubTopic || "Default Sub Topic"}
                  </div>

                </div>
              </div>

              <div
                className="h-[80px] flex items-center justify-center font-bold"
                style={{
                  backgroundImage: "url('/images/create-book/bg/author8.png')",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                }}
              >
                <div className=" rotate-[-3deg]">
                  
                  <div className=" text-black font-degular font-bold mt-3 "
                  ref={elements.frontAuthor.ref}
                  style={{ 
                    fontSize: `${fontSizes.frontAuthor}px`, 
                    lineHeight: `${fontSizes.frontAuthor}px`
                }}
                  >
                    {authorName || "Default Author"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Back Cover */}
      {type === "back" && (
        <div className="w-[431px] h-[648px] mx-auto flex flex-col items-center justify-between space-y-6 bg-cover bg-center bg-no-repeat bg-white">
          <img
            src={isMobile()
              ? "/images/create-book/bg/bgblack-back-mob.png"
              : "/images/create-book/bg/bg8-back.png"}
            alt="Back Cover"
          />
        </div>
      )}

      {/* Spine */}
      {type === "spine" && (
        <div className="h-[648px] flex justify-center relative">
          <div className="flex text-black font-black items-center h-[57px] w-[648px] px-4 bg-white justify-center absolute rotate-90 origin-top-left left-[calc(50%+28px)] gap-10 font-degular">
            
            <div className="flex pb-1 flex-col justify-center items-center text-[28px] leading-[28px] tracking-[0.01em] h-full">
              <div
                ref={elements.spineTitle.ref}
                className="whitespace-nowrap"
                style={{ fontSize: `${fontSizes.spineTitle}px` }}
              >
                {selectedTopic || "Default Topic"}
              </div>
            </div>

            <div className="flex flex-col justify-center items-center text-[20px] h-full">
              <div
                ref={elements.spineAuthor.ref}
                className="whitespace-nowrap"
                style={{ fontSize: `${fontSizes.spineAuthor}px` }}
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

export default CoverTemplate8;
