import React, { useState, useRef, useEffect } from "react";

const CustomDropdown = ({
  options,
  onChange = () => { },
  value,
  placeholder = "Select an option",
  afterFocusPlaceholder = null,
  className = "",
  title = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value || null);
  const selectRef = useRef(null);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    onChange(option);
    setSelected(option);
    setIsOpen(false);
  };

  const handleBlur = () => {
    setIsOpen(false);
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
    <div className={` ${className}`}>
      {title && <div className="field-title">{title}</div>}
      <div className="relative w-[327px] h-[36px]" ref={selectRef}>
        <div
          className="h-full bg-white rounded-[3px] py-2 px-4 cursor-pointer flex justify-between items-center mt-4"
          onClick={handleToggle}
        >
          <span
            className={`${selected ? "text-gray-700" : "text-[#2B2B2B]/80"
              } text-[17px]`}
          >
            {selected ? `${selected.label} copies` : placeholder}
          </span>
          <svg
            className={`w-4 h-4 transition-transform ${isOpen ? "transform rotate-180" : ""}`}
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
          <ul className="p-2 absolute left-0 right-0 mt-2 border border-gray-300 bg-white rounded-md shadow-lg z-10 max-h-48 overflow-auto">
            {options.map((option) => {
              const price = option.price ? `+$${option.price}` : "";
              return (
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
                  <div className="flex justify-between items-center">
                    <span>{option.value} copies</span>
                    <span className="text-[#6C6C6C]">{price}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CustomDropdown;
