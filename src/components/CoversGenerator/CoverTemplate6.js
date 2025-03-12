import React, { useEffect, useRef, useState } from "react";
import useAdjustFontSizes from "@/hooks/useAdjustFontSizes";
import { generateBookBackCover } from "@/utils/coverGenerators/backGenerator";
const CoverTemplate6 = ({ type, data }) => {
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const { authorName, selectedTopic, authorImage, selectedSubTopic, croppedImage, praises } = data;

  const authorImageSrc =
    croppedImage instanceof File ? URL.createObjectURL(croppedImage) : croppedImage;

  const isMobile = () => /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

  const elements = {
    frontTitle: { ref: useRef(null), maxFontSize: 40, maxHeight: 80 },
    spineTitle: { ref: useRef(null), maxFontSize: 23, maxWidth: 380 },
    spineAuthor: { ref: useRef(null), maxFontSize: 23, maxWidth: 220 },
  };

  const [fontSizes, setFontSizes] = useState({
    frontTitle: 49,
    spineTitle: 23,
    spineAuthor: 23,
  });

    useAdjustFontSizes(elements, [selectedTopic, selectedSubTopic, authorName], setFontSizes);

  
  return (
    <>
      {/* Front Cover */}
      {type === "front" && (
        <div className="w-[431px] h-[648px] bg-[#FFA3BC] mx-auto flex flex-col items-center justify-between">
          {/* Heading */}
          <div className="w-full relative h-[405px]">
            <img
              src={authorImageSrc}
              alt={authorName || "Default Author"}
              className="w-full h-full object-cover block object-top"
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-4 bg-[#F0EADE] px-8 text-center flex-1 font-pacifico">
            {/* Title */}
            <div 
            ref={elements.frontTitle.ref}
            className=" text-[#0D453A]"
            style={{
              fontSize: `${elements.frontTitle.fontSize}px`,
              lineHeight: `${elements.frontTitle.lineHeight}px`,
            }}
            >
              {selectedTopic || "Default Topic"}
            </div>

            {/* Subheading */}
            <div>
              <div className="text-[20px] leading-[20px] font-medium font-degular text-[#F96E47]">
                {selectedSubTopic || "Default Sub Topic"}
              </div>
            </div>

            <div className="text-[#0D453A] flex flex-col items-center justify-center text-[20px] font-black font-degular">
              <img src="images/create-book/bg/wave-black.png" alt="" />
              <div className="mt-2">{authorName || "Default Author"}</div>
            </div>
          </div>
        </div>
      )}

      {/* Back Cover */}
      {type === "back" && (
        <div
          className="w-[431px] h-[648px] mx-auto flex flex-col items-center justify-between space-y-6 bg-cover bg-center bg-no-repeat text-[#0D453A] font-degular"
          style={{

            backgroundColor: "#F0EADE",
          }}
        >

          {praises ? (
            generateBookBackCover({ author: authorName, praises, metaColor: "#000",praisesColor: "#666", website: "www.booktailor.com"})
          ) : (
            <p>Loading testimonials...</p>
          )}
        </div>
      )}


      {/* Spine */}
      {type === "spine" && (
        <div className="h-[648px] flex justify-center relative">
          <div className="flex text-[#0D453A] items-center h-[57px] w-[648px] gap-2 pl-2 bg-[#FFA3BC] justify-between absolute rotate-90 origin-top-left left-[calc(50%+28px)] text-[23px]">

            <div className="whitespace-nowrap flex flex-1 flex-col justify-center items-center pb-2 font-pacifico">
              <div
                ref={elements.spineTitle.ref}
                style={{ fontSize: `${fontSizes.spineTitle}px` }}
              >
                {selectedTopic || "Default Topic"}
              </div>
            </div>

            <div className="flex font-black flex-col justify-center items-center font-degular h-full w-[243px] bg-[#F0EADE] p-2">
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

export default CoverTemplate6;
