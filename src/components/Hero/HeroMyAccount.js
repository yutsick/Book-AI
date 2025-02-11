import React from "react";

const heroData = {
  title: "My Account",
  subtitle: "Welcome to Your account page",
  description:
    "Track your orders and stay updated on their status with ease. From viewing order details to tracking shipments, this is your one-stop hub for managing all your Book Tailor purchases. Whether you're checking progress on a custom book or reviewing past orders, we’ve got everything you need right here.",
  image: "/images/my-account/my-account-hero.png", 
};

const HeroMyAccount = () => {
  return (
    <div className="bg-[#F9F6EB] p-6 md:p-12 md:max-h-[343px]">
      <div className="flex flex-col md:flex-row items-center gap-6 max-w-[833px] mx-auto">
        <div className="w-[251px] h-[251px]">
        <img
          src={heroData.image}
          alt="Book with tea"
          className="w-full h-full"
        />
        </div>

        <div className="md:w-2/3 text-center md:text-left">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900">{heroData.title}</h1>
          <h2 className="text-lg md:text-xl font-semibold text-gray-700 mt-2">
            {heroData.subtitle}
          </h2>
          <p className="text-gray-600 mt-4">{heroData.description}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroMyAccount;
