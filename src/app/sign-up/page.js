"use client";
import SignUpPage from "./SignUpPage";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function SignUp() {  
  return (
   <div>
      
        <Header />
        <div  className="min-h-screen max-w-[748px] mx-auto flex flex-col items-center pb-36 mt-8">
          <SignUpPage />
        </div>
       
        <Footer />
 
    </div>
  );
}

