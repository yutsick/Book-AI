
import { useState, useEffect } from "react";
import UniversalInput from "@/components/FormsElements/UniversalInput";
import MainButton from "@/components/Button/MainButton";
import NavButton from "@/components/FormsElements/NavButton";
import Link from "next/link";




const SignUpPage = () => {
  const [authorEmail, setAuthorEmail] = useState("");


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(authorEmail.trim());
  const isButtonDisabled = !isValidEmail ;


  return (
    <div className="w-full  ">
      <h2 className="text-center text-[32px] md:text-[44px] font-bold mb-6">Sign up</h2>
      <div className="mt-6 mb-8 px-4 md:px-0 font-medium">
      Enter your email address to get started. We’ll send you a verification link and code to confirm your account. Make sure to use the same email you used to place your order so we can connect your account seamlessly
      </div>
      <div className="px-4">
        <div className="pb-9">
          <UniversalInput
            type="email"
            placeholder="Enter the email used for your order"
            label="Your Email"
            value={authorEmail}
            onChange={setAuthorEmail}
            extraLabel={true}
            border={true}
          />
          {/* {!isValidEmail && authorEmail && (
          <p className="text-red-500 text-sm mt-1">Invalid email format</p>
        )} */}



          <div className="mt-10 md:mt-0">
          <Link href="/set-password">
            <MainButton 
            text="Send Verification Email" 
            disabled={isButtonDisabled} 
            fontSize="20px"
            />
            </Link>
          </div>

        </div>


        <div className="mt-4 md:mt-12 pt-4 md:pb-6 pb-0"> 
          <div className="h-[1px] bg-[#D1D1D1] md:min-w-full max-w-[330px] mx-auto"></div>
          <div className="text-center mt-10">
            <p className="text-gray-300 text-[24px]  font-medium font-inter">Already have an account?</p>
            <Link href="/sign-up">
            <div className="mt-8">
            <NavButton href="/log-in" text="Log In" />
          </div>
          </Link>

          </div>
        </div>
      </div>

    </div>
  );
};

export default SignUpPage;
