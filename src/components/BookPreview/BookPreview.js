import React from 'react'

function BookPreview({selectedTemplate, authorName, selectedTopic, goToNextStep}) {
  return (
    <div className="flex items-center  justify-center gap-4 flex-1 md:gap-12 mt-6">
       
        {selectedTemplate?.front ? (

          <div
            className="relative"
            style={{
              width: "150px",
              height: "243px",
              "--bookWidth": "150px",
              "--bookHeight": "293px",
              "--spineWidth": "29px",
              perspective: "1000px",
            
              backgroundColor: 'transparent'
            }}
          >
            <div
              className="relative transform-style-3d"
              style={{
                transform: "rotateY(-30deg)",
                transformOrigin: "center center -25px",
                transformStyle: ' preserve-3d'
              }}
            >
              {/* Front page */}
              <img
                className=""
                style={{ 
                  transform: "translateZ(0)" ,
                  boxShadow: "0 0 25px #999",

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
                  right: '-24px',
                  boxShadow: "16px 0px 10px #eaeaea",
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
                  right: '-27px',
                  top: '0',
                  height: 'calc(100% - 8px)',
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
        className={`flex flex-col  text-[18px]  w-2/3 md:w-auto ${goToNextStep ? "cursor-pointer" : ""} `}
        onClick={goToNextStep ? goToNextStep : undefined}
        >
          <div className="text-[#2B2B2B] md:text-[24px] font-bold">
            {selectedTopic}
          </div>
          <div className="text-[#2B2B2B] md:text-[22px] font-bold">
            by <span className='italic'>{authorName}</span>
          </div>
        </div>
      </div>
  )
}

export default BookPreview
