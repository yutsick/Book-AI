import React, { useEffect, useContext, useState } from "react";
import CustomInput from "@/components/FormsElements/UniversalInput";
import CreateBookContext from "@/contexts/CreateBookContext";

function Step4({ setIsButtonDisabled, setProgressStep }) {
  const { authorEmail, setAuthorEmail } = useContext(CreateBookContext);
  const [isValidEmail, setIsValidEmail] = useState(false); 

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

  useEffect(() => {
    setProgressStep(3);
  }, [setProgressStep]);

  useEffect(() => {
 
    const isValid = emailRegex.test(authorEmail || "");
    setIsValidEmail(isValid);
    setIsButtonDisabled(!isValid); 
  }, [authorEmail, setIsButtonDisabled]);

  return (
    <div>
      <div className="w-full">
        <div className="mt-4 md:mt-2 md:px-6">
          <CustomInput
            type="email"
            title="Stay Connected"
            description="Enter your email to continue crafting your book and save your progress."
            label="Your Email"
            placeholder="Enter your Email here"
            onChange={setAuthorEmail}
            value={authorEmail || ""}
            setIsButtonDisabled={setIsButtonDisabled}
          />
        </div>
      </div>
    </div>
  );
}

export default Step4;
