import React, { useEffect, useContext } from 'react';
import CreateBookContext from '@/contexts/CreateBookContext';
import GenreContext from '@/contexts/CreateGenreContext';
import TableOfContents from '../TableOfContents/TableOfContents';

function Step8({ setProgressStep, goToNextStep }) {
  const { selectedTemplate, authorName } = useContext(CreateBookContext);
  const { selectedTopic } = useContext(GenreContext);

  const contents = [
    { chapter: "Chapter 1: A Caffeinated Introduction to Chaos", title: "Dive into Catarina's chaotic life as a UX designer, fueled by coffee and laughter", page: 1 },
    { chapter: "Chapter 2: Running Late: The Half Marathon Dilemma", title: "Training for a half marathon while managing work and social life challenges", page: 13 },
    { chapter: "Chapter 3: Dogs: The Best Employees (Fight Me)", title: "Catarina's marathon training journey intertwines with her coffee rituals and podcast inspirations, testing her resilience", page: 25 },
    { chapter: "Chapter 4: Designing for Life: Coffee Break Insights", title: "Transforming Elm Coffee Roasters into a creative studio for brainstorming", page: 37 },
    { chapter: "Chapter 5: Photogenic Friends: Capturing Moments", title: "Catarina and Sarah navigate weekends filled with coffee and photography adventures", page: 49 },
    { chapter: "Chapter 6: Yoga Laughs: Namaste or Not?", title: "Finding balance in yoga classes and the joy of friendship with Emily", page: 61 },
    { chapter: "Chapter 7: Family Matters: Designing Bonds", title: "Catarina’s family dynamics explored through the lens of design and humor", page: 73 },
    { chapter: "Chapter 8: The Vintage Vinyl Crisis", title: "A hilarious exploration of music debates that almost lead to a design disaster", page: 85 },
    { chapter: "Chapter 9: Harry Potter: The UX Design Manual", title: "Lessons from Hogwarts that help Catarina navigate her chaotic design work", page: 97 },
    { chapter: "Chapter 10: Coffee: Fuel or Crutch?", title: "Understanding the fine line between coffee-induced creativity and sleepless nights", page: 109 },
    { chapter: "Chapter 11: Hiking with Dogs: A Scenic Disaster", title: "A hiking trip with Luna and Pepper turns into a comedy of errors", page: 121 },
    { chapter: "Chapter 12: A Design Challenge: Life Arrangements", title: "Reorganizing her life like a design project leads to unexpected revelations", page: 133 },
    { chapter: "Chapter 13: Caffeine Overload: The Prototype", title: "When too much coffee unlocks a new level of creativity and chaos", page: 145 },
    { chapter: "Chapter 14: Saturday Morning Rituals: Coffee and Confessions", title: "Unraveling personal secrets over brewed perfection with Sarah", page: 157 },
    { chapter: "Chapter 15: The Art of Saying No (Sometimes)", title: "Catarina learns when to prioritize her sanity over social obligations", page: 169 },
    { chapter: "Chapter 16: Architectural Adventures: Balancing Work and Life", title: "David’s architectural antics add humor to Catarina’s busy design world", page: 181 },
    { chapter: "Chapter 17: Career Chaos: Designing Under Pressure", title: "Navigating tight deadlines and the hilarious mishaps that ensue", page: 193 },
    { chapter: "Chapter 18: Conversations with Coffee: Mix and Mingle", title: "Witty banter and deep discussions with the baristas at Elm Coffee Roasters", page: 205 },
    { chapter: "Chapter 19: The Grand Finale: Marathon Madness", title: "Embracing the chaos of the half marathon, friendships, and personal triumphs", page: 217 },
    { chapter: "Chapter 20: Reflecting on Chaos: Lessons Learned", title: "Catarina ties together her experiences, offering wisdom from a chaotic life", page: 229 }
  ];
  

  useEffect(() => {
    setProgressStep(6);
  }, [setProgressStep]);

  return (
    <div className="flex flex-col  gap-2">
      <div className="text-[30px] font-bold text-center text-orange">
        Your Book
      </div>
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
        className="flex flex-col  text-[18px]  w-2/3 md:w-auto cursor-pointer"
        onClick={goToNextStep}
        >
          <div className="text-[#2B2B2B] md:text-[24px] font-bold">
            {selectedTopic}
          </div>
          <div className="text-[#2B2B2B] md:text-[22px] font-bold">
            by <span className='italic'>{authorName}</span>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center items-center ">
      <TableOfContents contents={contents} />
      </div>
    </div>
  );
}

export default Step8;
