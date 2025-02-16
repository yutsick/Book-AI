"use client";
import LoginPage from "./LoginPage";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function LogIn() {
  return (
   <div>
      
        <Header />
        <div  className="min-h-screen max-w-[748px] mx-auto flex flex-col items-center pb-36 px-4 mt-8">
          <LoginPage />
        </div>
       
        <Footer />
 
    </div>
  );
}

