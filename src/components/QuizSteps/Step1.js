import React, {useState} from 'react'
import CustomSelect from "@/components/FormsElements/CustomSelect";
import CustomInput from "@/components/FormsElements/CustomInput";


function StepOne() {
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  

  const genderOptions = [
    { value: "1", label: "Male" },
    { value: "2", label: "Female" },
    { value: "3", label: "Non-Binary" },
    { value: "4", label: "Transgender" },
    { value: "5", label: "Prefer Not to Say" },
    { value: "6", label: "Other" }
  ];

  const ageOptions = [...Array(60 - 18 + 1)].map((_, i) => {
    const value = i + 18;
    return { value, label: `${value}` };
  });

  const handleAgeSelectChange = (option) => {
    setSelectedAge(option);
  };
  const handleGenderSelectChange = (option) => {
    setSelectedGender(option);
  };


  return (
    <div>
      <div className="w-full">
          <div className="">
            <CustomInput 
              title="Who will be the book's author?"
              description="You can choose your own name, your best friend’s name, or even a family member’s name"
              label="Author's name"
              placeholder="Enter name"
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
              title = "How does the author identify?"
              className="w-full border border-gray-300 rounded-lg p-2"
              options={genderOptions}
              onChange={handleGenderSelectChange}
              placeholder="Choose the gender"
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
              onChange={handleAgeSelectChange}
              placeholder="Choose your age"
              afterFocusPlaceholder="Author's age"
            />
          </div>

          
        
      </div>
    </div>
  )
}

export default StepOne
