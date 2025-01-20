import React, { useEffect, useState } from "react";
import CustomEmail from "@/components/FormsElements/CustomEmail";

function Step4({ setIsButtonDisabled,  setProgressStep }) {
  useEffect(() => {
    setProgressStep(3); 
  }, [setProgressStep]);

  useEffect(() => {
      setIsButtonDisabled(true);
    }, [setIsButtonDisabled]);

  const [emailValue, setEmailValue] = useState("");

  const handleEmailChange = (newValue) => {
    if (newValue.trim()) { 
      setEmailValue(newValue);
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  return (
    <div>
      <div className="w-full">
      <div className="mt-2 md:px-6 ">
          <CustomEmail
            title="Stay Connected"
            description="Enter your email to continue crafting your book and save your progress."
            label="Your Email"
            placeholder="Enter your Email here"
            onChange={handleEmailChange}
          />
        </div>
      </div>
    </div>
  )
}

export default Step4
