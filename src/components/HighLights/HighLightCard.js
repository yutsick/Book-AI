import React from 'react';


function HighLightCard({ card }) {
  const title = card.title;
  const description = card.description;
  const imageUrl = card.imageUrl;
  return (
    <div>
      <div className="h-full max-w-[285px] md:max-w-[324px] bg-white rounded-[3px] shadow-worksShadow relative flex flex-col ">
      <div className="">
          <img
            src={imageUrl}
            alt="Step Illustration"
            className="w-full rounded-tr-[3px] rounded-tl-[3px] max-h-[182px] object-cover object-[0_30%]"
          />
        </div>
        <div className=" p-[10px]">
          <div className="mt-3 ">
            <h3 className="text-center text-[18px] md:text-[22px] font-bold text-gray">{title}</h3>
            <p className="px-[20px] font-medium mt-2 text-[16px] text-gray/80">{description}</p>
          </div>
        </div>

        
      </div>
    </div>
  )
}

export default HighLightCard
