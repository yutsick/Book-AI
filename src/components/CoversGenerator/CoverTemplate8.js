import React, { useEffect, useRef, useState } from "react";
import { adjustFontSizeByWidth, adjustFontSizeByHeight } from "@/utils/fontSizeHelper";
import { generateBookBackCover } from "@/utils/coverGenerators/backGenerator";
const CoverTemplate8 = ({ type, data }) => {

  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const { authorName, selectedTopic, selectedSubTopic, croppedImage, praises } = data;

  const authorImageSrc =
    croppedImage instanceof File ? URL.createObjectURL(croppedImage) : croppedImage;

  const isMobile = () => /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

  const elements = {
    frontAuthor: { ref: useRef(null), maxFontSize: 26, maxWidth: 280 },
    title: { ref: useRef(null), maxFontSize: 56, maxHeight: 190 },
    subTitle: { ref: useRef(null), maxFontSize: 20, maxHeight: 65 },
    spineTitle: { ref: useRef(null), maxFontSize: 28, maxWidth: 375 },
    spineAuthor: { ref: useRef(null), maxFontSize: 20, maxWidth: 220 },
  };

  const [fontSizes, setFontSizes] = useState({
    frontAuthor: 26,
    title: 56,
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
        <div className="w-[431px] h-[648px] bg-white  mx-auto relative">
          <div
            className="relative h-full w-full flex flex-col items-center justify-between"
            style={{
              background: "#0EACB0"
            }}
          >
            {/* Heading */}
            <div className="w-full h-full flex justify-end items-end">
              <img
                src={authorImageSrc}
                alt={authorName || "Default Author"}
                className="w-full h-full max-h-[255px] max-w-[245px] object-cover block"
              />
            </div>
          </div>

          <div className="absolute w-full h-full top-0 left-0 flex flex-col justify-between  gap-4 px-8 text-center flex-1 text-white pt-12 pb-11">
            <div className="relative mx-auto max-w-[350px] max-h-[360px]">
              <img src="/images/create-book/bg/bubble.svg" alt="" />
              <div className=" font-degular text-center absolute w-full h-full top-0  pt-12 pb-4 px-14">
                <div className="w-full h-full flex flex-col items-center ">
                  <div className=" text-white font-degular font-extrabold "
                    ref={elements.frontAuthor.ref}
                    style={{
                      fontSize: `${fontSizes.frontAuthor}px`,
                      lineHeight: `${fontSizes.frontAuthor}px`
                    }}
                  >
                    {authorName || "Default Author"}
                  </div>
                  <div
                    ref={elements.title.ref}
                    className="text-[#FFE600] mt-2 max-w-[300px] max-h-[220px] block font-extrabold"
                    style={{
                      fontSize: `${fontSizes.title}px`,
                      lineHeight: `${fontSizes.title*0.85}px`
                    }}
                  >
                    {selectedTopic || "Default Topic"}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex  ">
              <div className="mt-1 font-degular font-medium max-w-[150px] h-[130px] leading-[17px] text-start text-[17px]">
                {selectedSubTopic || "Default Sub Topic"}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Back Cover */}
      {type === "back" && (
        <div
          className="w-[431px] h-[648px] mx-auto flex flex-col items-center justify-between space-y-6 bg-cover bg-center bg-no-repeat bg-[#0EACB0] text-black font-degular"

        >

          {praises ? (
            generateBookBackCover({ author: authorName, praises, metaColor: "#fff", website: "www.booktailor.com" })
          ) : (
            <p>Loading testimonials...</p>
          )}
        </div>

      )}

      {/* Spine */}
      {type === "spine" && (
        <div className="h-[648px] flex justify-center relative">
          <div className="flex text-black font-black items-center h-[57px] w-[648px] px-10 bg-[#0EACB0] justify-between absolute rotate-90 origin-top-left left-[calc(50%+28px)] gap-8 font-degular">

            <div className="flex pb-1 flex-col justify-center items-center text-[28px] leading-[28px] tracking-[0.01em] h-full">
              <div
                ref={elements.spineTitle.ref}
                className="whitespace-nowrap text-[#FFE600] font-extrabold"
                style={{ fontSize: `${fontSizes.spineTitle}px` }}
              >
                {selectedTopic || "Default Topic"}
              </div>
            </div>

            <div className="flex flex-col justify-center items-center  h-full">
              <div
                ref={elements.spineAuthor.ref}
                className="whitespace-nowrap text-white font-extrabold"
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
