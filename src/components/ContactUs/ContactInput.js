import React, { useState } from "react";

const ContactInput = ({
  placeholder = "Enter text",
  label = "Field label",
  title = "",
  description = "",
  maxLength,
  onChange,
  value = "",
  width = "100%",
  height = "60px",
  titleSize = "16px",
  placeholderSize = "14px",
  isTextArea = false,
}) => {
  const [focus, setFocus] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [textError, setTextError] = useState(false);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setTextError(newValue.length > maxLength);
    if (onChange) onChange(newValue);
  };

  return (
    <div className="w-full" style={{ width }}>
      {title && <p style={{ fontSize: titleSize }} className="font-semibold mb-1">{title}</p>}
      {description && <p className="text-gray-500 text-sm mb-2">{description}</p>}
      <div className="relative">
        {(inputValue || focus) && (
          <label className="absolute top-2 left-2 text-gray-500 text-xs transition-all">
            {label}
          </label>
        )}

        {isTextArea ? (
          <textarea
            value={inputValue}
            onChange={handleChange}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            className="rounded-md py-2 px-4 w-full focus:outline-none border border-gray"
            style={{ height, fontSize: placeholderSize }}
            placeholder={focus ? "" : placeholder}
          />
        ) : (
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            className="rounded-md py-2 px-4 w-full focus:outline-none border border-gray"
            style={{ height, fontSize: placeholderSize }}
            placeholder={focus ? "" : placeholder}
          />
        )}

        {textError && (
          <div className="relative">
            <p className="text-red-500 text-xs mt-1 absolute">The name is too long, please use a shorter one.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactInput;
