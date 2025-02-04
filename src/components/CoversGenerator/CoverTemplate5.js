import React from "react";

const CoverTemplate5 = ({ type, data }) => {
  const { authorName, selectedTopic, authorImage, selectedSubTopic, croppedImage } = data;

  const authorImageSrc =
    croppedImage instanceof File ? URL.createObjectURL(croppedImage) : croppedImage;

    const isMobile = () => {
      return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    };

  return (
    <>
      {/* Front Cover */}
      {type === "front" && (
        <div className="relative w-[431px] h-[648px] bg-[#747778] mx-auto flex flex-col items-center justify-between " 
        data-disable-grayscale 
        style={{ filter: "grayscale(100%)" }}>
          
          {/* Heading */}
          <div className="w-full  h-full">
            <img
              src={authorImageSrc}
              alt={authorName || "Default Author"}
              className="w-full h-full object-cover block "
            />

          </div>

          <div className="absolute w-full h-full top-0 left-0 flex flex-col justify-center items-center gap-4  px-8 text-center flex-1  text-white  pt-12 pb-11">



            <div className="text-left h-full flex flex-col justify-between">
            
              <div className="">

                <div className="font-black text-[30px] font-degular">{authorName || "Default Author"}</div>
              </div>
              <div className="">
                {/* Title */}
                <div className="text-[40px] leading-[40px]  font-georgia  italic">
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
          className="w-[431px] h-[648px] mx-auto flex flex-col items-center justify-between space-y-6 bg-cover bg-center bg-no-repeat bg-[#A6AAAC]"

        >
          <img src={`${isMobile ? 
            "/images/create-book/bg/bgwhite-back-mob.png " : 
            "/images/create-book/bg/bg5-back.png"}`} 
            alt="Back Cover" />
        </div>
      )}

      {type === "spine" && (

        <div className="h-[648px] flex justify-center relative">

          <div className="flex text-white items-center h-[57px] w-[648px] pb-1 pl-6 bg-[#747778] justify-center absolute rotate-90 origin-top-left left-[calc(50%+28px)] ">

            <div className="flex font-georgia flex-1 flex-col justify-center  text-[24px] italic ">
              <div className="whitespace-nowrap">{selectedTopic || "Default Topic"}</div>
            </div>

            <div className="flex font-black flex-col  justify-center items-center text-[21px] w-[215px] font-degular h-full  ">
              <div className="whitespace-nowrap">{authorName || "Default Author"}</div>
            </div>
          </div>
        </div>

      )}
    </>
  );
};

export default CoverTemplate5;
