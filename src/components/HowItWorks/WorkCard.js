import React from 'react';


function WorkCard({ card, stepNumber }) {
  const title = card.title;
  const description = card.description;
  const imageUrl = card.imageUrl;
  return (
    
      <div className="h-full max-w-[285px] md:max-w-[324px] bg-white rounded-[10px] shadow-worksShadow relative flex flex-col justify-between">
        <div className=" px-4">
          <div className="absolute -top-6 -left-4 w-10 h-10 rounded-full border-4 border-orange bg-white flex items-center justify-center text-orange font-bold text-xl">
            {stepNumber}
          </div>

          <div className="text-center mt-3 ">
            <h3 className="text-[18px] md:text-[22px] font-bold text-[#404040]">{title}</h3>
            <p className="font-medium mt-2 text-[16px] text-[#404040] opacity-[83]">{description}</p>
          </div>
        </div>

        <div className="mt-6">
          <img
            src={imageUrl}
            alt="Step Illustration"
            className="w-full rounded-br-[10px] rounded-bl-[10px]"
          />
        </div>
      </div>
    
  )
}

export default WorkCard
