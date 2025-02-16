import React, { useState, useEffect, useContext } from 'react'
import CustomSelect from "@/components/FormsElements/CustomSelect";
import CustomInput from "@/components/FormsElements/CustomInput";
import CreateBookContext from "@/contexts/CreateBookContext";


function StepOne({ setIsButtonDisabled, setProgressStep, textError, setTextError }) {



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
    { value: "3", label: "Prefer not to say" }
  ];
  const ageOptions = [
    { value: "1", label: 'under 18' },
    { value: "2", label: '18-24' },
    { value: "3", label: '25-34' },
    { value: "4", label: '35-44' },
    { value: "5", label: '45-54' },
    { value: "6", label: '55-64' },
    { value: "7", label: '65 and above' }];

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
            setIsButtonDisabled={setIsButtonDisabled}
            textError={textError}
            setTextError={setTextError}
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
            value={selectedGender} 
            onChange={setSelectedGender} 
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
            value={selectedAge} 
            onChange={setSelectedAge} 
            placeholder="Select an option"
            afterFocusPlaceholder="Author's age"
          />
        </div>



      </div>
    </div>
  )
}

export default StepOne
