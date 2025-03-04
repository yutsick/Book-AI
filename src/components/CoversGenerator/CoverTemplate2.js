import React, { useRef, useState, useEffect } from "react";
import { adjustFontSizeByWidth } from "@/utils/fontSizeHelper";
import { adjustFontSizeByHeight } from "@/utils/fontSizeHelper";
import { generateBookBackCover } from "@/utils/coverGenerators/backGenerator";

const CoverTemplate2 = ({ type, data }) => {
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const { authorName, selectedTopic, authorImage, selectedSubTopic, croppedImage, praises } = data;

  const authorRef = useRef(null);
  const titleRef = useRef(null);
  const spineTitleRef = useRef(null);

  const [authorFontSize, setAuthorFontSize] = useState(20);
  const [titleFontSize, setTitleFontSize] = useState(55);
  const [spineTitleFontSize, setSpineTitleFontSize] = useState(28);

  useEffect(() => {
    if (type === "spine") {
      const newFontSize = adjustFontSizeByWidth(authorRef, 20, 180);
      setAuthorFontSize(newFontSize);
    }
  }, [authorName, type]);

  useEffect(() => {
    if (type === "spine") {
      const newFontSize = adjustFontSizeByWidth(spineTitleRef, 28, 390);
      setSpineTitleFontSize(newFontSize);
    }
  }, [selectedTopic, type]);

  useEffect(() => {
    if (type === "front") {
      const newFontSize = adjustFontSizeByHeight(titleRef, 55, 135);
      setTitleFontSize(newFontSize);
    }
  }, [selectedTopic, type]);

  const authorImageSrc =
    croppedImage instanceof File ? URL.createObjectURL(croppedImage) : croppedImage;

  const isMobile = () => {
    return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  };

  return (
    <>
      {type === "front" && (
        <div
          className="w-[431px] h-[648px] mx-auto flex flex-col items-center justify-between bg-cover bg-center bg-no-repeat font-degular text-white   relative"
          style={{
            background: "#878B91",
          }}
        >
          <div
            ref={titleRef}
            className=" font-extrabold  absolute top-12 left-8   uppercase"
            style={{
              transform: "rotate(90deg) translateY(-100%)",
              transformOrigin: "left top",
              fontSize: `${titleFontSize}px`,
              lineHeight: `${titleFontSize * 0.9}px`,
            }}
          >
            {selectedTopic || "Default Topic"}
          </div>
          <div className="flex w-full mt-8 justify-end px-10" >
            <div className="text-[30px] font-extrabold  w-[70%] flex items-end justify-end">
              {authorName || "Default Author"}
            </div>
          </div>
          <div className="flex flex-col w-full flex-1 justify-end">
            <img
              src={authorImageSrc}
              alt={authorName || "Default Author"}
              className=" max-h-[570px] object-cover block"
            />
            <div className="h-[210px] w-full bg-gradient-to-b from-transparent to-black/50 absolute" ></div>
            <div className="font-semibold  text-[17px] leading-[17px] max-w-[180px]  text-white absolute left-[52px] bottom-10">
              {selectedSubTopic || "Default Sub Topic"}
            </div>


          </div>
        </div>
      )}

      {type === "back" && (
        <div
          className="w-[431px] h-[648px] mx-auto flex flex-col items-center justify-between space-y-6 bg-[#878B91] font-degular text-white relative"
         
        >
          <div className="h-[210px] bottom-0 w-full bg-gradient-to-b from-transparent to-black/50 absolute" ></div>

          {praises ? (
            generateBookBackCover({ author: authorName, praises, metaColor: "#fff", website: "booktailor.com" })
          ) : (
            <p>Loading testimonials...</p>
          )}
        </div>

      )}

      {type === "spine" && (
        <div className="h-[648px] flex justify-center relative">
          <div
          
            className="pl-4 pr-4 h-[57px] bg-cover bg-center bg-no-repeat flex items-center w-[648px] gap-10 justify-between absolute rotate-90 origin-top-left left-[calc(50%+28px)] "
            style={{ 
              background: "#878B91",

            }}
          >
            <div className="h-full right-0 w-[210px] bg-gradient-to-r from-transparent to-black/50 absolute" ></div>
            <div className="text-white px-2 flex items-center justify-between  font-degular flex-1">
              <div 
              ref={spineTitleRef}
              className="uppercase whitespace-nowrap text-[28px] font-extrabold"
              style={{ 
                background: "#878B91",
                fontSize: `${spineTitleFontSize}px`,
                lineHeight: `${spineTitleFontSize * 1.2}px`,
              }}
              >
                {selectedTopic || "Default Topic"}
              </div>
              <div
                ref={authorRef}
                className=" whitespace-nowrap font-degular font-extrabold relative z-2"
                style={{ fontSize: `${authorFontSize}px` }}
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
