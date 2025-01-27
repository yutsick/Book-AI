import React from 'react';


function WorkCard({ card, stepNumber }) {
  const title = card.title;
  const description = card.description;
  const imageUrl = card.imageUrl;
  return (
    
      <div className="h-full max-w-[285px] md:max-w-[324px] bg-white rounded-[3px] shadow-worksShadow relative flex flex-col justify-between">
        <div className=" px-4">
          <div className="absolute -top-6 -left-4 w-12 h-12 rounded-full border-[3px] border-[#2B2B2B] bg-white flex items-center justify-center text-gre font-bold text-[24px]">
            {stepNumber}
          </div>

          <div className="mt-3 ">
            <h3 className="text-center  text-[18px] md:text-[22px] font-bold text-grey]">{title}</h3>
            <p className="font-medium mt-2 text-[16px] text-grey opacity-80">{description}</p>
          </div>
        </div>

        <div className="mt-6 h-[208px]">
          <img
            src={imageUrl}
            alt="Step Illustration"
            className="w-full rounded-br-[3px] rounded-bl-[3px] h-full object-cover"
          />
        </div>
      </div>
    
  )
}

export default WorkCard
