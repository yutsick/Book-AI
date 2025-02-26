import React, { useState, useEffect, useContext } from 'react'
import CustomSelect from "@/components/FormsElements/AgeSelect";
import SimpleRadio from "@/components/FormsElements//SimpleRadio";
import CustomInput from "@/components/FormsElements/UniversalInput";
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
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "prefer not say", label: "Prefer not to say" }
  ];
  const ageOptions = [
    { value: null, label: "Clear selection" },
    { value: "under 18", label: 'under 18' },
    { value: "18-24", label: '18-24' },
    { value: "25-34", label: '25-34' },
    { value: "35-44", label: '35-44' },
    { value: "45-54", label: '45-54' },
    { value: "55-64", label: '55-64' },
    { value: "65 and above", label: '65 and above' }
   
  ];

  useEffect(() => {
    setProgressStep(1);
  }, [setProgressStep]);

  useEffect(() => {
    if (authorName?.trim().length === 0) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [authorName, setIsButtonDisabled]);
  

  return (
    <div>
      <div className="w-full">
        <div className="">
          <CustomInput

            type='text'
            title="Who is this book about?"
            description="Enter their details—they'll be the star and author! Could be you, a friend, or a family"
            label="Author's full name"
            placeholder="Author's full name"
            value={authorName}
            onChange={setAuthorName}
            setIsButtonDisabled={setIsButtonDisabled}
            textError={textError}
            setTextError={setTextError}
            validateLength = {true}
          />
        </div>

        {/* <div className="mb-4">
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

        </div> */}
        <div className="flex flex-col md:flex-row mb-4 md:gap-4 gap-8">
          <div className="">
            <SimpleRadio 
            options={genderOptions} 
            value={selectedGender || null} 
            onChange={setSelectedGender} />
          </div>
          <div className="  justify-center py-0.5 hidden md:flex">
            <div className="w-[1px] bg-[#929292]"></div>
          </div>
          <div className="flex-1">

            <CustomSelect
              type='age'
              title={null}
              className="w-full border border-gray-300 rounded-lg p-2"
              options={ageOptions}
              value={selectedAge || null}
              onChange={(newValue) => {
                setSelectedAge(newValue.value === null || newValue === '' ? null : newValue);
              }}
              placeholder="Age"
              afterFocusPlaceholder="Author's age"
            />
          </div>
        </div>






      </div>
    </div>
  )
}

export default StepOne
