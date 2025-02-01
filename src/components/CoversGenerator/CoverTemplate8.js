import React, { useEffect, useRef, useState } from "react";

const CoverTemplate8 = ({ type, data }) => {
  const { authorName, selectedTopic, authorImage, selectedSubTopic, croppedImage } = data;


  const authorImageSrc =
    croppedImage instanceof File ? URL.createObjectURL(croppedImage) : croppedImage;

  const titleRef = useRef(null);
  const subTitleRef = useRef(null);

  const [titleFontSize, setTitleFontSize] = useState(27);
  const [subTitleFontSize, setSubTitleFontSize] = useState(20);

  useEffect(() => {

    const calculateFontSize = (elementRef, maxFontSize, maxHeight) => {
      const element = elementRef.current;
      if (!element) return maxFontSize;

 
      let fontSize = maxFontSize;
      element.style.fontSize = `${fontSize}px`;


      while (element.scrollHeight > maxHeight && fontSize > 10) {
        fontSize -= 1;
        element.style.fontSize = `${fontSize}px`;
      }

      return fontSize;
    };


    const newTitleFontSize = calculateFontSize(titleRef, 27, 80);
    const newSubTitleFontSize = calculateFontSize(subTitleRef, 20, 65);

    setTitleFontSize(newTitleFontSize);
    setSubTitleFontSize(newSubTitleFontSize);
  }, [selectedTopic, selectedSubTopic]);

  return (
    <>
      {/* Front Cover */}
      {type === "front" && (
        <div className="w-[431px] h-[648px] bg-white p-3 mx-auto ">
          <div className="relative h-full w-full  flex flex-col items-center justify-between "
            style={{ backgroundImage: "url('/images/create-book/bg/bg8.png')" }}
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


                <div className=" max-w-[300px] w-full pb-[70px] relative"
         
                >
                  <img src="/images/create-book/bg/title8.png" alt="" />
                  <div className=" max-w-[260px] font-degular absolute top-10 left-10">
                    {/* Title */}
                    <div
                      className=" font-black max-w-[200px]"
                      ref={titleRef}
                      style={{
                        fontSize: `${titleFontSize}px`,
                        lineHeight: `${titleFontSize}px`,
                      }}
                    >
                      {selectedTopic || "Default Topic"}
                    </div>

                    {/* Subheading */}

                    <div
                      ref={subTitleRef}
                      style={{
                        fontSize: `${subTitleFontSize}px`,
                        lineHeight: `${titleFontSize*0.8}px`,
                      }}
                      className="mt-1 font-degular font-semibold max-w-[200px]"
                    >
                      {selectedSubTopic || "Default Sub Topic"}
                    </div>

                  </div>
                </div>

                <div className="h-[80px] flex items-center justify-center font-bold "
                  style={{
                    backgroundImage: "url('/images/create-book/bg/author8.png')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center"
                  }}
                >

                  <div className="text-black rotate-[-2deg] font-degular mt-4 font-bold text-[26px]">{authorName || "Default Author"}</div>
                </div>

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

          <div className="flex text-black font-black  items-center h-[57px] w-[648px]  px-4 bg-white justify-center absolute rotate-90 origin-top-left left-[calc(50%+28px)] gap-16 font-degular">

            <div className="flex pb-1 flex-col justify-center items-center text-[28px] leading-[28px] tracking-[0.01em] h-full">
              <div>{selectedTopic || "Default Topic"}</div>
            </div>

            <div className="flex flex-col justify-center items-center text-[17px]   h-full  ">
              <div>{authorName || "Default Author"}</div>
            </div>
          </div>
        </div>

      )}
    </>
  );
};

export default CoverTemplate8;
