import React, { useEffect, useState, useContext } from "react";
import CustomEmail from "@/components/FormsElements/CustomEmail";
import CreateBookContext from "@/contexts/CreateBookContext";


function Step4({ setIsButtonDisabled, setProgressStep }) {
  const { authorEmail, setAuthorEmail } = useContext(CreateBookContext);

  useEffect(() => {
    setProgressStep(3);
  }, [setProgressStep]);

  useEffect(() => {
    if (authorEmail) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [authorEmail, setIsButtonDisabled]);


  return (
    <div>
      <div className="w-full">
        <div className="mt-2 md:px-6 ">
          <CustomEmail
            title="Stay Connected"
            description="Enter your email to continue crafting your book and save your progress."
            label="Your Email"
            placeholder="Enter your Email here"
            onChange={setAuthorEmail}
            value={authorEmail || ""}
          />
        </div>
      </div>
    </div>
  )
}

export default Step4
