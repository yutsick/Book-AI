import React from "react";

const ProgressTracker = ({ activeSteps }) => {
  const totalSteps = 4; 
  const stepColors = ["bg-[#D9C031]", "bg-[#C19828]", "bg-[#6ABB63]", "bg-[#35860A]"]; 
  const stepLabels = [" "," ","Good", "Excellent"]; 

  const progressWidth = `${(activeSteps / totalSteps) * 100}%`;

  const fillColor =
    stepColors[Math.min(activeSteps - 1, stepColors.length - 1)] || "bg-[#E2E2E2]";
  
  const label = stepLabels[activeSteps - 1 ] || " ";
  return (
    <div className=" flex-col items-center md:relative mx-auto w-full md:w-[calc(66%+140px)] flex justify-center">
      
      <div className=" w-3/5 md:w-3/4 h-4 bg-[#E2E2E2] rounded-md overflow-hidden ">
        
        <div
          className={`h-full ${fillColor} transition-all duration-300`}
          style={{ width: progressWidth }}
        ></div>
      </div>

      
      {label && (
        <div
          className={`h-[20px] md:h-auto md:mt-0 mt-2 md:absolute right-0 md:top-1/2 md:transform md:-translate-y-1/2 text-[12.5px] font-bold`}
          style={{ color: fillColor.replace("bg-[", "").replace("]", "") }} 
        >
          {label}
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;
