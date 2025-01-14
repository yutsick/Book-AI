"use client";

import config from "../../../config";
import { useEffect, useState } from "react";

const HeroQuiz = ({ block1Ref, block2Ref, setHeroQuizLoaded }) => {
  const { heroQuizUrl } = config;
  const [heroQuizData, setHeroQuizData] = useState(null);

  useEffect(() => {
    fetch(heroQuizUrl)
      .then((response) => response.json())
      .then((data) => {
        setHeroQuizData(data);
        setHeroQuizLoaded(true); 
      })
      .catch((error) => {
        console.error("Error fetching Hero Quiz data:", error);
      });
  }, [heroQuizUrl]);

  return heroQuizData ? (
    <div
      style={{
        backgroundImage: `
        linear-gradient(185.33deg, rgba(33, 33, 33, 0.85) 3.99%, rgba(14, 14, 14, 0.6715) 23.97%, rgba(10, 10, 10, 0.6375) 42.27%, rgba(8, 8, 8, 0.442) 63.34%, rgba(6, 6, 6, 0.330616) 78.44%, rgba(0, 0, 0, 0.0595) 95.49%), 
        url(${heroQuizData.imgUrl})
      `,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center 93%",
      }}
      className="flex flex-col items-center justify-center md:mt-4 mt-2 w-full pb-[70px] md:pb-[145px]"
    >
      <h1 className="text-[32px] md:text-[46px] leading-[36px] font-bold text-orange mt-3 md:mt-[44px]">
        Let's Bring Your Story to Life
      </h1>
      <p
        ref={block1Ref}
        className="text-white opacity-[0.88] text-[18px] md:text-[26px] leading-[26px] font-semibold mt-5 md:mt-10 w-auto"
      >
        Answer a few quick questions to start creating your book — it won’t take
        more than 5 minutes!
      </p>
      <p
        ref={block2Ref}
        className="text-white opacity-[0.88] text-[18px] font-semibold hidden md:block mt-4 text-start w-auto"
      >
        Simply share your book’s topic, choose a genre, and let our AI bring
        your ideas to life. You’ll see a complete manuscript tailored to your
        vision in no time.
      </p>
    </div>
  ) : null;
};

export default HeroQuiz;
