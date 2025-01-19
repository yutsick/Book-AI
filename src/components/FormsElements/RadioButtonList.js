import React from "react";

const RadioButtonList = ({ options, selectedValue, onChange, iconPosition = null, setIsButtonDisabled }) => {


  return (
    <div className="flex flex-col gap-4">
      {options.map(({ id, name, description, icon }) => (
        <label
          key={id}
          className={`flex hover:bg-[#D9D9D9] items-center gap-1 md:gap-0 md:px-[10px] md:py-[12px] p-[10px]   rounded-[3px] cursor-pointer transition ${selectedValue === name ? "bg-[#D9D9D9] md:hover:bg-[#D9D9D9] " : "bg-white md:hover:bg-[#FBFBFB]"
            }`}
        >
          <input
            type="radio"
            name="radio-options"
            value={id}
            checked={selectedValue === name}
            onChange={() => {
              onChange(name); 
              setIsButtonDisabled(false)}
            }
            className="hidden"
          />
          {iconPosition !== 'right' && (
            <div className="w-[60px]">
              <img src={icon} alt="" />
            </div>
          )}
          <div className="flex justify-between w-full">
            <div>
              <div className={`font-bold text-base ${selectedValue === name ? "textblack" : "text-gray"}`}>{name}</div>
              <div className={`text-[14px] md:text-[15px] leading-[18px] md:leading-[28px] font-medium  ${selectedValue === name ? "opacity-[0.79] text-gray" : "opacity-[0.49] text-black"}`}>{description}</div>
            </div>
            {iconPosition === 'right' && (
              <button className=" flex flex-col justify-center items-center">
                <img src="images/create-book/icon-regenerate.png" alt="" />
                <div className="text-center text-black opacity-[0.71] font-medium text-[12px] leading-[12px]">Regenerate</div>
              </button>
            )}
          </div>
        </label>
      ))}
    </div>
  );
};

export default RadioButtonList;
