import React, { useState, useRef, useEffect } from "react";

const CustomSelect = ({ options, onChange, placeholder = "Choose name", afterFocusPlaceholder=null, title=null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const selectRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    setIsFocused(true);
    onChange(option);
  };

  const handleBlur = () => {
    setIsOpen(false);
    if (!selected) {
      setIsFocused(false);
    }
  };

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      handleBlur();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mb-8">
    <div className="field-title">{title}</div>
    <div className="relative w-full  h-[60px]" ref={selectRef}>
      
      <label
        className={`absolute top-1 left-0 text-gray-500 text-sm transition-all ${
          isFocused || selected ? "-translate-y-[2px] scale-75 block" : "hidden"
        }`}
      >
        {afterFocusPlaceholder}
      </label>

     
      <div
        className={`h-full border ${
          "border-gray-300"
        } bg-white rounded-md py-3 px-4 cursor-pointer flex justify-between items-center mt-4`}
        onClick={handleToggle}
      >
        <span
          className={`${
            selected ? "text-gray-700" : "text-[#2B2B2B]/80"
          } text-base`}
        >
          {selected ? selected.label : placeholder}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>

    
      {isOpen && (
        <ul className="absolute left-0 right-0 mt-2 border border-gray-300 bg-white rounded-md shadow-lg z-10 max-h-48 overflow-auto">
          {options.map((option) => (
            <li
              key={option.value}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                selected?.value === option.value ? "bg-gray-100 font-bold" : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
};

export default CustomSelect;
