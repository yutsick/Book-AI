import React, { useEffect, useRef, useState } from "react";

import { generateBookBackCover } from "@/utils/coverGenerators/backGenerator";
import useAdjustFontSizes from "@/hooks/useAdjustFontSizes";

const CoverTemplate3 = ({ type, data, templatesAdjusted, templateId  }) => {

  const isTemplateAdjusted = templatesAdjusted?.includes(templateId);

  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const { authorName, selectedTopic, selectedSubTopic, croppedImage, praises } = data;

  const authorImageSrc =
    croppedImage instanceof File ? URL.createObjectURL(croppedImage) : croppedImage;

  const isMobile = () => /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

  const elements = {
    frontAuthor: { ref: useRef(null), maxFontSize: 26, maxHeight: 40,  maxWidth: 380},
    subTitle: { ref: useRef(null), maxFontSize: 20, maxHeight: 55},
    title: { ref: useRef(null), maxFontSize: 36, maxHeight: 60, maxWidth: 220 },
    spineTitle: { ref: useRef(null), maxFontSize: 28, maxWidth: 375 },
    spineAuthor: { ref: useRef(null), maxFontSize: 17, maxWidth: 220 },
  };

  const [fontSizes, setFontSizes] = useState({
    frontAuthor: 26,
    title: 36,
    subTitle:20,
    spineTitle: 28,
    spineAuthor: 17,
  });

  useAdjustFontSizes(elements, [selectedTopic, selectedSubTopic, authorName], setFontSizes);

  

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
                className={`w-full h-full  object-contain block object-top ${!isTemplateAdjusted ? "max-h-[420px]" : "max-h-[457px]"} `}
              />
            </div>
          </div>

          <div className="absolute w-full h-full top-0 left-0 flex flex-col justify-center items-center gap-4 px-8 text-center flex-1 text-black pt-8 pb-11">
            <div className="text-center text-[20px] h-full flex flex-col justify-between items-center w-full">
              <div className="max-w-[300px]  w-full pb-[70px] relative">
                <img src="/images/create-book/bg/title8.png" alt="" />
                <div className="max-w-[230px] -mt-3 gap-1 h-full font-degular absolute top-12 left-6 flex items-center w-full flex-col">

                  <div
                    ref={elements.title.ref}
                    className="font-black w-full max-w-[200px] ml-2 "
                    style={{
                      fontSize: `${elements.title.fontSize}px`,
                      lineHeight: `${elements.title.lineHeight}px`,
                    }}
                  >
                    {selectedTopic || "Default Topic"}
                  </div>
                  <div
                    ref={elements.subTitle.ref}
                    className="font-semibold font-degular max-w-[190px]  self-center"
                    style={{
                      fontSize: `${fontSizes.subTitle?.fontSize || 20}px`,
                      lineHeight: `${fontSizes.subTitle?.lineHeight || 24}px`,
                    }}
                  >
                    {selectedSubTopic || "Default Topic"}
                  </div>
                </div>
              </div>

              <div
                className="h-[80px] flex items-center justify-center font-bold min-w-[220px]"
                style={{
                  backgroundImage: "url('/images/create-book/bg/author8.png')",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                }}
              >
                <div className=" rotate-[-3deg]">

                  <div className=" text-black font-degular w-full font-bold mt-3 px-4 whitespace-nowrap"
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
        <div
          className="w-[431px] h-[648px] mx-auto flex flex-col items-center justify-between space-y-6 bg-cover bg-center bg-no-repeat bg-white text-black font-degular"

        >

          {praises ? (
            generateBookBackCover({ author: authorName, praises, metaColor: "#000", website: "www.booktailor.com" })
          ) : (
            <p>Loading testimonials...</p>
          )}
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

            <div className="flex flex-col justify-center items-center  h-full">
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

export default CoverTemplate3;
