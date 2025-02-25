import React, { useState, useContext, useEffect } from "react";
import GenreContext from "@/contexts/CreateGenreContext";

const RadioButtonList = ({ 
  options, 
  label = null, 
  description = null, 
  setIsButtonDisabled = null, 

}) => {
  const { selectedTopic, setSelectedTopic } = useContext(GenreContext);
  
  const handleChange = (value) => {
      if (selectedTopic !== value) { 
        setSelectedTopic(value);

      }
    
    setIsButtonDisabled && setIsButtonDisabled(false);
  };

  return (
    <div className="w-full ">
      <div className="flex items-center space-x-2">
        <p className="field-title">{label}</p>
      </div>
      {description && <div className="field-desc">{description}</div>}
      <div className="flex flex-col gap-4 ">
        {options.map(({ id, title, subtitle }, index) => (
          <label
            key={id || `radio-option-${title}-${index}`} 
            className={`flex  items-center gap-1 md:gap-0 md:px-[10px] md:py-[12px] p-[10px] rounded-[3px] cursor-pointer transition ${selectedTopic === title  ? "bg-[#D9D9D9] md:hover:bg-[#D9D9D9]" : "bg-white md:hover:bg-[#fafafa] max-w-[620px]"
            }`}
          >
            <input
              type="radio"
              name="radio-options"
              value={id}
              checked = {selectedTopic === title}
              onChange={() => handleChange(title, subtitle)}
              className="hidden"
   
            />

            <div className="flex justify-between w-full">
              <div>
                <div className={`font-semibold md:font-bold text-base ${selectedTopic === title ? "text-black" : "text-gray-700"}`}>{title}</div>
                <div classtitle={`mt-0.5 md:mt-1 text-[14px] md:text-[15px] leading-[19px] md:leading-[22px] font-[450] md:font-medium ${selectedTopic === title ? " text-black" : " text-black/50"
                }`}>
                  {subtitle}
                </div>
              </div>
            </div>

          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioButtonList;
