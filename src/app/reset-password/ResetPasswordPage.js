
import { useState, useEffect } from "react";
import UniversalInput from "@/components/FormsElements/UniversalInput";
import MainButton from "@/components/Button/MainButton";
import Link from "next/link";




const ResetPasswordPage = () => {
  const [authorEmail, setAuthorEmail] = useState("");


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(authorEmail.trim());
  const isButtonDisabled = !isValidEmail ;


  return (
    <>
    <div className="w-full  ">
      <h2 className="text-center text-[32px] md:text-[44px] font-bold mb-6">Reset Your Password</h2>
      <div className="mt-6 mb-8 px-4 md:px-0 font-medium text-center">
      Enter your email address, and we’ll send you a link to reset your password
      </div>
      <div className="px-4">
        <div className="pb-9">
          <UniversalInput
            type="email"
            placeholder="Enter the email adress"
            label="Your Email"
            value={authorEmail} 
            onChange={setAuthorEmail}
            extraLabel={true}
            border={true}
          />
          {/* {!isValidEmail && authorEmail && (
          <p className="text-red-500 text-sm mt-1">Invalid email format</p>
        )} */}



          <div className="mt-10 md:mt-12">
          <Link href="/create-password">
            <MainButton 
            text="Send Reset Link" 
            disabled={isButtonDisabled} 
             fontSize="20px"
            />
            </Link>
          </div>

        </div>


        <div className="mt-4 md:mt-12 pt-4 md:pb-6 pb-0"> 
          
        </div>
      </div>

    </div>
    <div className="w-full flex justify-center text-[15px] gap-2 ">
      <div className="italic text-black">Need help?</div>
      <Link href="#">
            <div className="text-[#006FFF] underline">Contact Support</div>
      </Link>
    </div>
    </>
  );
};

export default ResetPasswordPage;
