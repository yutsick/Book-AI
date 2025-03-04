import React, { useEffect, useRef, useState } from "react";
import { adjustFontSizeByWidth } from "@/utils/fontSizeHelper";
import { generateBookBackCover } from "@/utils/coverGenerators/backGenerator";
const CoverTemplate6 = ({ type, data }) => {
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const { authorName, selectedTopic, authorImage, selectedSubTopic, croppedImage, praises } = data;

  const authorImageSrc =
    croppedImage instanceof File ? URL.createObjectURL(croppedImage) : croppedImage;

  const isMobile = () => /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

  const elements = {
    spineTitle: { ref: useRef(null), maxFontSize: 23, maxWidth: 380 },
    spineAuthor: { ref: useRef(null), maxFontSize: 23, maxWidth: 220 },
  };

  const [fontSizes, setFontSizes] = useState({
    spineTitle: 23,
    spineAuthor: 23,
  });

  useEffect(() => {
    const newFontSizes = {};
    Object.entries(elements).forEach(([key, { ref, maxFontSize, maxWidth }]) => {
      if (ref.current) {
        newFontSizes[key] = adjustFontSizeByWidth(ref, maxFontSize, maxWidth);
      }
    });

    setFontSizes((prev) => ({ ...prev, ...newFontSizes }));
  }, [selectedTopic, authorName]);

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
            <div className="text-[40px] leading-[50px] text-[#0D453A]">
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
            // backgroundImage: isIOS
            //   ? "url('/images/create-book/bg/bg4-back-mob.jpg')"
            //   : "none",
            backgroundColor: "#F0EADE",
          }}
        >
          {/* {!isIOS && (
            <img
              src={isMobile()
                ? "/images/create-book/bg/bg4-back-mob.jpg"
                : "/images/create-book/bg/bg4-back.png"}
              alt="Back Cover"
            />
          )} */}
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
