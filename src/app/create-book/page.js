"use client";

import config from '../../../config';

import React, { useState, useEffect,  useRef }  from "react";
import HeaderQuiz from "@/components/Header/HeaderQuiz";
import HeroQuiz from "@/components/Hero/HeroQuiz";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import MainButton from "@/components/Button/MainButton";

import Step1 from "@/components/QuizSteps/Step1";
import Step2 from "@/components/QuizSteps/Step2";
import Step3 from "@/components/QuizSteps/Step3";



const MainScreen = () => {

  const { createBookStep1 } = config;
  const [faqData, setFaqData] = useState(null);
  const [error, setError] = useState(null);

  const block1Ref = useRef(null);
  const block2Ref = useRef(null);

  const [heroQuizLoaded, setHeroQuizLoaded] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const stepsName = ["Author's Name ", "Genre", "About the Author", "Book Topic", "Book’s Cover", "Preview", "Checkout"];
  const [isMobile, setIsMobile] = useState(false);
  

  const goToNextStep = () => {
    if (isMobile) {

      if (currentStep <= totalSteps) setCurrentStep(currentStep + 1);
    } else {
 
      if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
    }
  };

  
  const goToPreviousStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  useEffect(() => {

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      
    };
    
    handleResize(); 
    

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  useEffect(() => {
    fetch(createBookStep1)
      .then((response) => response.json())
      .then((data) => {

        setFaqData(data)
      })
      .catch((err) => {
        console.error('Error fetching step1 data:', err);
        setError('Failed to load step1 data.');
      });
  }, []);

  useEffect(() => {
    const updateBlock2Width = () => {
      
      if (block1Ref.current && block2Ref.current) {
        block2Ref.current.style.width = `${block1Ref.current.offsetWidth}px`;
      }
    };

    if (heroQuizLoaded) {
      updateBlock2Width();

      window.addEventListener("resize", updateBlock2Width);

      return () => {
        window.removeEventListener("resize", updateBlock2Width);
      };
    }
  }, [heroQuizLoaded]);


  return (
    <div className="min-h-screen bg-[#F9F6EB] flex flex-col items-center pb-16">
    <HeaderQuiz />
    {
      currentStep === 1 && 
      <HeroQuiz 
        block1Ref={block1Ref} 
        block2Ref={block2Ref}
        setHeroQuizLoaded={setHeroQuizLoaded}
      />
    }
    <ProgressBar 
      currentStep={currentStep} 
      totalSteps={totalSteps} 
      stepsName = {stepsName} 
      isMobile={isMobile}
    />
   
    {
      currentStep !== 1 && (
        <div className="flex max-w-[850px] w-full px-4 mx-auto">
          <button onClick={goToPreviousStep} className='pointer'>
            <svg width="33" height="27" viewBox="0 0 33 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.536635 12.1992C-0.179063 12.9149 -0.179063 14.0752 0.536635 14.7909L12.1992 26.4535C12.9148 27.1692 14.0752 27.1692 14.7909 26.4535C15.5065 25.7378 15.5065 24.5775 14.7909 23.8618L4.42414 13.4951L14.7909 3.1283C15.5065 2.4127 15.5065 1.2523 14.7909 0.536699C14.0752 -0.179001 12.9148 -0.179001 12.1992 0.536699L0.536635 12.1992ZM32.0703 11.6625L1.83244 11.6625L1.83244 15.3277L32.0703 15.3277L32.0703 11.6625Z" fill="#747474"/>
            </svg>
          </button>
        </div>
      )
    }
    <div className="max-w-[820px] w-full mx-auto px-4">
      {currentStep === 1 && (
        <Step1 />
      )}
      {currentStep === 2 && (
        <Step2 />
      )}
      {currentStep === 3 && (
        <div className="max-w-[720px]">
        <Step3 
          setIsButtonDisabled={setIsButtonDisabled}
        />
        </div>
      )}

      <MainButton 
        currentStep={currentStep}
        onClick={goToNextStep}  
        disabled={isButtonDisabled}
      />
    </div>
  
      
   
    </div>
  );
};

export default MainScreen;
