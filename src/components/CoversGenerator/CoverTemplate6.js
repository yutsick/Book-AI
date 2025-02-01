
import React from "react";

const CoverTemplate6 = ({ type, data }) => {
  const { authorName, selectedTopic, authorImage, selectedSubTopic, croppedImage } = data;


  const authorImageSrc =
    croppedImage instanceof File ? URL.createObjectURL(croppedImage) : croppedImage;

  return (
    <>
      {type === "front" && (
        <div
          className="w-[431px] h-[648px] mx-auto flex flex-col items-center justify-between bg-cover bg-center bg-no-repeat font-montserrat bg-[#000082] text-white py-5"> 
          <div className="">
          <img src="/images/create-book/bg/wave-red.png" alt="" className="w-full"/>
          </div>
          {/* Heading */}
          <div className=" flex flex-col gap-4 max-w-[340px] mx-auto ">
            <div>
             
              <div className="text-[24px] leading-[28px] font-bold  text-center mt-4 font-montserrat">
                {selectedTopic || "Default Topic"}
              </div>
            </div>

            {/* Subheading */}
            <div>
              <div className="text-[18px] text-[#FA423B] font-semibold text-center ">
                {selectedSubTopic || "Default Sub Topic"}
              </div>
            </div>
          </div>
          {/* Image with Text */}
          <div className="flex flex-col w-full pt-4 justify-end "
            style={{
              backgroundImage: "url('/images/create-book/bg/picture-waves-white.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "305px 330px",
              backgroundPosition: "center 0"
            }}>
            <img
              src={authorImageSrc}
              alt={authorName || "Default Author"}
              className="w-[278px] h-[302px] rounded-full object-cover block object-top mx-auto border border-white bg-white"
            />
            <div className="font-montserrat mb-5 mt-6 text-[26px] text-center font-semibold">
              {authorName || "Default Author"}
            </div>
            <img src="/images/create-book/bg/wave-red.png" alt="" className="w-full"/>
          </div>
        </div>
      )}

      {type === "back" && (
        <div
          className="w-[431px] h-[648px] mx-auto flex flex-col items-center justify-between bg-[#000082]"
          
        >
          <img src="images/create-book/bg/bg6-back.png" alt="" />
        </div>
      )}

      {type === "spine" && (

        <div className="h-[648px] flex justify-center relative">
          <div
            className="p-2 bg-[#000082] text-white  h-[57px] bg-cover bg-center bg-no-repeat   flex items-center ] w-[648px] gap-10  justify-between absolute rotate-90 origin-top-left left-[calc(50%+28px)]">
            <img src="/images/create-book/bg/wave-red-spine.png" alt="" className="h-[57px] "/>
            <div className=" flex items-center justify-between text-[18px] font-semibold font-montserrat flex-1">

              <div className=" font-montserrat text-[18px] leading-[20px]">
                {selectedTopic || "Default Topic"}
              </div>



              <div className="font-montserrat text-[17px] leading-[17px] ">
                {authorName || "Default Author"}
              </div>
            </div>
            <img src="/images/create-book/bg/wave-red-spine.png" alt="" className="h-[57px]"/>
          </div>
        </div>
      )}
    </>
  );
};

export default CoverTemplate6;
