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
          className="w-[431px] h-[648px] mx-auto flex flex-col items-center justify-between bg-cover bg-center bg-no-repeat font-anton "
          style={{ backgroundImage: "url('/images/create-book/bg/bg1-front.png')" }}
        >
          {/* Heading */}
          <div className=" flex flex-col gap-4 max-w-[360px] mx-auto">
          <div>
            <div className="tracking-[2px] text-[32px] leading-[36px] font-bold text-[#F96E47] text-center mt-4 uppercase">
              {selectedTopic || "Default Topic"}
            </div>
          </div>

          {/* Subheading */}
          <div>
            <div className="uppercase tracking-[2px] text-[20px] font-semibold text-center text-white font-anton">
              {selectedSubTopic || "Default Sub Topic"}
            </div>
          </div>
          </div>
          {/* Image with Text */}
          <div className="flex flex-col w-full flex-1 justify-end"
          style={{
            backgroundImage:`url(${authorImageSrc})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
          }}
          
          >
            {/* <img
              src={authorImageSrc}
              alt={authorName || "Default Author"}
              className=" max-h-[340px] object-contain block"
            /> */}
            <div className="pb-5 text-[28px]  bg-white h-[80px] w-full flex items-center justify-center  text-[#14465F] font-anton">
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
            className="p-2  h-[57px] bg-cover bg-center bg-no-repeat   flex items-center ] w-[648px] gap-10  justify-between absolute rotate-90 origin-top-left left-[calc(50%+28px)]"
            style={{ backgroundImage: "url('/images/create-book/bg/bg1-spine.png')" }}
          >
            <div className="text-white flex items-center justify-between text-[18px] font-bold font-anton flex-1">

              <div className="">
                {selectedTopic || "Default Topic"}
              </div>



              <div className="text-[#14465F] font-anton pb-2">
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
