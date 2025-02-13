import React, { useState, useEffect } from "react";

const ContactEmail = ({
  placeholder = "Enter text",
  label = "Field label",
  title = null,
  description = null,
  onChange,
  onValidityChange, 
  value,
  width = "100%",
  height = "60px",
  titleSize = "16px",
  placeholderSize = "14px", 
  inputClassName = "",
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
    <div className="w-full" style={{ width }}>
      {title && <div className="flex items-center space-x-2"><p className="field-title" style={{ fontSize: titleSize }}>{title}</p></div>}
      {description && <div className="field-desc text-sm text-gray-500">{description}</div>}
      
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
          className={`rounded-md py-2 px-4 w-full focus:outline-none text-[17px] border ${inputClassName} ${
            !isValid && value ? "border-red-500" : "border-gray"
          }`}
          placeholder={value ? "" : localPlaceholder}
          style={{ height, fontSize: placeholderSize }}
        />
      </div>
    </div>
  );
};

export default ContactEmail;
