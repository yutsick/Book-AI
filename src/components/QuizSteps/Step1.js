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
    console.log("Selected age:", option);
    setSelectedAge(option);
  };
  const handleGenderSelectChange = (option) => {
    console.log("Selected gender:", option);
    setSelectedGender(option);
  };


  return (
    <div>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-yellow-600 text-white font-bold">
              1
            </div>
            <p className="text-lg font-semibold text-gray-700">Author's Name</p>
          </div>
          <div className="flex-1 h-2 bg-gray-200 rounded-full mx-4 relative">
            <div
              className="h-2 bg-yellow-600 rounded-full absolute"
              style={{ width: "14%" }}
            ></div>
          </div>
          
        </div>

        
          <div className="mb-4">
            <label
              htmlFor="author-name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Who will be the book's author?
            </label>
            <CustomInput 
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
              How does the author identify?
            </label>
            <CustomSelect
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
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              What is the author's age?
            </label>
            <CustomSelect
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
