import React from "react";

const CoverTemplate4 = ({ type, data }) => {
  const { authorName, selectedTopic, authorImage, selectedSubTopic, croppedImage } = data;

  const authorImageSrc =
    croppedImage instanceof File ? URL.createObjectURL(croppedImage) : croppedImage;

  return (
    <>
      {/* Front Cover */}
      {type === "front" && (
        <div className="w-[431px] h-[648px] bg-[#FFA3BC] mx-auto flex flex-col items-center justify-between ">
          {/* Heading */}
          <div className="w-full relative h-[405px]">
            <img
              src={authorImageSrc}
              alt={authorName || "Default Author"}
              className="w-full h-full object-cover block"
            />

          </div>

          <div className="flex flex-col pt-6 pb-8  items-center gap-4 bg-[#F0EADE] px-8 text-center flex-1 font-pacifico">
            {/* Title */}
            <div className="text-[40px] leading-[40px]  text-[#0D453A]">
              {selectedTopic || "Default Topic"}
            </div>

            {/* Subheading */}
            <div>
              <div className="text-[20px] leading-[24px] font-medium font-degular text-[#F96E47]">
                {selectedSubTopic || "Default Sub Topic"}
              </div>
            </div>


            <div className=" text-[#0D453A] flex flex-col gap-3 items-center justify-center text-[20px] font-black font-degular">
              <img src="images/create-book/bg/wave-black.png" alt="" />
              <div className="">{authorName || "Default Author"}</div>

            </div>
          </div>

        </div>
      )}

      {/* Back Cover */}
      {type === "back" && (
        <div
          className="w-[431px] h-[648px] mx-auto flex flex-col items-center justify-between space-y-6 bg-cover bg-center bg-no-repeat"

        >
          <img src="images/create-book/bg/bg5-back.png" alt="Back Cover" />
        </div>
      )}

      {type === "spine" && (

        <div className="h-[648px] flex justify-center relative">

          <div className="flex text-[#0D453A] items-center h-[57px] w-[648px] gap-10 pl-2 bg-[#FFA3BC] justify-between absolute rotate-90 origin-top-left left-[calc(50%+28px)] text-[23px]">

            <div className="flex flex-1 flex-col justify-center items-center  font-pacifico pb-2">
              <div>{selectedTopic || "Default Topic"}</div>
            </div>

            <div className="flex font-black flex-col justify-center items-center ]  font-degular h-full w-[243px] bg-[#F0EADE] p-2 pb-3">
              <div>{authorName || "Default Author"}</div>
            </div>
          </div>
        </div>

      )}
    </>
  );
};

export default CoverTemplate4;
