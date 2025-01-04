import React from 'react';


function HighLightCard({ card }) {
  const title = card.title;
  const description = card.description;
  const imageUrl = card.imageUrl;
  return (
    <div>
      <div className="h-full max-w-[285px] md:max-w-[324px] bg-white rounded-[10px] shadow-worksShadow relative flex flex-col ">
      <div className="">
          <img
            src={imageUrl}
            alt="Step Illustration"
            className="w-full rounded-tr-[10px] rounded-tl-[10px]"
          />
        </div>
        <div className=" p-[10px]">
          <div className="text-center mt-3 ">
            <h3 className="text-[18px] md:text-[22px] font-bold text-[#404040]">{title}</h3>
            <p className="font-medium mt-2 text-[16px] text-[#404040]/83">{description}</p>
          </div>
        </div>

        
      </div>
    </div>
  )
}

export default HighLightCard
