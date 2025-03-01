"use client";
import SetPasswordPage from "./SetPasswordPage";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function SetPassword() {  
  return (
   <div>
      
        <Header />
        <div  className="min-h-screen max-w-[748px] mx-auto flex flex-col items-center px-4 pb-36 mt-8">
          <SetPasswordPage />
        </div>
       
        <Footer />
 
    </div>
  );
}

