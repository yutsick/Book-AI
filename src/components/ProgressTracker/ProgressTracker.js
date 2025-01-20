import React from "react";

const ProgressTracker = ({ activeSteps }) => {
  const stepColors = ["bg-[#B99F0C]", "bg-[#B99F0C]", "bg-[#6ABB63]", "bg-[#35860A]"];
  const inactiveColor = "bg-[#E2E2E2]";
  const stepLabels = ["Good", "Excellent"];


  const label =
    activeSteps >= 3
      ? stepLabels[Math.min(activeSteps - 3, stepLabels.length - 1)]
      : null;

  
  const labelColor = activeSteps > 0
    ? stepColors[Math.min(activeSteps - 1, stepColors.length - 1)].replace("bg-", "")
    : inactiveColor.replace("bg-", "");

    const textColor = labelColor.replace("bg-", "").replace("]", "").replace("[", "");

  return (
    <div className="w-full relative">
      <div className="flex justify-center items-center mt-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="flex flex-col gap-1" key={index}>
            <div
              className={`flex items-center justify-center ${activeSteps > index
                  ? stepColors[Math.min(activeSteps - 1, stepColors.length - 1)]
                  : inactiveColor
                } rounded-full w-20 h-[10px] mx-2`}
            ></div>
          </div>
        ))}
      </div>

      {label && (
        <div className="w-full absolute text-center mt-2">
          <span
            className="text-[12.5px] font-bold"
            style={{ color: textColor }}
          >
            {label}
          </span>

        </div>
      )}
    </div>
  );
};

export default ProgressTracker;
