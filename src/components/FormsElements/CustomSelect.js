import React, { useState, useRef, useEffect } from "react";

const CustomSelect = ({
  type = null,
  options,
  onChange = () => { },
  value,
  placeholder = "Choose name",
  afterFocusPlaceholder = null,
  resetOnSelect = false,
  title = null,
  iconOrange = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value || null);
  const selectRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);


  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    onChange(option);
    if (resetOnSelect) {
      setSelected(null);
      setIsFocused(false);
    } else {
      setSelected(option);
    }
    setIsOpen(false);
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
    if (value) {
      setSelected(value);
    }
  }, [value]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mb-8">
      <div className="field-title">{title}</div>
      <div className="relative w-full h-[60px]" ref={selectRef}>
        <label
          className={`absolute top-1 left-4 text-[#8F8F8F] text-[12.5px] transition-all ${isFocused || selected ? "translate-y-[4px]  block" : "hidden"
            }`}
        >
          {afterFocusPlaceholder}
        </label>

        <div
          className={`h-full bg-white  rounded-[3px] py-3 ${isFocused || selected ? "pb-[9px] pt-7" : "pt-3 pb-3" } px-4 cursor-pointer flex justify-between items-center mt-4 `}
          onClick={handleToggle}
        >
          <span
            className={`${selected ? "text-gray-700" : "text-[#2B2B2B]/80"
              } text-[17px]`}
          >
            {selected ? selected.label : placeholder}
          </span>
          {iconOrange ? (
         <svg width="32" height="32" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
         <circle cx="8" cy="8" r="8" fill="#EDB414"/>
         <line x1="8.15" y1="3" x2="8.15" y2="12" stroke="white" strokeWidth="1.3"/>
         <line x1="3.5" y1="7.35" x2="12.5" y2="7.35" stroke="white" strokeWidth="1.3"/>
         </svg>
         
          
          

          ) :
          (<svg
            className={`w-4 h-4 transition-transform ${isOpen ? "transform rotate-180" : ""
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
          </svg>)}
        </div>

        {isOpen && (
          <ul className="p-2 absolute left-0 right-0 mt-2 border border-gray-300 bg-white rounded-md shadow-lg z-10 max-h-48 overflow-auto">
            {options.map((option) => (
              <li
                key={option.value}
                className={`rounded-[3px] px-4 py-2 cursor-pointer hover:bg-[#F1F1F1] ${option.isDisabled
                    ? "text-gray-300 opacity-20 cursor-not-allowed hover:bg-transparent"
                    : selected?.value === option.value
                      ? "text-black bg-[#E4E4E4] font-bold"
                      : ""
                  }`}
                onClick={() => !option.isDisabled && handleSelect(option)}
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
