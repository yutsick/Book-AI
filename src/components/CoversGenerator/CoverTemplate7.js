
import React, { useEffect, useRef, useState } from "react";
import { adjustFontSizeByWidth } from "@/utils/fontSizeHelper";

const CoverTemplate7 = ({ type, data }) => {
  const { authorName, selectedTopic, authorImage, selectedSubTopic, croppedImage } = data;

  const authorImageSrc =
    croppedImage instanceof File ? URL.createObjectURL(croppedImage) : croppedImage;

    const isMobile = () => {
      return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    };

      const spineAuthorRef = useRef(null);
      const maxSpineAuthorWidth = 230; 

      const [spineAuthorFontSize, setSpineAuthorFontSize] = useState(17);
      useEffect(() => {
        if (spineAuthorRef.current) {
          const newSize = adjustFontSizeByWidth(spineAuthorRef, 17, maxSpineAuthorWidth);
          setSpineAuthorFontSize(newSize);
        }
      }, [authorName]);
      
  return (
    <>
      {type === "front" && (
        <div
          className="w-[431px] h-[648px] mx-auto flex flex-col items-center justify-between bg-cover bg-center bg-no-repeat font-montserrat bg-[#FA423B] text-[#000082] py-5"> 
          <div className="">
          <img src="/images/create-book/bg/wave-blue.png" alt="" className="w-full"/>
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
              backgroundImage: "url('/images/create-book/bg/picture-waves-blue.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "305px 330px",
              backgroundPosition: "center 0"
            }}>
            <img
              src={authorImageSrc}
              alt={authorName || "Default Author"}
              className="w-[278px] h-[302px] rounded-full object-cover block object-top mx-auto border border-[#000082] bg-white"
            />
            <div className="font-montserrat mb-5 mt-6 text-[26px] text-center font-semibold">
              {authorName || "Default Author"}
            </div>
            <img src="/images/create-book/bg/wave-blue.png" alt="" className="w-full"/>
          </div>
        </div>
      )}

      {type === "back" && (
        <div
          className="w-[431px] h-[648px] mx-auto flex flex-col items-center justify-between bg-[#FA423B]"
          
        >
            <img src={`${isMobile ? 
            "/images/create-book/bg/bg7-back-mob.png " : 
            "/images/create-book/bg/bg7-back.png"}`} 
            alt="Back Cover" />
        </div>
      )}

      {type === "spine" && (

        <div className="h-[648px] flex justify-center relative">
          <div
            className="px-5 py-2 bg-[#FA423B] text-[#000082]  h-[57px] bg-cover bg-center bg-no-repeat   flex items-center ] w-[648px] gap-4  justify-between absolute rotate-90 origin-top-left left-[calc(50%+28px)]">
            <img src="/images/create-book/bg/wave-blue-spine.png" alt="" className="h-[57px] "/>
            <div className=" flex items-center justify-between text-[18px] font-semibold font-montserrat flex-1">

              <div className="whitespace-nowrap font-montserrat text-[18px] leading-[20px] ">
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
            <img src="/images/create-book/bg/wave-blue-spine.png" alt="" className="h-[57px]"/>
          </div>
        </div>
      )}
    </>
  );
};

export default CoverTemplate7;
