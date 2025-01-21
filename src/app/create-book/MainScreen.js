"use client";



import React, { useState, useEffect } from "react";
import HeaderQuiz from "@/components/Header/HeaderQuiz";
import HeroQuiz from "@/components/Hero/HeroQuiz";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import MainButton from "@/components/Button/MainButton";


import Step1 from "@/components/QuizSteps/Step1";
import Step2 from "@/components/QuizSteps/Step2";
import Step3 from "@/components/QuizSteps/Step3";
import Step4 from "@/components/QuizSteps/Step4";
import Step5 from "@/components/QuizSteps/Step5";
import Step6 from "@/components/QuizSteps/Step6";
import Step7 from "@/components/QuizSteps/Step7";



const MainScreen = () => {

  const totalScreens = 9;
  const totalProgressSteps = 7;



  const [currentStep, setCurrentStep] = useState(1);
  const [progressStep, setProgressStep] = useState(1);
  const [textError, setTextError] = useState(false);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [file, setFile] = useState(null);
  const handleFileChange = (newFile) => {
    setFile(newFile);
  };

  const stepsName = ["Author ", "Genre", "Details", "Title", "Cover", "Preview", "Checkout"];
  const [isMobile, setIsMobile] = useState(false);


  const goToNextStep = () => {
    if (isMobile) {

      if (currentStep <= totalScreens) setCurrentStep(currentStep + 1);
    } else {

      if (currentStep < totalScreens) setCurrentStep(currentStep + 1);
    }
  };


  const handleFileUpload = async () => {
    goToNextStep();
    if (!file) return;
    // setLoading(true);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(uploadEndpoint, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();

      // setLoading(false);
      if (response.ok) {
        onUploadComplete(result);
        setFile(null);
        setPreview(null);
      } else {
        setError(result.message || 'Failed to upload image');
      }
    } catch (err) {
      // setLoading(false);
      setError(err.message || 'Error uploading image');
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






  return (
    <div className="min-h-screen bg-[#F9F6EB] flex flex-col items-center pb-36">
      <HeaderQuiz />
      {
        currentStep === 1 &&
        <HeroQuiz />
      }
      <ProgressBar
        progressStep={progressStep}
        currentStep={currentStep}
        totalSteps={totalProgressSteps}
        stepsName={stepsName}
        isMobile={isMobile}
      />

      {
        currentStep !== 1 && (
          <div className="flex max-w-[850px] w-full px-4 mx-auto -mt-4">
            <button onClick={goToPreviousStep} className='pointer'>
              <svg width="33" height="27" viewBox="0 0 33 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.536635 12.1992C-0.179063 12.9149 -0.179063 14.0752 0.536635 14.7909L12.1992 26.4535C12.9148 27.1692 14.0752 27.1692 14.7909 26.4535C15.5065 25.7378 15.5065 24.5775 14.7909 23.8618L4.42414 13.4951L14.7909 3.1283C15.5065 2.4127 15.5065 1.2523 14.7909 0.536699C14.0752 -0.179001 12.9148 -0.179001 12.1992 0.536699L0.536635 12.1992ZM32.0703 11.6625L1.83244 11.6625L1.83244 15.3277L32.0703 15.3277L32.0703 11.6625Z" fill="#747474" />
              </svg>
            </button>
          </div>
        )
      }
      <div className="max-w-[820px] w-full mx-auto px-4 md:px-14">
        <div className="mb-12">
          {currentStep === 1 && (
            <div className="">

              <Step1
                setIsButtonDisabled={setIsButtonDisabled}
                setProgressStep={setProgressStep}
                textError={textError}
                setTextError={setTextError}
              />
            </div>
          )}
          {currentStep === 2 && (
            <div className="">
             

                <Step2
                  setIsButtonDisabled={setIsButtonDisabled}
                  setProgressStep={setProgressStep}
                />
          
            </div>
          )}
          {currentStep === 3 && (
            <div className="">
              <Step3
                textError={textError}
                setIsButtonDisabled={setIsButtonDisabled}
                setProgressStep={setProgressStep}
              />
            </div>
          )}
          {currentStep === 4 && (
            <div className="">
              <Step4
                setIsButtonDisabled={setIsButtonDisabled}
                setProgressStep={setProgressStep}
              />
            </div>
          )}

          {currentStep === 5 && (
            <div className="">
              <Step5
              setIsButtonDisabled={setIsButtonDisabled}
                setProgressStep={setProgressStep}
              />
            </div>
          )}
          {currentStep === 6 && (
            <div className="">
              <Step6
                setProgressStep={setProgressStep}
                handleFileChange={handleFileChange}
              />
            </div>
          )}
          {currentStep === 7 && (
            <div className="">
              <Step7 setProgressStep={setProgressStep} />
            </div>
          )}



        </div>
        {
          currentStep < totalScreens && (

            <MainButton
              currentStep={currentStep}
              onClick={currentStep === 6 ? handleFileUpload : goToNextStep}
              disabled={isButtonDisabled}
            />

          )
        }


      </div>



    </div>
  );
};

export default MainScreen;
