import React from "react";

const ProgressTracker = ({ activeSteps }) => {
  // Кольори для кожного активного кроку
  const stepColors = ["bg-[#B99F0C]", "bg-[#2796D6]", "bg-[#6ABB63]", "bg-[#35860A]"];

  // Мітки для кожного кроку
  const stepLabels = ["Short", "Okey", "Good", "Excellent"];

  return (
    <div className="w-full">
      {/* Прогрес-бар */}
      <div className="flex justify-center items-center mt-2">
        {stepColors.map((color, index) => (
          <div className="flex flex-col gap-1" key={index}>
            <div
              
              className={`flex flex-col items-center justify-center ${
                index < activeSteps ? color : "bg-[#E2E2E2]"
              } rounded-full w-20 h-[10px] mx-2`}
            ></div>
              <span className="text-[12] text-[#797979] text-center">
                {stepLabels[index]}
              </span>
          
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;
