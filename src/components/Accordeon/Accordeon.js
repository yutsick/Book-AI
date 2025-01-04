"use client";

import React, { useState } from "react";


const Accordion = ({ data }) => {
  
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-[930px] mx-auto">
      {data.map((item, index) => (
        <div
          key={index}
          className="border-b border-[#E5E5E5] py-4 "
        >
          <div className="flex justify-between items-center">
          <div
            className="flex-1  cursor-pointer font-semibold text-base md:text-[22px]"
            onClick={() => toggleAccordion(index)}
          >
            {item.question}
          </div>

        
          <button
            onClick={() => toggleAccordion(index)}
            className="text-[#193C6C] text-base md:text-[22px] font-semibold w-6 h-6 md:w-7 md:h-7 flex items-center justify-center rounded-full border-[#193C6C] border transition-all"
          >
            {openIndex === index ? '-' : '+'}
          </button>

          </div>
          
          {openIndex === index && (
            <div className="mt-4  w-full text-md md:text-[18px]"
              dangerouslySetInnerHTML={{ __html: item.answer }} >
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
