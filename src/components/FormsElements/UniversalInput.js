import React, { useState, useEffect, useContext } from "react";
import CreateBookContext from "@/contexts/CreateBookContext";


const CustomInput = ({
  type = "text",
  placeholder = "Enter text",
  label = "Field label",
  title = null,
  description = null,
  onChange,
  value,
  extraLabel = false,
  border = false,
  validateLength = false,
  maxLength = 24,
  setIsButtonDisabled,
  textError,
  setTextError
}) => {
  const context = useContext(CreateBookContext);
  const authorName = context?.authorName;
  const setAuthorName = context?.setAuthorName;
  const email = context?.email;
  const setEmail = context?.setAuthorEmail;

  const [focus, setFocus] = useState(false);
  const [localPlaceholder, setLocalPlaceholder] = useState(placeholder);

  const handleChange = (e) => {
    const newValue = e.target.value;
    
    if (type === "email" && setEmail) {
      setEmail(newValue);
    } else if (type === "text" && setAuthorName) {
      setAuthorName(newValue);
    }
    
    if (validateLength && type === "text") {
      newValue.length > maxLength ? setTextError(true) : setTextError(false);
    }

    if (onChange) onChange(newValue);
  };

  const handleFocus = () => {
    setFocus(true);
    setLocalPlaceholder("");
  };

  const handleBlur = () => {
    setFocus(false);
    setLocalPlaceholder(placeholder);
    if (validateLength && type === "text" && setIsButtonDisabled && !value) {
      setIsButtonDisabled(true);
    } else if (setIsButtonDisabled) {
      setIsButtonDisabled(false);
    }
  };

  return (
    <div className="w-full mb-8">
      <div className="flex items-center space-x-2">
        <p className="field-title">{title}</p>
      </div>
      <div className="field-desc">{description}</div>
      {extraLabel && (
        <label className="block text-gray-300   -mb-1">{label}</label>
      )}

      <div className="relative">
        {(value || focus) && (
     
          <label
          className={`absolute ${ focus || value ? 'top-[23px]' : 'top-2'} left-2 text-[#8F8F8F] text-[12.5px] transition-all `}
        >
          {label}
        </label>
        )}

        {textError && validateLength && type === "text" && (
          <div className="absolute md:top-[45%] left-0 md:left-auto md:right-4 text-[#DD4E4E] md:text-[15px] flex items-center text-[12px] top-[105%]">
            <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.97372 18.0001L11.5 1.50012L21.0263 18.0001H1.97372Z" stroke="#DD4E4E" strokeWidth="0.5" />
              <path d="M12.3763 6.78271L12.2863 13.4075H11.2422L11.1521 6.78271H12.3763ZM11.7642 16.0719C11.5422 16.0719 11.3517 15.9924 11.1927 15.8334C11.0336 15.6743 10.9541 15.4838 10.9541 15.2618C10.9541 15.0398 11.0336 14.8492 11.1927 14.6902C11.3517 14.5312 11.5422 14.4517 11.7642 14.4517C11.9863 14.4517 12.1768 14.5312 12.3358 14.6902C12.4948 14.8492 12.5743 15.0398 12.5743 15.2618C12.5743 15.4088 12.5368 15.5438 12.4618 15.6668C12.3898 15.7899 12.2923 15.8889 12.1693 15.9639C12.0493 16.0359 11.9142 16.0719 11.7642 16.0719Z" fill="#DD4E4E" />
            </svg>
            The Name is too long, we recommend using a shorter one
          </div>
        )}

        <input
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`mt-[14px] rounded-[3px]  ${ focus || value ? 'pb-[9px] pt-7' : 'pt-2 pb-2'} ${border ? "border" : ""} border-gray-300 px-4 w-full h-[60px] focus:outline-none text-[17px]`}
          placeholder={value ? "" : localPlaceholder}
        />
      </div>
    </div>
  );
};


export default CustomInput;


