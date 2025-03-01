"use client";
import ResetPasswordPage from "./ResetPasswordPage";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function SignUp() {  
  return (
   <div>
      
        <Header />
        <div  className="min-h-screen max-w-[748px] mx-auto flex flex-col items-center justify-between pb-28 mt-8">
          <ResetPasswordPage />
        </div>
       
        <Footer />
 
    </div>
  );
}

