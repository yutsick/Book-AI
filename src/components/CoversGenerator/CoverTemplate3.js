import React from "react";

const CoverTemplate3 = ({ type, data }) => {
  const { authorName, selectedTopic, selectedSubTopic, croppedImage } = data;
  // Перетворення `File` на URL, якщо потрібно
  const authorImageSrc =
    croppedImage instanceof File ? URL.createObjectURL(croppedImage) : croppedImage;

  return (
    <>
      {type === "front" && (
        <div
          className="w-[431px] h-[648px] mx-auto flex flex-col items-center justify-between bg-cover bg-center bg-no-repeat font-caveat text-[#000082]"
          style={{ backgroundImage: "url('/images/create-book/bg/bg3.png')" }}
        >
          {/* Heading */}
          <div className=" flex flex-col gap-4 max-w-[75%] mx-auto ">
          <div>
            <div className="text-[44px] leading-[44px] font-bold t text-center mt-6 -rotate-1">
              {selectedTopic || "Default Topic"}
            </div>
          </div>

          {/* Subheading */}
          <div>
            <div className="text-[28px] leading-[28px]  text-center ">
              {selectedSubTopic || "Default Sub Topic"}
            </div>
          </div>
          </div>
          {/* Image with Text */}
          <div className="flex flex-col w-full flex-1 relative mt-10">
           <div className=" w-[300px] h-[360px] mx-auto shadow rotate-[-2deg] border-[3px] border-white bg-black">

           
            <img
              src={authorImageSrc}
              alt={authorName || "Default Author"}
              className="  w-full h-full object-cover block  "
            />
            </div>
             
              <div className="absolute top-[-10px] left-10">
                <img src="images/create-book/bg/pag1.png" alt="" />
              </div>
              <div className="absolute top-[-45px] right-10">
                <img src="images/create-book/bg/pag2.png" alt="" />
              </div>
            
            <div className="pb-2 text-[28px] mx-auto shadow max-w-[80%] bg-white h-[46px] w-full flex items-center justify-center rotate-[2deg] ">
              {authorName || "Default Author"}
            </div>
          </div>
        </div>
      )}

      {type === "back" && (
        <div
          className="w-[431px] h-[648px] mx-auto flex flex-col items-center justify-between space-y-6 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/create-book/bg/bg3.png')" }}
        >
          <img src="images/create-book/bg/bg3-back.png" alt="" />
        </div>
      )}

      {type === "spine" && (
   
        <div className="h-[648px] flex justify-center relative">
          <div
            className="p-2  h-[57px] bg-cover bg-center bg-no-repeat   flex items-center ] w-[648px] gap-10  justify-between absolute rotate-90 origin-top-left left-[calc(50%+28px)]"
            style={{ backgroundImage: "url('/images/create-book/bg/bg3-spine.png')" }}
          >
            <div className=" flex items-center justify-center gap-16 text-[18px] absolute font-bold font-caveat flex-1 text-[#000082]">

              <div className="text-[44px] leading-[22px] pb-2">
                {selectedTopic || "Default Topic"}
              </div>



              <div className="text-[28px]  pb-2">
                {authorName || "Default Author"}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CoverTemplate3;
