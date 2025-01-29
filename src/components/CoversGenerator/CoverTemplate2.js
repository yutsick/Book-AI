import React, { useEffect, useRef, useState } from "react";

const CoverTemplate2 = ({ type, data }) => {
  const { authorName, selectedTopic, authorImage, selectedSubTopic, processedAuthorImage } = data;

  // Перетворення `File` на URL, якщо потрібно
  const authorImageSrc =
    authorImage instanceof File ? URL.createObjectURL(authorImage) : authorImage;

  // Референси для елементів
  const titleRef = useRef(null);
  const subTitleRef = useRef(null);

  // Стани для шрифтів
  const [titleFontSize, setTitleFontSize] = useState(50);
  const [subTitleFontSize, setSubTitleFontSize] = useState(20);

  useEffect(() => {
    // Розрахунок шрифту для заголовка
    const calculateFontSize = (elementRef, maxFontSize, maxHeight) => {
      const element = elementRef.current;
      if (!element) return maxFontSize;

      // Початковий розмір
      let fontSize = maxFontSize;
      element.style.fontSize = `${fontSize}px`;

      // Зменшувати розмір шрифту, поки текст не вміститься
      while (element.scrollHeight > maxHeight && fontSize > 10) {
        fontSize -= 1;
        element.style.fontSize = `${fontSize}px`;
      }

      return fontSize;
    };

    // Встановлення розміру для заголовка та підзаголовка
    const newTitleFontSize = calculateFontSize(titleRef, 50, 150); // Заголовок: максимум 50px, висота 300px
    const newSubTitleFontSize = calculateFontSize(subTitleRef, 20, 60); // Підзаголовок: максимум 20px, висота 50px

    setTitleFontSize(newTitleFontSize);
    setSubTitleFontSize(newSubTitleFontSize);
  }, [selectedTopic, selectedSubTopic]);

  return (
    <>
      {/* Front Cover */}
      {type === "front" && (
        <div className="w-[431px] h-[648px] bg-black mx-auto flex flex-col items-center justify-between bg-cover bg-center bg-no-repeat font-degular">
          {/* Heading */}
          <div className="w-full relative h-[433px]">
            <img
              // src={authorImageSrc}
              src={processedAuthorImage}
              alt={authorName || "Default Author"}
              className="w-full h-full object-cover block"
            />
            <div className="absolute top-[50px] text-[20px] font-bold left-[36px] text-white">
              {authorName || "Default Author"}
            </div>
          </div>

          {/* Заголовки */}
          <div className="flex flex-col h-full justify-cener gap-4 bg-[#BB2621] px-8 flex-1">
            {/* Заголовок */}
            <div
              ref={titleRef}
              className="font-black text-white mt-4"
              style={{
                fontSize: `${titleFontSize}px`,
                lineHeight: `${titleFontSize}px`,
              }}
            >
              {selectedTopic || "Default Topic"}
            </div>

            {/* Підзаголовок */}
            <div
              ref={subTitleRef}
              className="font-semibold text-white"
              style={{
                fontSize: `${subTitleFontSize}px`,
              }}
            >
              {selectedSubTopic || "Default Sub Topic"}
            </div>
          </div>
        </div>
      )}

      {/* Back Cover */}
      {type === "back" && (
        <div className="w-[431px] h-[648px] mx-auto flex flex-col items-center justify-between space-y-6 bg-cover bg-center bg-no-repeat">
          <img src="images/create-book/bg/bg2-back.png" alt="Back Cover" />
        </div>
      )}

      {/* Spine */}
      {type === "spine" && (
        <div className="h-[648px] flex justify-center relative">
          <div className="flex items-center h-[57px] w-[648px] gap-10 pl-2  bg-black justify-between absolute rotate-90 origin-top-left left-[calc(50%+28px)] font-degular fot-black">
            <div className="text-white flex flex-col justify-center text-[18px] font-black font-degular">
              <div>{selectedTopic || "Default Topic"}</div>
            </div>

            <div className="text-white flex flex-col justify-center items-end text-[18px] font-degular h-full w-[215px] bg-[#BB2621] p-2 ">
              <div>{authorName || "Default Author"}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CoverTemplate2;
