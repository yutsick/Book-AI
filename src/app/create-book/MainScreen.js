"use client";

import React, { useState, useEffect, useContext } from "react";
import HeaderQuiz from "@/components/Header/HeaderQuiz";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import MainButton from "@/components/Button/MainButton";
import CreateGenreContext from "@/contexts/CreateGenreContext";
import CreateBookContext from "@/contexts/CreateBookContext";
import useCreateDraft from "@/hooks/useCreateDraft"

import Step1 from "@/components/QuizSteps/Step1";
import Step2 from "@/components/QuizSteps/Step2";
import Step3 from "@/components/QuizSteps/Step3";
import Step4 from "@/components/QuizSteps/Step4";
import Step5 from "@/components/QuizSteps/Step5";
import Step6 from "@/components/QuizSteps/Step6";
import Step7 from "@/components/QuizSteps/Step7";
import Step8 from "@/components/QuizSteps/Step8";
import Step9 from "@/components/QuizSteps/Step9";
import Step10 from "@/components/QuizSteps/Step10";

const MainScreen = () => {
  const totalScreens = 10;
  const totalProgressSteps = 7;

  const [currentStep, setCurrentStep] =   useState(() => {
    const savedStep = localStorage.getItem("currentStep");
    return savedStep ? parseInt(savedStep) : 1;
  });
  const [progressStep, setProgressStep] = useState(1)  
  const [textError, setTextError] = useState(false);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [file, setFile] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const [loader, setLoader] = useState(false);

  const stepsName = [
    "Author ",
    "Genre",
    "Details",
    "Title",
    "Cover",
    "Preview",
    "Checkout",
  ];

  const [isLoaded, setIsLoaded] = useState(false);

  const { selectedTopic, selectedGenre } = useContext(CreateGenreContext);
  const { authorName, authorEmail, selectedAge, selectedGender, questionsAndAnswers} = useContext(CreateBookContext);


  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 300);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [currentStep]);

  const goToNextStep = () => {
    if (isMobile) {
      if (currentStep <= totalScreens) setCurrentStep(currentStep + 1);
    } else {
      if (currentStep < totalScreens) setCurrentStep(currentStep + 1);
    }
    setLocalData('currentStep',currentStep + 1,);
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
    setLocalData('currentStep',currentStep - 1,);
  };

  const setLocalData = (keyData, data) => {
    localStorage.setItem(keyData, JSON.stringify(data));
  };

  const handleFileChange = (newFile) => {
    setFile(newFile);
  };

  const handleFileUpload = async () => {
    goToNextStep();
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(uploadEndpoint, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (response.ok) {
        onUploadComplete(result);
        setFile(null);
      } else {
        setError(result.message || "Failed to upload image");
      }
    } catch (err) {
      setError(err.message || "Error uploading image");
    }
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
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && !isButtonDisabled) {
        if (currentStep === 6) {
          handleFileUpload();
        } else if (currentStep !== 3) {

          goToNextStep();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isButtonDisabled, currentStep, file]);

  const createDraft = useCreateDraft();

  const handleDraftCreation = async () => {
    await createDraft();
    goToNextStep();
  };

  return (
    <div
      className="min-h-screen bg-[#F9F6EB] flex flex-col items-center pb-[72px] md:pb-36"
      style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.3s ease-in-out" }}
    >
      {currentStep === 1 && <HeaderQuiz />}
      {/* {currentStep === 1 && <HeroQuiz />} */}
      <ProgressBar
        progressStep={progressStep}
        currentStep={currentStep}
        totalSteps={totalProgressSteps}
        stepsName={stepsName}
        isMobile={isMobile}
      />

      {currentStep !== 1 && (
        <div className="flex max-w-[850px] w-full px-5 mx-auto -mt-4">
          <button onClick={goToPreviousStep} className="pointer">
            {isMobile ? <svg
              width="30"
              height="20"
              viewBox="0 0 33 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.536635 12.1992C-0.179063 12.9149 -0.179063 14.0752 0.536635 14.7909L12.1992 26.4535C12.9148 27.1692 14.0752 27.1692 14.7909 26.4535C15.5065 25.7378 15.5065 24.5775 14.7909 23.8618L4.42414 13.4951L14.7909 3.1283C15.5065 2.4127 15.5065 1.2523 14.7909 0.536699C14.0752 -0.179001 12.9148 -0.179001 12.1992 0.536699L0.536635 12.1992ZM32.0703 11.6625L1.83244 11.6625L1.83244 15.3277L32.0703 15.3277L32.0703 11.6625Z"
                fill="#747474"
              />
            </svg> :

              <svg
                width="26"
                height="18"
                viewBox="0 0 33 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.536635 12.1992C-0.179063 12.9149 -0.179063 14.0752 0.536635 14.7909L12.1992 26.4535C12.9148 27.1692 14.0752 27.1692 14.7909 26.4535C15.5065 25.7378 15.5065 24.5775 14.7909 23.8618L4.42414 13.4951L14.7909 3.1283C15.5065 2.4127 15.5065 1.2523 14.7909 0.536699C14.0752 -0.179001 12.9148 -0.179001 12.1992 0.536699L0.536635 12.1992ZM32.0703 11.6625L1.83244 11.6625L1.83244 15.3277L32.0703 15.3277L32.0703 11.6625Z"
                  fill="#747474"
                />
              </svg>
            }
          </button>
        </div>
      )}

      <div className="max-w-[820px] w-full mx-auto px-6 md:px-14">
        <div className={`${currentStep == 7 ? "mb-10" : "mb-[50px]"}`}>
          {currentStep === 1 && (
            <Step1
              setIsButtonDisabled={setIsButtonDisabled}
              setProgressStep={setProgressStep}
              textError={textError}
              setTextError={setTextError}
            />
          )}
          {currentStep === 2 && (
            <Step2
              setIsButtonDisabled={setIsButtonDisabled}
              setProgressStep={setProgressStep}
            />
          )}
          {currentStep === 3 && (
            <Step3
              textError={textError}
              setIsButtonDisabled={setIsButtonDisabled}
              setProgressStep={setProgressStep}
            />
          )}
          {currentStep === 4 && (
            <Step4
              setIsButtonDisabled={setIsButtonDisabled}
              setProgressStep={setProgressStep}
            />
          )}
          {currentStep === 5 && (
            <Step5
              setIsButtonDisabled={setIsButtonDisabled}
              setProgressStep={setProgressStep}
            />
          )}
          {currentStep === 6 && (
            <Step6
              setProgressStep={setProgressStep}
              setIsButtonDisabled={setIsButtonDisabled}
              setLoader={setLoader}
            />
          )}
          {currentStep === 7 &&
            <Step7
              setProgressStep={setProgressStep}
              setIsButtonDisabled={setIsButtonDisabled}
            />}
          {currentStep === 8 &&
            <Step8
              setProgressStep={setProgressStep}
              goToNextStep={goToNextStep}
              isButtonDisabled={isButtonDisabled}
              setIsButtonDisabled={setIsButtonDisabled}
              setLoader={setLoader}
            />}
          {currentStep === 9 &&
            <Step9
              setProgressStep={setProgressStep}
              goToNextStep={goToNextStep}
            />}
          {currentStep === 10 &&
            <Step10
              setProgressStep={setProgressStep}
            />}

        </div>
        {currentStep < totalScreens  && !(currentStep ===8 && loader) &&  (
          <MainButton
            currentStep={currentStep}
            onClick={
              currentStep === 4
                ? handleDraftCreation
                : currentStep === 6
                  ? handleFileUpload
                  : goToNextStep
            }
            disabled={isButtonDisabled}
          />
        )}

      </div>

    </div>
  );
};

export default MainScreen;
