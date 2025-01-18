import React, { useEffect, useState } from "react";
import CustomInput from "@/components/FormsElements/CustomInput";

function Step4({ setIsButtonDisabled,  setProgressStep }) {
  useEffect(() => {
    setProgressStep(3); 
  }, [setProgressStep]);

  useEffect(() => {
      setIsButtonDisabled(true);
      // return () => {
      //   setIsButtonDisabled(false);
      // };
    }, [setIsButtonDisabled]);

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (newValue) => {
    if (newValue.trim()) { 
      setInputValue(newValue);
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  return (
    <div>
      <div className="w-full">
      <div className="mt-2 md:px-6 ">
          <CustomInput
            title="Stay Connected"
            description="Enter your email to continue crafting your book and save your progress."
            label="Author's name"
            placeholder="Enter name"
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  )
}

export default Step4
