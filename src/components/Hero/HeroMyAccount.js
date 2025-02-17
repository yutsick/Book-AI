import React from "react";

const heroData = {
  title: "My Account",
  subtitle: "Welcome to your Book Tailor account page!",
  description:
    "Easily track your orders, check their status, and stay updated every step of the way. Whether you're following the progress of your book or reviewing past purchases, everything you need is right here.",
  image: "/images/my-account/my-account-hero.png", 
};

const HeroMyAccount = () => {
  return (
    <div className="md:bg-[#F9F6EB] p-3 md:p-12 md:max-h-[343px] text-dark font-inter">
      <div className="flex flex-col md:flex-row items-center md:items-start md:gap-[58px] max-w-[833px] mx-auto">
        <h1 className="text-[36px]  md:hidden font-bold ">{heroData.title}</h1>
        <div className="w-[251px] h-[251px] md:w-[251px] d:h-[251px] mt-4 md:mt-0">
        <img
          src={heroData.image}
          alt="Book with tea"
          className="w-full h-full rounded-[4px]"
        />
        </div>

        <div className="flex-1  ">
          <h1 className="hidden md:block text-[46px] leading-none font-semibold ">{heroData.title}</h1>
          <h2 className="text-[21px] md:text-[18px] font-semibold md:mt-8 mt-2">
            {heroData.subtitle}
          </h2>
          <p className="text-[18px] md:mt-2">{heroData.description}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroMyAccount;
