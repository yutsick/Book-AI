import React, { useEffect, useContext } from 'react';
import CreateBookContext from '@/contexts/CreateBookContext';
import GenreContext from '@/contexts/CreateGenreContext';
import TableOfContents from '../TableOfContents/TableOfContents';

function Step8({ setProgressStep }) {
  const { selectedTemplate, authorName } = useContext(CreateBookContext);
  const { selectedTopic } = useContext(GenreContext);

  const contents = [
    { chapter: "Chapter 1: Pedals and Pawns", title: "The Art of Failing Forward, lessons from the Chessboard and the Open Road", page: 3 },
    { chapter: "Chapter 2: The Psychology of Grit", title: "Mastering the Mind Game. How Small Wins Build Resilience", page: 12 },
    { chapter: "Chapter 3: Strategic Thinking in Motion", title: "Planning Moves Ahead in Life Risk vs. Reward: When to Push and When to Hold Back", page: 35 },
    { chapter: "Chapter 4: Navigating Setbacks", title: "Recovering from Losses on the Board and in Life", page: 58 },
    { chapter: "Chapter 5: The Power of Positioning", title: "Finding the Right Place, Time, and Perspective", page: 71 },
    { chapter: "Chapter 6: The Endgame", title: "Finishing Strong: When Every Move Counts. Achieving Clarity Under Pressure", page: 99 },
    { chapter: "Chapter 7: Balance Between Strategy and Instinct", title: "Trusting Your Gut While Staying Rational. Combining Creativity with Logic", page: 106 },
  ];

  useEffect(() => {
    setProgressStep(6);
  }, [setProgressStep]);

  return (
    <div className="flex flex-col  gap-8">
      <div className="text-[30px] font-bold text-center text-orange">
        Your Book
      </div>
      <div className="flex items-center  justify-center gap-12 mt-6">
        {/* 🔥 Виводимо картинку, якщо вона є */}
        {selectedTemplate?.front ? (

          <div
            className="relative"
            style={{
              width: "195px",
              height: "293px",
              "--bookWidth": "195px",
              "--bookHeight": "293px",
              "--spineWidth": "27px",
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
              {/* Передня обкладинка */}
              <img
                className=""
                style={{ 
                  transform: "translateZ(0)" ,
                  boxShadow: "0 0 25px #999",

                }}
                src={selectedTemplate.front}
                alt="Book Cover"
              />

              {/* Сторінки */}
              <div
                className="absolute z-1 bg-white"
                style={{
                  width: "var(--spineWidth)",
                  height: "100%",
                  // transform: "rotateY(90deg) translateZ(calc(var(--bookWidth) - 2px))",
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

              {/* Корінець */}
              <div
                className="absolute z-4 mt-1"
                style={{
                  width: "8px",
                  // height: "100%",
                  transform: "",
                  transformOrigin: "",
                  right: '-25px',
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



          // <img 
          //   src={selectedTemplate.front} 
          //   alt="Book Cover" 
          //   className="mt-4 w-[300px] h-auto rounded-lg shadow-lg"
          // />
        ) : (
          <p className="text-gray-500 mt-4">No cover selected</p>
        )}
        <div className="flex flex-col text-center">
          <div className="text-[#2B2B2B] text-[24px] font-bold">
            {selectedTopic}
          </div>
          <div className="text-[#2B2B2B] text-[22px] font-bold">
            by <span className='italic'>{authorName}</span>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center items-center mt-10">
      <TableOfContents contents={contents} />
      </div>
    </div>
  );
}

export default Step8;
