
import React, { useEffect, useRef, useState } from "react";
import { adjustFontSizeByWidth } from "@/utils/fontSizeHelper";
import { generateBookBackCover } from "@/utils/coverGenerators/backGenerator";
const CoverTemplate4 = ({ type, data }) => {

  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const { authorName, selectedTopic, authorImage, selectedSubTopic, croppedImage, praises } = data;


  const authorImageSrc =
    croppedImage instanceof File ? URL.createObjectURL(croppedImage) : croppedImage;

  const isMobile = () => {
    return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  };


  const spineAuthorRef = useRef(null);
  const spineTitleRef = useRef(null);

  const maxSpineTitleWidth = 350;
  const maxSpineAuthorWidth = 150;

  const [spineTitleFontSize, setSpineTitleFontSize] = useState(20);
  const [spineAuthorFontSize, setSpineAuthorFontSize] = useState(17);

  useEffect(() => {
    if (spineAuthorRef.current) {
      const newSize = adjustFontSizeByWidth(spineAuthorRef, 17, maxSpineAuthorWidth);
      setSpineAuthorFontSize(newSize);
    }
  }, [authorName]);

  useEffect(() => {
    if (spineTitleRef.current) {
      const newSize = adjustFontSizeByWidth(spineTitleRef, 20, maxSpineTitleWidth);
      setSpineTitleFontSize(newSize);
    }
  }, [selectedTopic]);


  return (
    <>
      {type === "front" && (
        <div
          className="w-[431px] h-[648px] mx-auto flex flex-col items-center justify-between  font-montserrat bg-[#000082] text-white py-5">
          <div className="">
            <img src="/images/create-book/bg/line-blue.png" alt="" className="w-full" />
          </div>
          <div className="">
            <div className="font-montserrat  text-[26px] text-center font-semibold">
              {authorName || "Default Author"}
            </div>
            <div className="w-[274px] h-[274px] mx-auto pt-4 mt-4"
              style={{
                backgroundImage: "url('/images/create-book/bg/lines-strokes.svg')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "274px 274px",
                backgroundPosition: "center 0"
              }}>
              <img
                src={authorImageSrc}
                alt={authorName || "Default Author"}
                className="w-[240px] h-[240px] rotate-[3.5deg] rounded-[8px] object-cover block object-top mx-auto border border-white bg-white"
              />
            </div>
          </div>
          <div className="flex flex-col w-full   "
          >

            {/* Heading */}
            <div className=" flex flex-col gap-3 max-w-[340px] mx-auto mb-8 ">


              <div className="text-[24px] leading-[28px] font-semibold  text-center font-montserrat">
                {selectedTopic || "Default Topic"}
              </div>


              {/* Subheading */}

              <div className="text-[18px] text-[#22B5F0] font-medium text-center ">
                {selectedSubTopic || "Default Sub Topic"}
              </div>

            </div>

            <img src="/images/create-book/bg/line-blue.png" alt="" className="w-full" />
          </div>
        </div>
      )}

      {type === "back" && (
        <div
          className="w-[431px] h-[648px] mx-auto flex flex-col items-center justify-between bg-[#000082] py-5">
        <div className="">
            <img src="/images/create-book/bg/line-blue.png" alt="" className="w-full" />
          </div>
          {praises ? (
            generateBookBackCover({ author: authorName, praises, metaColor: "#fff", website: "www.booktailor.com", decor: true })
          ) : (
            <p>Loading testimonials...</p>
          )}
               <div className="">
            <img src="/images/create-book/bg/line-blue.png" alt="" className="w-full" />
          </div>
        </div>

      )}

      {type === "spine" && (

        <div className="h-[648px] flex justify-center relative">
          <div
            className="px-5  py-2 bg-[#000082] text-white  h-[57px] bg-cover bg-center bg-no-repeat   flex items-center ] w-[648px] gap-4  justify-between absolute rotate-90 origin-top-left left-[calc(50%+28px)]">
            <img src="/images/create-book/bg/line-spine-blue.png" alt="" className="h-[57px] " />
            <div className=" flex items-center justify-between text-[18px] font-semibold font-montserrat flex-1">

              <div 
              ref={spineTitleRef}
              style={{ 
                fontSize: `${spineTitleFontSize}px`, 
                lineHeight: `${spineTitleFontSize}px`,
              }}

              className="whitespace-nowrap font-montserrat ">
                {selectedTopic || "Default Topic"}
              </div>

              <div className="whitespace-nowrap font-montserrat text-[17px] leading-[17px]">
                <div
                  ref={spineAuthorRef}
                  style={{ fontSize: `${spineAuthorFontSize}px` }}
                >
                  {authorName || "Default Author"}
                </div>
              </div>
            </div>
            <img src="/images/create-book/bg/line-spine-blue.png" alt="" className="h-[57px]" />
          </div>
        </div>
      )}
    </>
  );
};

export default CoverTemplate4;
