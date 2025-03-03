import React, { useEffect, useRef, useState } from "react";
import { adjustFontSizeByWidth } from "@/utils/fontSizeHelper";
import { generateBookBackCover } from "@/utils/coverGenerators/backGenerator";
const CoverTemplate5 = ({ type, data }) => {
  const { authorName, selectedTopic, authorImage, selectedSubTopic, croppedImage, praises } = data;
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
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


  const authorImageSrc =
    croppedImage instanceof File ? URL.createObjectURL(croppedImage) : croppedImage;

  const isMobile = () => /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

  const spineAuthorRef = useRef(null);
  const maxSpineAuthorWidth = 215;
  const [spineAuthorFontSize, setSpineAuthorFontSize] = useState(21);

  useEffect(() => {
    if (spineAuthorRef.current) {
      const newSize = adjustFontSizeByWidth(spineAuthorRef, 21, maxSpineAuthorWidth);
      setSpineAuthorFontSize(newSize);
    }
  }, [authorName]);

  return (
    <>
      {/* Front Cover */}
      {type === "front" && (
        <div
          className="relative w-[431px] h-[648px] bg-[#747778] mx-auto flex flex-col items-center justify-between"
          data-disable-grayscale
          style={{ filter: "grayscale(100%)" }}
        >
          {/* Heading */}
          <div className="w-full h-full flex flex-col justify-end">
            {isIOS ? (
              <canvas ref={canvasRef} className="w-full h-full object-cover block"></canvas>
            ) : (
              <img
                src={authorImageSrc}
                alt={authorName || "Default Author"}
                className="w-full h-[550px] object-cover block"
              />
            )}
          </div>


          <div className="absolute w-full h-full top-0 left-0 flex flex-col justify-center items-center gap-4 px-8 text-center flex-1 text-white pt-12 pb-11">
            <div className="text-left h-full flex flex-col justify-between">
              <div className="">
                <div className="font-black text-[30px] font-degular">
                  {authorName || "Default Author"}
                </div>
              </div>
              <div className="">
                {/* Title */}
                <div className="text-[40px] leading-[40px] font-georgia italic">
                  {selectedTopic || "Default Topic"}
                </div>

                {/* Subheading */}
                <div>
                  <div className="text-[20px] leading-[20px] font-medium font-degular mt-4">
                    {selectedSubTopic || "Default Sub Topic"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Back Cover */}
      {type === "back" && (
        <div
          className="w-[431px] h-[648px] mx-auto flex flex-col items-center justify-between space-y-6 bg-cover bg-center bg-no-repeat  font-degular"
          style={{
            // backgroundImage: isIOS
            //   ? "url('/images/create-book/bg/bgwhite-back-mob.png')"
            //   : "none",
            backgroundColor: "#A6AAAC",
            // backgroundSize: "cover",
            // backgroundPosition: "center",
            // backgroundRepeat: "no-repeat",
          }}
        >
          {praises ? (
            generateBookBackCover({ author: authorName, praises, metaColor: "#fff", website: "www.booktailor.com" })
          ) : (
            <p>Loading testimonials...</p>
          )}
          {/* {!isIOS && (
            <img
              src={isMobile()
                ? "/images/create-book/bg/bgwhite-back-mob.png"
                : "/images/create-book/bg/bg5-back.png"}
              alt="Back Cover"
            />
          )} */}
        </div>

      )}

      {/* Spine */}
      {type === "spine" && (
        <div className="h-[648px] flex justify-center relative">
          <div className="flex text-white items-center h-[57px] gap-4 px-4 w-[648px]  pl-6 bg-[#747778] justify-center absolute rotate-90 origin-top-left left-[calc(50%+28px)]">
            <div className="flex font-georgia flex-1 flex-col justify-center text-[24px] italic pb-1">
              <div className="whitespace-nowrap">{selectedTopic || "Default Topic"}</div>
            </div>

            <div className="flex font-black flex-col justify-center items-center font-degular h-full">
              <div
                ref={spineAuthorRef}
                className="whitespace-nowrap"
                style={{ fontSize: `${spineAuthorFontSize}px` }}
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

export default CoverTemplate5;
