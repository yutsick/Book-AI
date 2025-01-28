import React, { useState, useContext } from "react";
import GenreContext from "@/contexts/CreateGenreContext";

const RadioButtonList = ({ 
  options, 
  label = null, 
  description = null, 
  setIsButtonDisabled = null, 
  iconRight, 
  type = 'genre' ,
  onChange
}) => {
  const { selectedGenre, 
    setSelectedGenre,
    selectedTopic, 
    setSelectedTopic } = useContext(GenreContext);
  

  const [focus, setFocus] = useState(false);

  const handleChange = (value) => {
    if (type == 'genre') {
      selectedGenre === value ? setSelectedGenre('') : setSelectedGenre(value)
    } else {
      setSelectedTopic(value);
      onChange(value, description); 

    }
   
    setIsButtonDisabled && setIsButtonDisabled(false); 
  };

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  return (
    <div className="w-full mb-8">
      <div className="flex items-center space-x-2">
        <p className="field-title">{label}</p>
      </div>
      {description && <div className="field-desc">{description}</div>}
      <div className="flex flex-col gap-4 mt-4">
        {options.map(({ id, name, description, icon }) => (
          <label
            key={id} 
            className={`flex  items-center gap-1 md:gap-0 md:px-[10px] md:py-[12px] p-[10px] rounded-[3px] cursor-pointer transition ${
              selectedGenre === name  || selectedTopic === name  ? "bg-[#D9D9D9] hover:bg-[#D9D9D9]" : "bg-white hover:bg-[#ECEBE9]"
            }`}
          >
            <input
              type="radio"
              name="radio-options"
              value={id}
              checked = {selectedTopic === name}
              onChange={() => handleChange(name)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="hidden"
            />
            {icon && (
              <div className="w-[60px]">
                <img src={icon} alt="" className="w-full max-w-[40px]"/>
              </div>
            )}
            <div className="flex justify-between w-full">
              <div>
                <div className={`font-bold text-base ${selectedGenre === name || selectedTopic === name ? "text-black" : "text-gray"}`}>{name}</div>
                <div className={`text-[14px] md:text-[15px] leading-[18px] md:leading-[28px] font-medium ${
                  selectedGenre === name  || selectedTopic === name ? "opacity-[0.79] text-gray" : "opacity-[0.49] text-black"
                }`}>
                  {description}
                </div>
              </div>
            </div>
            {iconRight && (
              <div className="flex flex-col justify-center items-center w-[80] ml-4">
                <img src={iconRight} alt="" className="w-[36px]"/>
                <div className="text-center text-black opacity-[71%] text-[12px]">Regenerate</div>
                
              </div>
            )}
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioButtonList;
