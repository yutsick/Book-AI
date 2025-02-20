
import { useState, useEffect } from "react";
import UniversalInput from "@/components/FormsElements/UniversalInput";
import MainButton from "@/components/Button/MainButton";
import Link from "next/link";




const SetPasswordPage = () => {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");



  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const isValidPassword = passwordRegex.test(password.trim());
  const isButtonDisabled = !isValidPassword || password.trim() === "" || confirmPassword.trim() !== password.trim();


  return (
    <div className="w-full  ">
      <h2 className="text-center text-[32px] md:text-[44px] font-bold mb-6">Set Your Password</h2>
      <div className="mt-6 mb-8 px-4 md:px-0 text-center font-medium">
      Welcome to Book Tailor! Now, let’s secure your account by creating a password.
      </div>
      <div className="pb-9">
      <UniversalInput
          type="password"
          placeholder="Enter a secure password"
          label="Create Password"
          value={password}
          onChange={setPassword}
          extraLabel={true}
          border={true}
        />
        <div className="text-black text-[12px] -mt-6 mb-8">Must be at least 8 characters, including one uppercase letter, one number, and one special character</div>


        <UniversalInput
          type="password"
          placeholder="Re-enter your password"
          label="Confirm Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          extraLabel={true}
          border={true}
        />

        
        <div className="mt-10 md:mt-14">
          <Link href="/my-account">
            <MainButton 
            text="Set Password and Continue" 
            disabled={isButtonDisabled} 
            width="372px" 
             fontSize="20px"
            />
          </Link>
        </div>

      </div>


    </div>
  );
};

export default SetPasswordPage;
