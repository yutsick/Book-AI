import React from "react";

const CoverTemplate1 = ({ type, data }) => {
  const { authorName, selectedTopic, authorImage, selectedSubTopic } = data;

  // Перетворення `File` на URL, якщо потрібно
  const authorImageSrc =
    authorImage instanceof File ? URL.createObjectURL(authorImage) : authorImage;

  return (
    <>
      {type === "front" && (
        <div
          className="w-[431px] h-[648px] mx-auto flex flex-col items-center justify-between bg-cover bg-center bg-no-repeat font-anton"
          style={{ backgroundImage: "url('/images/create-book/bg/bg1.png')" }}
        >
          {/* Heading */}
          <div className=" flex flex-col gap-4">
          <div>
            <div className="text-[32px] leading-[36px] font-bold text-[#F96E47] text-center mt-[56px]">
              {selectedTopic || "Default Topic"}
            </div>
          </div>

          {/* Subheading */}
          <div>
            <div className="text-[20px] font-semibold text-center text-white">
              {selectedSubTopic || "Default Sub Topic"}
            </div>
          </div>
          </div>
          {/* Image with Text */}
          <div className="flex flex-col w-full flex-1 justify-end">
            <img
              src={authorImageSrc}
              alt={authorName || "Default Author"}
              className="w-full max-h-[384px] object-cover block"
            />
            <div className="pb-3 text-[28px]  bg-white h-[80px] w-full flex items-center justify-center  text-[#14465F] ">
              {authorName || "Default Author"}
            </div>
          </div>
        </div>
      )}

      {type === "back" && (
        <div
          className="w-[431px] h-[648px] mx-auto flex flex-col items-center justify-between space-y-6 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/create-book/bg/bg1.png')" }}
        >
          <img src="images/create-book/bg/bg1-back.png" alt="" />
        </div>
      )}

      {type === "spine" && (
        <div className="h-[648px] flex justify-center relative">
          <div
            className="flex  items-center w-[648px] gap-10 p-2 rotate-90 h-[57px] bg-cover bg-center bg-no-repeat origin-top-left relative left-[50%]"
            style={{ backgroundImage: "url('/images/create-book/bg/bg1.png')" }}
          >
            <div className="text-white flex items-center justify-between text-[18px] font-bold font-anton flex-1">

              <p className="">
                {selectedTopic || "Default Topic"}
              </p>



              <p className="text-[#14465F] ">
                {authorName || "Default Author"}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CoverTemplate1;
