import React, { useState, useEffect } from "react";

const CustomEmail = ({
  placeholder = "Enter text",
  label = "Field label",
  title = null,
  description = null,
  onChange,
  onValidityChange, 
  value,
}) => {
  const [focus, setFocus] = useState(false);
  const [localPlaceholder, setLocalPlaceholder] = useState(placeholder);
  const [isValid, setIsValid] = useState(false); 

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

  useEffect(() => {
    if (onValidityChange) {
      onValidityChange(isValid); 
    }
  }, [isValid, onValidityChange]);

  const handleChange = (e) => {
    const newValue = e.target.value;

    if (onChange) {
      onChange(newValue);
    }


    setIsValid(emailRegex.test(newValue));
  };

  const handleFocus = () => {
    setFocus(true);
    setLocalPlaceholder("");
  };

  const handleBlur = () => {
    setFocus(false);
    setLocalPlaceholder(placeholder);
  };

  return (
    <div className="w-full mb-8">
      <div className="flex items-center space-x-2">
        <p className="field-title">{title}</p>
      </div>
      <div className="field-desc">{description}</div>
      <div className="relative">
        {(value || focus) && (
          <label className="absolute top-4 left-2 text-[#8F8F8F] text-[12.5px] transition-all">
            {label}
          </label>
        )}

        <input
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`mt-[14px] rounded-[3px] py-2 px-4 w-full h-[60px] focus:outline-none text-[17px] ${
            !isValid && value ? "border-red-500" : "border-gray-300"
          }`}
          placeholder={value ? "" : localPlaceholder}
        />


      </div>
    </div>
  );
};

export default CustomEmail;
