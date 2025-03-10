import React, { useEffect, useRef, useState } from "react";
import { generateBookBackCover } from "@/utils/coverGenerators/backGenerator";
import useAdjustFontSizes from "@/hooks/useAdjustFontSizes";

const CoverTemplate1 = ({ type, data }) => {

  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const { authorName, selectedTopic, selectedSubTopic, croppedImage, praises } = data;

  const authorImageSrc =
    croppedImage instanceof File ? URL.createObjectURL(croppedImage) : croppedImage;

  const canvasRef = useRef(null);
  useEffect(() => {
    if (isIOS && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = authorImageSrc;
      img.crossOrigin = "anonymous";

      img.onload = async () => {
        if (img.decode) await img.decode();

        requestAnimationFrame(() => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, img.width, img.height);
        });
      };
    }
  }, [isIOS, croppedImage]);

  const isMobile = () => /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

  const elements = {
    title: { ref: useRef(null), maxFontSize: 50, maxHeight: 95 },
    subTitle: { ref: useRef(null), maxFontSize: 20, maxHeight: 60 },
    spineTitle: { ref: useRef(null), maxFontSize: 36, maxWidth: 400 },
    spineAuthor: { ref: useRef(null), maxFontSize: 20, maxWidth: 188 },
  };

  const [fontSizes, setFontSizes] = useState({
    title: 50,
    subTitle: 20,
    spineTitle: 36,
    spineAuthor: 20,
  });

  useAdjustFontSizes(elements, [selectedTopic, selectedSubTopic, authorName], setFontSizes);


  return (
    <>
      {type === "front" && (
        <div className="w-[431px] h-[648px] bg-black mx-auto flex flex-col items-center justify-between bg-cover bg-center bg-no-repeat font-degular">
          <div className="w-full relative h-[433px] flex flex-col justify-end">
            {isIOS ? (
              <canvas ref={canvasRef} className="w-full h-full max-h-[360px] object-top object-cover block"></canvas>
            ) : (
              <img
                src={authorImageSrc}
                alt={authorName || "Default Author"}
                className="w-full h-full max-h-[360px] object-top  object-cover block"
              />
            )}
            <div className="absolute top-[50px] text-[20px] leading-[26px] font-black text-white left-[36px]">
              {authorName || "Default Author"}
            </div>
          </div>

          <div className="py-4 flex flex-col h-full  gap-2 bg-[#BB2621] pr-4 pl-7 flex-1">
            <div
              ref={elements.title.ref}
              className="font-black text-white max-w-[400px]"
              style={{ fontSize: `${fontSizes.title}px`, lineHeight: `${fontSizes.title.lineHeight}px` }}
            >
              {selectedTopic || "Default Topic"}
            </div>

            <div
              ref={elements.subTitle.ref}
              className="font-semibold text-white mt-2"
              style={{ fontSize: `${fontSizes.subTitle}px` ,  lineHeight: `${fontSizes.subTitle.lineHeight}px`}}
            >
              {selectedSubTopic || "Default Sub Topic"}
            </div>
          </div>
        </div>
      )}

      {type === "back" && (
        <div
          className="w-[431px] h-[648px] mx-auto flex items-center justify-between space-y-6 bg-cover bg-center bg-no-repeat bg-black text-white font-degular"
        >

          {praises ? (
            generateBookBackCover({ author: authorName, praises, metaColor: "#fff", website: "www.booktailor.com" })
          ) : (
            <p>Loading testimonials...</p>
          )}
        </div>

      )}

      {type === "spine" && (
        <div className="h-[648px] flex justify-center relative w-full">
          <div className="flex items-center  h-[57px] w-[648px]  bg-black  justify-between absolute rotate-90 origin-top-left left-[calc(50%+28px)] font-degular font-black">
            <div className="w-[433px]  h-full flex justify-center items-center  ">
              <div
                ref={elements.spineTitle.ref}
                className="text-white px-4  text-[36px]  whitespace-nowrap"
                style={{ fontSize: `${fontSizes.spineTitle}px`, lineHeight: `${fontSizes.spineTitle * 1.1}px` }}
              >
                {selectedTopic || "Default Topic"}
              </div>
            </div>

            <div className="text-white flex items-center h-full flex-1 bg-[#BB2621] px-4">
              <div
                ref={elements.spineAuthor.ref}
                className="whitespace-nowrap"
                style={{ fontSize: `${fontSizes.spineAuthor}px`, lineHeight: `${fontSizes.spineAuthor * 0.9}px` }}
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

export default CoverTemplate1;
