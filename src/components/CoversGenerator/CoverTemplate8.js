import React from "react";

const CoverTemplate8 = ({ type, data }) => {
  const { authorName, selectedTopic, authorImage, selectedSubTopic } = data;

  // Перетворення `File` на URL, якщо потрібно
  const authorImageSrc =
    croppedImage instanceof File ? URL.createObjectURL(croppedImage) : croppedImage;

  return (
    <>
      {/* Front Cover */}
      {type === "front" && (
        <div className="relative w-[431px] h-[648px] bg-[#747778] mx-auto flex flex-col items-center justify-between "

        >
          {/* Heading */}
          <div className="w-full  h-full">
            <img
              src={authorImageSrc}
              alt={authorName || "Default Author"}
              className="w-full h-full object-cover block"
            />

          </div>

          <div className="absolute w-full h-full top-0 left-0 flex flex-col justify-center items-center gap-4  px-8 text-center flex-1  text-black  pt-14 pb-11">



            <div className="text-left text-[20px] h-full flex flex-col justify-between w-full">


              <div className=" max-w-[300px] w-full pb-[90px]"
                style={{
                  backgroundImage: "url('/images/create-book/bg/title8.png')",
                  backgroundRepeat: "no-repeat"
                }}
              >
                <div className=" max-w-[280px] mx-auto mt-5 ml-[52px]">
                  {/* Title */}
                  <div className="text-[20px] font-bold max-w-[200px]">
                    {selectedTopic || "Default Topic"}
                  </div>

                  {/* Subheading */}

                  <div className="text-[16px]  font-roboto max-w-[200px]">
                    {selectedSubTopic || "Default Sub Topic"}
                  </div>

                </div>
              </div>

              <div className="h-[80px] flex items-center justify-center font-bold "
                style={{
                  backgroundImage: "url('/images/create-book/bg/author8.png')",
                  backgroundRepeat: "no-repeat"
                }}
              >

                <div className="text-black font-inter mt-2 font-bold text-[26px]">{authorName || "Default Author"}</div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* Back Cover */}
      {type === "back" && (
        <div
          className="w-[431px] h-[648px] mx-auto flex flex-col items-center justify-between space-y-6 bg-cover bg-center bg-no-repeat bg-white"

        >
          <img src="images/create-book/bg/bg8-back.png" alt="Back Cover" />
        </div>
      )}

      {type === "spine" && (

        <div className="h-[648px] flex justify-center relative">

          <div className="flex text-black items-center h-[57px] w-[648px]  px-20 bg-white justify-between absolute rotate-90 origin-top-left left-[calc(50%+28px)] gap-16">

            <div className="flex  flex-col justify-center items-center text-[22px] italic ">
              <div>{selectedTopic || "Default Topic"}</div>
            </div>

            <div className="flex font-black flex-col justify-center items-center text-[17px]  font-inter h-full  ">
              <div>{authorName || "Default Author"}</div>
            </div>
          </div>
        </div>

      )}
    </>
  );
};

export default CoverTemplate8;
