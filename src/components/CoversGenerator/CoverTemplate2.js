import React, { useRef, useState, } from "react";
import { generateBookBackCover } from "@/utils/coverGenerators/backGenerator";
import useAdjustFontSizes from "@/hooks/useAdjustFontSizes";


const CoverTemplate2 = ({ type, data, templatesAdjusted, templateId }) => {
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const { authorName, selectedTopic, authorImage, selectedSubTopic, croppedImage, praises } = data;


  const isTemplateAdjusted = templatesAdjusted?.includes(templateId);



  const elements = {
    frontAuthor: { ref: useRef(null), maxFontSize: 30, maxWidth: 220, maxHeight: 60  },
    spineAuthor: { ref: useRef(null), maxFontSize: 20, maxWidth: 220 },
    frontTitle: { ref: useRef(null), maxFontSize: 55,  maxHeight: 80 },
    spineTitle: { ref: useRef(null), maxFontSize: 28, maxWidth: 370 },
  };

  const [fontSizes, setFontSizes] = useState({
    frontAuthor: 30,
    spineAuthor: 20,
    frontTitle: 55,
    spineTitle: 28,
  });

  useAdjustFontSizes(elements, [selectedTopic, selectedSubTopic, authorName], setFontSizes);


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
            ref={elements.frontTitle.ref}
            className=" font-extrabold  absolute top-12 left-8 uppercase"
            style={{
              transform: "rotate(90deg) translateY(-100%)",
              transformOrigin: "left top",
              fontSize: `${elements.frontTitle.fontSize}px`,
              lineHeight: `${elements.frontTitle.lineHeight}px`,
            }}
          >
            {selectedTopic || "Default Topic"}
          </div>
          <div className="w-full  mt-8 flex justify-end h-8 px-10 " >
            <div 
            ref={elements.frontAuthor.ref}
            className={`font-extrabold max-w-[260px] ${
              authorName.length > 30 && authorName.trim().split(/\s+/).length > 1 
                ? "whitespace-normal break-words" 
                : "whitespace-nowrap"
            }`}
            style={{
              fontSize: `${elements.frontAuthor.fontSize}px`,
              lineHeight: `${elements.frontAuthor.lineHeight}px`,
            }}
            >
              {authorName || "Default Author"}
            </div>
          </div>
          <div className={`flex flex-col w-full flex-1 justify-end `}>
            <img
              src={authorImageSrc}
              alt={authorName || "Default Author"}
              className={`${!isTemplateAdjusted ? "translate-x-12" : ""} min-h-[380px] max-h-[570px] object-contain block object-top`}
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
              ref={elements.spineTitle.ref}
              className="uppercase whitespace-nowrap text-[28px] font-extrabold"
              style={{ 
                background: "#878B91",
                fontSize: `${elements.spineTitle.fontSizes}px`,
                lineHeight: `${elements.spineTitle.lineHeight}px`,
              }}
              >
                {selectedTopic || "Default Topic"}
              </div>
              <div
                ref={elements.spineAuthor.ref}
                className=" whitespace-nowrap font-degular font-extrabold relative z-2"
                style={{ fontSize: `${elements.spineAuthor.fontSizes}px` }}
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
