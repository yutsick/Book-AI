import React, { useState } from "react";

const CustomInput = ({ placeholder = "Enter text", label = "Field label", title = null, description = null, onChange }) => {
  const [value, setValue] = useState("");
  const [focus, setFocus] = useState(false);
  const [localPlaceholder, setLocalPlaceholder] = useState(placeholder);
  const [textError, setTextError] = useState(false);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    newValue.length > 24 ? setTextError(true) : setTextError(false);

    if (onChange) {
      onChange(newValue);
    }
  };

  const handleFocus = () => {
    setFocus(true);
    setLocalPlaceholder('');
  };
  const handleBlur = () => {
    setFocus(false);
    setLocalPlaceholder(placeholder);

  };

  return (
    <div className="w-full mb-8 ">
      <div className="flex items-center space-x-2">
        <p className="field-title">{title}</p>
      </div>
      <div className="field-desc">{description}</div>
      <div className="relative ">
        {(value || focus) && (

          <label
            className="absolute top-4 left-2 text-[#8F8F8F] text-[14px] transition-all "
          >
            {label}
          </label>
        )}

        {textError && (
          <div className="absolute top-[45%]  right-4 text-[#DD4E4E] text-[15px] flex items-center">
            <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.97372 18.0001L11.5 1.50012L21.0263 18.0001H1.97372Z" stroke="#DD4E4E" strokeWidth="0.5" />
              <path d="M12.3763 6.78271L12.2863 13.4075H11.2422L11.1521 6.78271H12.3763ZM11.7642 16.0719C11.5422 16.0719 11.3517 15.9924 11.1927 15.8334C11.0336 15.6743 10.9541 15.4838 10.9541 15.2618C10.9541 15.0398 11.0336 14.8492 11.1927 14.6902C11.3517 14.5312 11.5422 14.4517 11.7642 14.4517C11.9863 14.4517 12.1768 14.5312 12.3358 14.6902C12.4948 14.8492 12.5743 15.0398 12.5743 15.2618C12.5743 15.4088 12.5368 15.5438 12.4618 15.6668C12.3898 15.7899 12.2923 15.8889 12.1693 15.9639C12.0493 16.0359 11.9142 16.0719 11.7642 16.0719Z" fill="#DD4E4E" />
            </svg>

            The Name is too long, we recommend using a shorter one
          </div>
        )}


        <input
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="mt-[14px] rounded-[3px] py-2 px-4 w-full h-[60px] focus:outline-none text-[17px]"
          placeholder={value ? "" : localPlaceholder}
        />
      </div>
    </div>
  );
};

export default CustomInput;