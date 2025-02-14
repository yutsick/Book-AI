
import { useState, useEffect } from "react";
import UniversalInput from "@/components/FormsElements/UniversalInput";
import MainButton from "@/components/Button/MainButton";
import NavButton from "@/components/FormsElements/NavButton";
import Link from "next/link";




const LoginPage = () => {
  const [authorEmail, setAuthorEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(authorEmail.trim());
  const isButtonDisabled = !isValidEmail || authorEmail.trim() === "" || password.trim() === "";
  

  return (
    <div className="w-full  ">
      <h2 className="text-center text-[32px] md:text-[44px] font-bold mb-6">Log in</h2>
      <div className="pb-9">
        <UniversalInput
          type="email"
          placeholder="Email address"
          label="Email address"
          value={authorEmail}
          onChange={setAuthorEmail}
          extraLabel={true}
          border={true}
        />
        {/* {!isValidEmail && authorEmail && (
          <p className="text-red-500 text-sm mt-1">Invalid email format</p>
        )} */}

        <UniversalInput
          type="password"
          placeholder="Password"
          label="Enter your password here"
          value={password}
          onChange={setPassword}
          extraLabel={true}
          border={true}
        />

        <div className="flex md:items-center justify-between -mt-4 md:mt-0 mb-6 flex-col md:flex-row">
          <label className="flex items-center cursor-pointer f">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="hidden peer"
            />
            <div className="self-center mr-2 w-[18px] h-[18px] border border-gray-300 rounded flex items-center justify-center peer-checked:bg-gray-900">
              {rememberMe && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            Remember me
          </label>



          <Link href="/forgot-password" className="mt-3 md:mt-0 self-center md:self-start text-gray-300/80 text-sm underline hover:text-gray-700 transition">
            Forgot your password?
          </Link>

        </div>
        <div className="mt-10 md:mt-0">
          <MainButton text="Log in" disabled={isButtonDisabled} />
        </div>

      </div>


      <div className="mt-4 pt-4 md:pb-6 pb-0">
        <div className="h-[1px] bg-[#D1D1D1] md:min-w-full max-w-[330px] mx-auto"></div>
        <div className="text-center mt-10">
          <p className="text-gray-300 text-[24px]  font-medium font-inter">Don't have an account?</p>
          <div className="mt-8">
            <NavButton href="/sign-up" text="Sign up" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
