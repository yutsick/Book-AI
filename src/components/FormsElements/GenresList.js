import React, { useState, useContext, useEffect, useRef } from "react";
import GenreContext from "@/contexts/CreateGenreContext";


const RadioButtonList = ({
  options,
  label = null,
  description = null,
  setIsButtonDisabled = null,

  onChange
}) => {
  const { selectedGenre,
    setSelectedGenre } = useContext(GenreContext);


  const [focus, setFocus] = useState(false);

  const handleChange = (value) => {
    selectedGenre === value ? setSelectedGenre('') : setSelectedGenre(value)
  };


  return (
    <div className="w-full mb-8">
      <div className="flex items-center space-x-2">
        <p className="text-lg font-semibold">{label}</p>
      </div>
      {description && <p className="text-gray-500 mt-1">{description}</p>}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {options.map(({ id, name, description, icon }) => {
          const descRef = useRef(null);
          const [marginTop, setMarginTop] = useState("mt-3"); 

          useEffect(() => {
            if (descRef.current) {
              const height = descRef.current.clientHeight;
              if (height > 40) {
                setMarginTop("mt-2"); 
              }
            }
          }, []);

          return (
            <label
              key={id}
              className={`flex flex-col items-center px-3 md:px-[14px] pt-4 pb-2 cursor-pointer transition  ${
                selectedGenre === name  ? "bg-[#D9D9D9] hover:bg-[#D9D9D9] border-[0.5px] border-[#000]" : "bg-white hover:bg-[#ECEBE9] border-[0.3px] border-[#A6A6A6]"
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
                    handleChange('');
                  }
                }}
                className="hidden"
              />
              {icon && <img src={icon} alt={name} className="w-12 h-12 mb-3" />}
              <p className={`text-lg font-semibold ${selectedGenre === name ? "text-black" : "text-gray-700"}`}>
                {name}
              </p>
              <p ref={descRef} className={`font-medium text-[13px] md:text-[14px] leading-[18px]  ${marginTop} ${selectedGenre === name ? "text-black" : "text-black/50"}`}>
                {description}
              </p>
            </label>
          );
        })}
      </div>
    </div>
  );

};

export default RadioButtonList;
