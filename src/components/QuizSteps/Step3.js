import React, { useEffect, useState, useContext } from "react";
import CustomSelect from "@/components/FormsElements/CustomSelect";
import CustomText from "@/components/FormsElements/CustomText";
import CreateBookContext from "@/contexts/CreateBookContext";

import ProgressTracker from "@/components/ProgressTracker/ProgressTracker";

function Step3({ setIsButtonDisabled, setProgressStep, textError }) {
  useEffect(() => {
    setProgressStep(3);
  }, [setProgressStep]);


  useEffect(() => {
    setIsButtonDisabled(true);
    return () => {
      setIsButtonDisabled(false);
    };
  }, [setIsButtonDisabled]);

  const { authorName } = useContext(CreateBookContext);

  const questions = [
    { value: "1", label: `What is ${authorName}'s favorite hobby?`, tip: "Add some funny fact that your friend don’t know about you", isDisabled: false },
    { value: "2", label: `What is the dream of ${authorName}?`, tip: false, isDisabled: false },
    { value: "3", label: `How was ${authorName}’s childhood?`, tip: "Add some funny fact that your friend don’t know about you", isDisabled: false },
    { value: "4", label: `Describe the family of ${authorName}`, tip: false, isDisabled: false },
    { value: "5", label: `What is ${authorName}'s biggest achievement?`, tip: "Add some funny fact that your friend don’t know about you", isDisabled: false },
    { value: "6", label: `What challenges has ${authorName} faced?`, tip: false, isDisabled: false },
    { value: "7", label: `What inspires ${authorName}?`, tip: "Add some funny fact that your friend don’t know about you", isDisabled: false },
  ];

  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const handleQuestionSelectChange = (option) => {

    if (!selectedQuestions.find((q) => q.value === option.value)) {
      setSelectedQuestions((prev) => [...prev, option]);
    }
  };

  const handleDelete = (valueToRemove) => {
    setSelectedQuestions((prev) =>
      prev.filter((q) => q.value !== valueToRemove)
    );


  };

  const optionsWithDisabled = questions.map((question) => ({
    ...question,
    isDisabled: selectedQuestions.some((selected) => selected.value === question.value)
  }));

  useEffect(() => {
    if (selectedQuestions.length === 0) {
      setIsButtonDisabled(true);
    } 
  }, [selectedQuestions]);

  return (
    <div className="w-full ">
      <div className="mt-2 md:mx-6">
        <div className="field-title">We would like to hear who {authorName} is</div>
        <div className="field-desc">
          Answer as many as you like—one is enough to proceed, but three or more
          is recommended for the best results.
        </div>
        <div className=" mt-9  w-full text-center ext-[14px] font-medium">Your Answers Quality: </div>
        <div className="mb-9">
          <ProgressTracker activeSteps={selectedQuestions.length} />
        </div>


        {selectedQuestions.map(({ value, label, tip }, index) => (
          <CustomText
            setIsButtonDisabled={setIsButtonDisabled}
            key={value}
            label={label}
            placeholder={`For example: ${authorName}’s favorite hobby is woodworking. He loves spending hours in his small backyard workshop, crafting intricate pieces of furniture and decorative items. For him, it’s a way to unwind and create something tangible with his hands. `}
            tip={tip}
            textError = {textError}
            onDelete={() => handleDelete(value)}


          />
        ))}


        <div className="mb-6 w-full">

          <CustomSelect
            resetOnSelect={true}
            className="w-full border border-gray-300 rounded-lg p-2"
            options={optionsWithDisabled}
            onChange={handleQuestionSelectChange}
            placeholder="Pick Your Questions"
          />
        </div>
      </div>
    </div>
  );
}

export default Step3;
