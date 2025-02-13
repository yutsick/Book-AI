import React, { useEffect, useState, useContext } from "react";
import CustomSelect from "@/components/FormsElements/CustomSelect";
import CustomText from "@/components/FormsElements/CustomText";
import CreateBookContext from "@/contexts/CreateBookContext";

import ProgressTracker from "@/components/ProgressTracker/ProgressTracker";

function Step3({ setIsButtonDisabled, setProgressStep, textError }) {
 
  const { authorName, questionsAndAnswers, addQuestionAndAnswer, removeQuestion } = useContext(CreateBookContext);

  const author = authorName.trim();

  useEffect(() => {
    setProgressStep(3); 
  }, [setProgressStep]);

   
  useEffect(() => {
    setIsButtonDisabled(questionsAndAnswers.filter(el=>el.answer.length !== 0).length === 0); 
    return () => {
      setIsButtonDisabled(false);
    };
  }, [questionsAndAnswers, setIsButtonDisabled]);

  const questions = [
    {
      value: "1",
      label: `What does ${author} do?`,
      example: "She works as a machine learning engineer at DataCore AI, a company focused on predictive analytics tools for the healthcare industry. Her job revolves around designing algorithms that help doctors make better decisions using patient data.",
      tip: "Include the role, company name, industry focus, and a specific project or achievement",
      isDisabled: false,
    },
    {
      value: "2",
      label: `Where does ${author} live?`,
      example: false,
      tip: false,
      isDisabled: false,
    },
    {
      value: "3",
      label: `What are ${author}’s hobbies?`,
      example: false,
      tip: false,
      isDisabled: false,
    },
    {
      value: "4",
      label: `Who is ${author}’s family?`,
      example: "Mom: Karen Dawson (female, 52) is a history teacher at the local high school. She spends her weekends gardening, especially taking care of her orchids, and watching NCIS. She loves trying to figure out the cases before the characters do.",
      tip: "Specify the relationship, name, age, and gender. Add details like job, interests, or hobbies for a personal touch.",
      isDisabled: false,
    },
    {
      value: "5",
      label: `What are ${author}’s backstories?`,
      example: false,
      tip: "Share stories about childhood, major life events, memorable moments, or challenges.",
      isDisabled: false,
    },
    {
      value: "6",
      label: `What’s one thing ${author} really good at?`,
      example: false,
      tip: false,
      isDisabled: false,
    },
    {
      value: "7",
      label: `What’s a topic ${author} can talk about for hours without getting bored?`,
      example: false,
      tip: false,
      isDisabled: false,
    },
    {
      value: "8",
      label: `What’s something ${author} hilariously bad at?`,
      example: false,
      tip: false,
      isDisabled: false,
    },
    {
      value: "9",
      label: `Does ${author} have any funny habits or routines?`,
      example: false,
      tip: false,
      isDisabled: false,
    },
    {
      value: "10",
      label: `What’s ${author}’s biggest dream or goal?`,
      example: false,
      tip: false,
      isDisabled: false,
    },
    {
      value: "11",
      label: `What are ${author}’s favorite places?`,
      example: false,
      tip: "Describe what the place is like and how you spend your time there.",
      isDisabled: false,
    },
    {
      value: "12",
      label: `Who are ${author}’s best friends?`,
      example: "Sarah Thompson (30, female) is a graphic designer at a marketing agency. She enjoys hiking and photography. They have been friends since college and often catch up over coffee.",
      tip: "Include each friend's name, age, and gender. Add details like job, interests, or hobbies for a personal touch.",
      isDisabled: false,
    },
    {
      value: "13",
      label: `Who are ${author}’s colleagues?`,
      example: false,
      tip: "Include their name, gender, and role.",
      isDisabled: false,
    },
  ];

  const handleQuestionSelectChange = (option) => {
    if (!questionsAndAnswers.some((qa) => qa.question === option.label)) {
      addQuestionAndAnswer(option.label, ""); 
    }
  };
  
  const handleDelete = (questionToRemove) => {
    removeQuestion(questionToRemove); 
  };
  
  const optionsWithDisabled = questions.map((question) => ({
    ...question,
    isDisabled: questionsAndAnswers.some((qa) => qa.question === question.label),
  }));
  
// 

const weightConfig = {
  "1": { max: 4, levels: [20, 10, 1] },
  "2": { max: 1, levels: [1] },
  "3": { max: 4, levels: [10, 5, 1] },
  "4": { max: 3, levels: [50, 30, 10] },
  "5": { max: 2, levels: [25, 5] },
  "6": { max: 2, levels: [5, 1] },
  "7": { max: 4, levels: [10, 5, 1] },
  "8": { max: 1, levels: [1] },
  "9": { max: 1, levels: [1] },
  "10": { max: 1, levels: [1] },
  "11": { max: 1, levels: [1] },
  "12": { max: 2, levels: [15, 5] },
  "13": { max: 2, levels: [15, 5] }
};

const calculateScore = () => {
  let score = 0;
  let answeredQuestions = 0;

  questionsAndAnswers.forEach(({ question, answer }) => {
    if (answer.length > 0) {
      answeredQuestions++;

      // Знайти відповідне `value` питання
      const questionEntry = questions.find(q => q.label === question);
      if (!questionEntry) return;

      const weight = weightConfig[questionEntry.value] || { max: 1, levels: [1] };

      for (let i = 0; i < weight.levels.length; i++) {
        if (answer.split(' ').length > weight.levels[i]) {
          score += weight.max - i;
          break;
        }
      }
    }
  });

  return { score, answeredQuestions };
};



const { score, answeredQuestions } = calculateScore();
let qualityLevel = "Empty bar";
if (score >= 15 && answeredQuestions >= 6) qualityLevel = "Excellent";
else if (score >= 9 && answeredQuestions >= 5) qualityLevel = "Good";
else if (score >= 5 && answeredQuestions >= 3) qualityLevel = "OK";
else if (score >= 1 && answeredQuestions >= 1) qualityLevel = "Basic";
// 

  return (
    <div className="w-full ">
      <div className="mt-2 md:mx-6">
        <div className="field-title">Tell us about {authorName}</div>
        <div className="field-desc">
          Share as much as you can! Each question you answer brings us closer to creating something truly special.
        </div>
        <div className="mt-9 mb-2 mx-auto w-full text-center text-[14px] font-medium">
          Your Answers Quality
        </div>
        <div className="mb-9">
          {/* <ProgressTracker activeSteps={questionsAndAnswers.length} /> */}
          <ProgressTracker activeSteps={qualityLevel === "Excellent" ? 4 : qualityLevel === "Good" ? 3 : qualityLevel === "OK" ? 2 : qualityLevel === "Basic" ? 1 : 0} />
        </div>

        {questionsAndAnswers.map(({ question, answer }) => (
          <CustomText
            setIsButtonDisabled={setIsButtonDisabled}
            key={question}
            label={question}
            placeholder={`Type your answer here...`}
            value={answer}
            onChange={(newAnswer) => addQuestionAndAnswer(question, newAnswer)} 
            tip={questions.find((q) => q.label === question)?.tip || null}
            textError={textError}
            onDelete={() => handleDelete(question)} 
          />
        ))}


        <div className="mb-6 w-full">
          <CustomSelect
            resetOnSelect={true}
            className="w-full border border-gray-300 rounded-lg p-2"
            options={optionsWithDisabled}
            onChange={handleQuestionSelectChange}
            placeholder="Choose a question"
          />
        </div>
      </div>
    </div>
  );
}

export default Step3;
