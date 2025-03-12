import React, { useState, useContext, useEffect, useRef } from "react";
import GenreContext from "@/contexts/CreateGenreContext";


const RadioButtonList = ({
  options,
  label = null,
  description = null,

}) => {
  const { selectedGenre, setSelectedGenre } = useContext(GenreContext);
  const handleChange = (value) => {
    selectedGenre === value ? setSelectedGenre(null) : setSelectedGenre(value)
  };


  return (
    <div className="w-full mb-8">
      <div className="flex items-center space-x-2">
        <p className="text-lg font-semibold">{label}</p>
      </div>
      {description && <p className="text-gray-500 mt-1">{description}</p>}
      <div className="grid grid-cols-2 md:grid-cols-3  gap-6  md:gap-4 mt-6 w-fit mx-auto">
        {options.map(({ id, name,  icon }) => {


          return (
            <label
              key={id}
              className={`flex flex-col justify-center items-center px-3 md:px-[14px] pt-4 pb-2 cursor-pointer transition  ${
                selectedGenre === name  ? "bg-[#D9D9D9] md:hover:bg-[#D9D9D9] border-[0.5px] border-[#000]" : "bg-white md:hover:bg-[#F6F5F3] border-[0.3px] border-[#bfbfbf]/50 w-[135px]  h-[105px]"
              }`}
            >
              <input
                type="radio"
                name="genre"
                value={id}
                checked={selectedGenre === name}
                onChange={() => handleChange(name)}
                onClick={() => {
                  if (selectedGenre === name) {
                    handleChange(null);
                  }
                }}
                className="hidden"
              />
              {icon && <img src={icon} alt={name} className="w-[32px] h-[32px]2 mb-3" />}
              <p className={`text-[15px] font-medium ${selectedGenre === name ? "text-black" : "text-[#2b2b2b]"}`}>
                {name}
              </p>
              {/* <p ref={descRef} className={`font-medium text-[13px] md:text-[14px] leading-[18px]  ${marginTop} ${selectedGenre === name ? "text-black" : "text-black/50"}`}>
                {description}
              </p> */}
            </label>
          );
        })}
      </div>
    </div>
  );

};

export default RadioButtonList;
