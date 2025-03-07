
import React, { useEffect, useRef, useState } from "react";
import useAdjustFontSizes from "@/hooks/useAdjustFontSizes";
import { generateBookBackCover } from "@/utils/coverGenerators/backGenerator";
const CoverTemplate7 = ({ type, data }) => {

  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const { authorName, selectedTopic, authorImage, selectedSubTopic, croppedImage, praises } = data;

  const authorImageSrc =
    croppedImage instanceof File ? URL.createObjectURL(croppedImage) : croppedImage;

  const isMobile = () => {
    return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  };

  
  const elements = {
    spineAuthor: { ref: useRef(null), maxFontSize: 17, maxWidth: 150 },
    spineTitle: { ref: useRef(null), maxFontSize: 20, maxWidth: 350 },
  };

  const [fontSizes, setFontSizes] = useState({
    spineAuthor: 20,
    spineTitle: 28,
  });

  useAdjustFontSizes(elements, [selectedTopic, selectedSubTopic, authorName], setFontSizes);

  return (
    <>
      {type === "front" && (
        <div
          className="w-[431px] h-[648px] mx-auto flex flex-col items-center justify-between bg-cover bg-center bg-no-repeat font-montserrat bg-[#E35205] text-[#000082] py-5">
          <div className="">
            <img src="/images/create-book/bg/wave-blue.png" alt="" className="w-full" />
          </div>
          {/* Heading */}
          <div className=" flex flex-col gap-4 max-w-[340px] mx-auto ">
            <div>

              <div className="text-[24px] leading-[28px] font-semibold  text-center mt-4 font-montserrat">
                {selectedTopic || "Default Topic"}
              </div>
            </div>

            {/* Subheading */}
            <div>
              <div className="text-[18px] text-white font-medium text-center ">
                {selectedSubTopic || "Default Sub Topic"}
              </div>
            </div>
          </div>
          {/* Image with Text */}
          <div className="flex flex-col w-full pt-4 justify-end "
            style={{
              backgroundImage: "url('/images/create-book/bg/picture-waves-blue.svg')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "310px 330px",
              backgroundPosition: "center 0"
            }}>
            <img
              src={authorImageSrc}
              alt={authorName || "Default Author"}
              className="w-[276px] h-[300px] rounded-full object-cover block object-top mx-auto border border-white bg-white"
            />
            <div className="font-montserrat mb-5 mt-6 text-[26px] text-center font-semibold">
              {authorName || "Default Author"}
            </div>
            <img src="/images/create-book/bg/wave-blue.png" alt="" className="w-full" />
          </div>
        </div>
      )}

      {type === "back" && (
        <div className="w-[431px] h-[648px] mx-auto flex flex-col items-center justify-between bg-[#E35205] py-5">
          <img src="/images/create-book/bg/wave-blue.png" alt="" className="w-full" />
          {praises ? (
            generateBookBackCover({ author: authorName, praises, metaColor: "#fff", website: "www.booktailor.com", decor: true })
          ) : (
            <p>Loading testimonials...</p>
          )}
          <img src="/images/create-book/bg/wave-blue.png" alt="" className="w-full" />
        </div>

      )}

      {type === "spine" && (

        <div className="h-[648px] flex  justify-center relative">
          <div
            className="px-5 py-2 bg-[#E35205] text-[#000082]  h-[57px] bg-cover bg-center bg-no-repeat   flex items-center ] w-[648px] gap-4  justify-between absolute rotate-90 origin-top-left left-[calc(50%+28px)]">
            <img src="/images/create-book/bg/wave-blue-spine.png" alt="" className="h-[57px] " />
            <div className=" flex items-center justify-between gap-4 text-[18px] font-semibold font-montserrat flex-1">

              <div 
              ref={elements.spineTitle.ref}
              style={{ 
                fontSize: `${elements.spineTitle.fontSize}px`, 
              
              }} 
              className="whitespace-nowrap font-montserrat ">
                {selectedTopic || "Default Topic"}
              </div>
              <div className="whitespace-nowrap text-white font-montserrat text-[17px] leading-[17px]">
                <div
                  ref={elements.spineAuthor.ref}
                  style={{ fontSize: `${elements.spineAuthor.fontSize}px` }}
                >
                  {authorName || "Default Author"}
                </div>
              </div>
            </div>
            <img src="/images/create-book/bg/wave-blue-spine.png" alt="" className="h-[57px]" />
          </div>
        </div>
      )}
    </>
  );
};

export default CoverTemplate7;
