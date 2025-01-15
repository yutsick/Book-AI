import React, { useEffect, useState } from "react";
import CustomSelect from "@/components/FormsElements/CustomSelect";
import CustomText from "@/components/FormsElements/CustomText";

import ProgressTracker from "@/components/ProgressTracker/ProgressTracker";

function Step3({ setIsButtonDisabled }) {
  useEffect(() => {
    setIsButtonDisabled(true);
    return () => {
      setIsButtonDisabled(false);
    };
  }, [setIsButtonDisabled]);

  const questions = [
    { value: "1", label: "What is Yaniv's favorite hobby?" },
    { value: "2", label: "What is the dream of Yaniv?" },
    { value: "3", label: "How was Yaniv’s childhood?" },
    { value: "4", label: "Describe the family of Yaniv" },
    { value: "5", label: "What is Yaniv's biggest achievement?" },
    { value: "6", label: "What challenges has Yaniv faced?" },
    { value: "7", label: "What inspires Yaniv?" },
  ];

  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const handleQuestionSelectChange = (option) => {

    if (!selectedQuestions.find((q) => q.value === option.value)) {
      setSelectedQuestions((prev) => [...prev, option]);
    }
    setIsButtonDisabled(false); 
  };

  return (
    <div>
      <div className="w-full mt-2 md:mx-6">
        <div className="field-title">We would like to hear who Yaniv is</div>
        <div className="field-desc">
          Answer as many as you like—one is enough to proceed, but three or more
          is recommended for the best results.
        </div>
        <div className=" mt-9  w-full text-center ext-[14px] font-medium">Your Answers Quality: </div>
        <div className="mb-9">
          <ProgressTracker activeSteps={selectedQuestions.length} /> 
        </div>

      
        {selectedQuestions.map((question, index) => (
          <CustomText
            key={question.value}
            label={question.label}
            placeholder="For example: Yaniv’s favorite hobby is woodworking. He loves spending hours in his small backyard workshop, crafting intricate pieces of furniture and decorative items. For him, it’s a way to unwind and create something tangible with his hands. "
      

          />
        ))}

      
        <div className="mb-6">
  
          <CustomSelect
             resetOnSelect = {true}
            className="w-full border border-gray-300 rounded-lg p-2"
            options={questions}
            onChange={handleQuestionSelectChange}
            placeholder="Pick Your Questions"
          />
        </div>
      </div>
    </div>
  );
}

export default Step3;
