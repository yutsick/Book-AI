import React from 'react';
import MainButton from "@/components/Button/MainButton";

function BookPreview({ selectedTemplate, authorName, selectedTopic, selectedSubTopic, goToNextStep, disabled = false, hideButton = false }) {

  return (
    <div>
    <div className="flex   justify-center gap-6 flex-1 md:gap-12 mt-6">

      {selectedTemplate?.front ? (

        <div
          className="relative h-[150px] w-[95px] md:h-[190px] md:w-[135px]"
          style={{
            "--bookWidth": "135px",
            "--bookHeight": "190px",
            "--spineWidth": "16px",
            perspective: "1000px",

            backgroundColor: 'transparent'
          }}
        >
          <div
            className="relative transform-style-3d"
            style={{
              transform: "rotateY(-30deg)",
              transformOrigin: "center center -25px",
              transformStyle: ' preserve-3d',
              width: "100%",
              height: "100%",
              position: "relative",
              zIndex: "2",
            }}
          >
            {/* Front page */}
            <img
              className=""
              style={{
                transform: "translateZ(0)",
                boxShadow: "0 0 15px #999",
                width: "100%",
                height: "100%",


              }}
              src={selectedTemplate.front}
              alt="Book Cover"
            />

            {/* Pages */}
            <div
              className="absolute z-1 bg-white"
              style={{
                width: "var(--spineWidth)",
                height: "100%",
                transformOrigin: "left",
                transform: "rotateY(60deg)",
                borderTop: "1px solid rgba(0, 0, 0, 0.08)",
                borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
                top: '0',
                right: '-16px',
                boxShadow: "8px 0px 6px #eaeaea",
              }}
            >
              <div
                className="absolute w-full h-full"
                style={{
                  background: "linear-gradient(-90deg, transparent 60%, rgba(0, 0, 0, 0.2))",
                }}
              ></div>
            </div>

            {/* Back */}
            <div
              className="absolute z-4 mt-1"
              style={{
                width: "5px",
                transform: "",
                transformOrigin: "",
                right: '-16px',
                top: '-2px',
                height: 'calc(100% - 4px)',
                opacity: '0.7'
              }}
            >
              <img
                src={selectedTemplate.spine}
                alt="Spine"
                className="w-full h-full"
              />

            </div>


          </div>
        </div>


      ) : (
        <p className="text-gray-500 mt-4">No cover selected</p>
      )}
      <div
        className={`flex flex-col justify-between min-h-[210px] md:min-h-[190px] font-inter  w-2/3 md:w-auto`}

      >
        <div className="">
          <div className="text-[#2B2B2B] text-[20px] md:text-[24px] leading-[26px] font-semibold">
            {selectedTopic}
          </div>
          <div className="text-[#2B2B2B]/75 text-[15px] md:text-[18px] mt-2">
            {selectedSubTopic}
          </div>

          <div className="text-[#2B2B2B]  font-medium mt-1.5 md:mt-2">
            by <span className=''>{authorName}</span>
          </div>
        </div>
        <div className="hidden md:block">
          {!hideButton && (
            <MainButton
              text="Next"
              onClick={goToNextStep}
              positionLeft={true}
              disabled={disabled}
              smallButton={true}
            />
          )}
        </div>
      </div>
  </div>
  <div className="md:hidden  f-full max-w-[320px] mx-auto">
          {!hideButton && (
            <MainButton
              text="Next"
              onClick={goToNextStep}
              positionLeft={true}
              disabled={disabled}
              smallButton={true}
            />
          )}
        </div>
    </div>
  )
}

export default BookPreview
