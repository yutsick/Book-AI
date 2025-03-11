import React, { useEffect, useRef, useState, useMemo } from "react";
import useAdjustFontSizes from "@/hooks/useAdjustFontSizes";
import { generateBookBackCover } from "@/utils/coverGenerators/backGenerator";
const CoverTemplate8 = ({ type, data }) => {

  const isMobile = (window.innerWidth <= 768);
  const { authorName, selectedTopic, selectedSubTopic, croppedImage, praises } = data;

  const authorImageSrc =
    croppedImage instanceof File ? URL.createObjectURL(croppedImage) : croppedImage;

  const elements = {
    frontAuthor: { ref: useRef(null), maxFontSize: 26, maxWidth: 350 },
    title: { ref: useRef(null), maxFontSize: 56, maxHeight: 220, maxWidth: 240 },
    subTitle: { ref: useRef(null), maxFontSize: 20, maxHeight: 65 },
    spineTitle: { ref: useRef(null), maxFontSize: 28, maxWidth: 375 },
    spineAuthor: { ref: useRef(null), maxFontSize: 20, maxWidth: 180 },
  };

  const [fontSizes, setfontSizes] = useState({
    frontAuthor: 26,
    title: 56,
    subTitle: 20,
    spineTitle: 28,
    spineAuthor: 20,
  }, []);


  useAdjustFontSizes(elements, [selectedTopic, selectedSubTopic, authorName], setfontSizes);
  useAdjustFontSizes(elements, [selectedTopic, selectedSubTopic, authorName], setfontSizes);

  useAdjustFontSizes(elements, [selectedTopic, selectedSubTopic, authorName], setfontSizes);

  useEffect(() => {
    const titleElement = elements.title.ref.current;
    const authorElement = elements.frontAuthor.ref.current;

    if (!titleElement || !authorElement) return;

    document.fonts.ready.then(() => {
      const titleFontSize = parseFloat(window.getComputedStyle(titleElement).fontSize);
      const calculatedAuthorFontSize = titleFontSize / 2;
      const newAuthorFontSize = Math.min(calculatedAuthorFontSize, fontSizes.frontAuthor);

      setfontSizes((prev) => ({
        ...prev,
        frontAuthor: newAuthorFontSize,
      }));

      authorElement.style.fontSize = `${newAuthorFontSize}px`;
      authorElement.style.lineHeight = `${newAuthorFontSize * 1.2}px`;
    });
  }, [fontSizes.title, selectedTopic, authorName]);


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
            <div
              className={`text-white mt-6 ml-8 self-start text-left font-degular font-extrabold whitespace-nowrap`}
              ref={elements.frontAuthor.ref}
              style={{
                fontSize: `${elements.frontAuthor.fontSize}px`,
                // lineHeight: `${elements.frontAuthor.fontSize}px`
              }}
            >
              {authorName || "Default Author"}
            </div>
            {/* Heading */}
            <div className="w-full h-full flex justify-end items-end ">
              <img
                src={authorImageSrc}
                alt={authorName || "Default Author"}
                className="w-full h-full max-h-[297px] max-w-[245px] object-cover object-top block"
              />
            </div>
          </div>

          <div className="absolute w-full h-full top-0 left-0 flex flex-col justify-between  gap-4 px-8 text-center flex-1 text-white pt-[72px] pb-6">

            <div

              className="relative mx-auto max-w-[350px] max-h-[360px]">
              <img src="/images/create-book/bg/bubble.svg" alt="" />
              <div className=" font-degular text-center absolute w-full h-full top-0  pt-6 pb-9 px-12">
                <div className="w-full h-full flex flex-col items-center ml-1">

                  <div className=" max-w-[240px]  h-full flex items-center">
                    <div
                      ref={elements.title.ref}
                      id="tester"
                      className="text-[#FFE600] font-degular font-extrabold"
                      style={{
                        fontSize: `${elements.title.fontSize}px`,
                        lineHeight: `${elements.title.lineHeight}px`
                      }}
                    >
                      {selectedTopic || "Default Topic"}
                    </div>
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
                style={{ fontSize: `${elements.spineTitle.fontSize}px` }}
              >
                {selectedTopic || "Default Topic"}
              </div>
            </div>

            <div className="flex flex-col justify-center items-center  h-full">
              <div
                ref={elements.spineAuthor.ref}
                className="whitespace-nowrap text-white font-extrabold"
                style={{ fontSize: `${elements.spineAuthor.fontSize}px` }}
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
