import React from "react";

const SimpleRadio = ({ options, onChange, value }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 ">
      {options.map((option) => (
        <label
          key={option.value}
          className={`flex items-center px-4 h-[43px]  rounded-[12px] cursor-pointer transition-all hover:bg-[#F1F1F1] ${
            value === option.value
              ? "bg-[#e4e4e4]  text-gray-900 font-semibold md:hover:bg-[#e4e4e4] border-[0.5px] border-black"
              : "bg-white border-[0.3px] border-[#bfbfbf]/50 text-[#484848] md:hover:bg-[#F6F5F3]"
          }`}
        >
          <input
            type="radio"
            name="simple-radio"
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            onClick={() => {
              if (value === option.value) {
                onChange(null);
              }
            }}
            className="hidden"
          />
          <span
            className={`w-4 h-4 border border-[#484848] rounded-full flex items-center justify-center mr-2 transition-all ${
              value === option.value ? "border-gray-900" : "border-gray-500"
            }`}
          >
            {value === option.value && (
              <span className="w-2 h-2 bg-gray-900 rounded-full"></span>
            )}
          </span>
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default SimpleRadio;
