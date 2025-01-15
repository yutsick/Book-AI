import React from "react";

const RadioButtonList = ({ options, selectedValue, onChange }) => {
  return (
    <div className="flex flex-col gap-4">
      {options.map((option) => (
        <label
          key={option.id}
          className={`flex items-center md:px-[10px] md:py-[12px] p-[10px] hover:bg-[#FBFBFB] rounded-[3px] cursor-pointer transition ${
            selectedValue === option.name
              ? "bg-[#D9D9D9]"
              : "bg-white "
          }`}
        >
          <input
            type="radio"
            name="radio-options"
            value={option.name}
            checked={selectedValue === option.name}
            onChange={() => onChange(option.name)}
            className="hidden"
          />
          <div className="w-[50px]">
            <img src={option.icon} alt="" />
          </div>
          <div>
            <div className={`font-bold text-base ${selectedValue === option.name ? "textblack" : "text-gray"}`}>{option.name}</div>
            <div className={`text-[14px] md:text-[15px] leading-[18px] md:leading-[28px] font-medium  ${selectedValue === option.name ? "opacity-[0.79] text-gray" : "opacity-[0.49] text-black"}`}>{option.description}</div>
          </div>
        </label>
      ))}
    </div>
  );
};

export default RadioButtonList;
