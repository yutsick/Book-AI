import React from "react";

const CoverTemplate2 = ({ type, data }) => {
  const { authorName, selectedTopic, authorImage, selectedSubTopic } = data;

  // Перетворення `File` на URL, якщо потрібно
  const authorImageSrc =
    authorImage instanceof File ? URL.createObjectURL(authorImage) : authorImage;

  return (
    <>
      {/* Front Cover */}
      {type === "front" && (
        <div className="w-[431px] h-[648px] bg-black mx-auto flex flex-col items-center justify-between bg-cover bg-center bg-no-repeat font-anton">
          {/* Heading */}
          <div className="w-full relative h-[433px]">
            <img
              src={authorImageSrc}
              alt={authorName || "Default Author"}
              className="w-full h-full object-cover block"
            />
            <div className="absolute top-[65px] left-[36px] text-white">
              {authorName || "Default Author"}
            </div>
          </div>

          <div className="flex flex-col gap-4 bg-[#BB2621] px-8 py-6 flex-1">
            {/* Title */}
            <div className="text-[50px] leading-[50px] font-bold text-white">
              {selectedTopic || "Default Topic"}
            </div>

            {/* Subheading */}
            <div>
              <div className="text-[20px] font-semibold text-white">
                {selectedSubTopic || "Default Sub Topic"}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Back Cover */}
      {type === "back" && (
        <div
          className="w-[431px] h-[648px] mx-auto flex flex-col items-center justify-between space-y-6 bg-cover bg-center bg-no-repeat"
          
        >
          <img src="images/create-book/bg/bg2-back.png" alt="Back Cover" />
        </div>
      )}

      {type === "spine" && (
        <div className="h-[648px] flex justify-center relative">
          <div
            className="flex  items-center w-[648px] gap-10 pl-2 rotate-90 h-[57px] origin-top-left relative left-[50%] bg-black"
           
          >
            <div className="text-white flex items-center justify-between text-[18px] font-bold font-anton flex-1">

              <div className="">
                {selectedTopic || "Default Topic"}
              </div>


        <div className="bg-[#BB2621] h-full px-2">
              <div className="   ">
                {authorName || "Default Author"}
              </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CoverTemplate2;
