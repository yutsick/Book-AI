import React, { useState, useEffect, useContext } from 'react'
import CustomSelect from "@/components/FormsElements/CustomSelect";
import CustomInput from "@/components/FormsElements/CustomInput";
import CreateBookContext from "@/contexts/CreateBookContext";


function StepOne({setIsButtonDisabled, setProgressStep, textError, setTextError}) {



  const {     
    authorName,
    setAuthorName,
    selectedAge,
    setSelectedAge,
    selectedGender,
    setSelectedGender,
   } = useContext(CreateBookContext);



  const genderOptions = [
    { value: "1", label: "Male" },
    { value: "2", label: "Female" },
    { value: "3", label: "Non-Binary" }
  ];
  const ageRange = [0,3,7,12,18,24,30,40,55,70];
  const ageOptions = ageRange.map((el, i) => {
    const value = i + 1;
    if (i === ageRange.length - 1) {
      return { value, label: `${el} +` };
    }
    return { value, label: `${el} - ${ageRange[i + 1]}` };
  });

  useEffect(() => {
    setProgressStep(1);
  }, [setProgressStep]);

  useEffect(() => {
    if (authorName) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [authorName, setIsButtonDisabled]);

  return (
    <div>
      <div className="w-full">
        <div className="">
          <CustomInput
            title="Who will be the book's author?"
            description="You can choose your own name, your best friend’s name, or even a family member’s name"
            label="Author's name"
            placeholder="Author's full name"
            value={authorName}
            onChange={setAuthorName}
            setIsButtonDisabled = {setIsButtonDisabled}
            textError = {textError}
            setTextError={setTextError}
          // onBlurValidation={validateInput}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="author-gender"
            className="block text-sm font-medium text-gray-700 mb-2"
          >

          </label>
          <CustomSelect
            title="How does the author identify?"
            className="w-full border border-gray-300 rounded-lg p-2"
            options={genderOptions}
            value={selectedGender} // Використовуємо контекст для збереження статі
            onChange={setSelectedGender} // Оновлюємо контекст
            placeholder="Select an option"
            afterFocusPlaceholder="Author's gender"
          />

        </div>

        <div className="mb-4">
          <label
            htmlFor="author-age"
            className=""
          >

          </label>
          <CustomSelect
          
            title="What is the author's age?"
            className="w-full border border-gray-300 rounded-lg p-2"
            options={ageOptions}
            value={selectedAge} // Використовуємо контекст для збереження віку
            onChange={setSelectedAge} // Оновлюємо контекст
            placeholder="Select an option"
            afterFocusPlaceholder="Author's age"
          />
        </div>



      </div>
    </div>
  )
}

export default StepOne
