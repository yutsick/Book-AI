import React, { useState, useEffect, useRef } from "react";

const FloatingInput = ({
  placeholder = "Enter text",
  label = "Field label",
  title = null,
  description = null
}) => {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  const handleChange = (e) => setValue(e.target.value);

 
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; 
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; 
    }
  }, [value]);

  return (
    <div className="w-full mb-2">

      {title && (
        <div className="flex items-center space-x-2">
          <p className="field-title">{title}</p>
        </div>
      )}

   
      {description && <div className="field-desc">{description}</div>}

      <div className="relative">
    
        
          <label className="absolute top-3 left-4 text-gray-500 text-{17px} font-semibold transition-all ">
            {label}
          </label>
        

        <textarea 
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          className="small-placeholder text-[14px] leading-[16px] text-[#8F8F8F]  rounded-[3px] pt-10 pb-2 px-4 w-full min-h-[125px] resize-none overflow-hidden focus:outline-none"
          placeholder={value ? "" : placeholder}
          rows={1} 
        />
      </div>
    </div>
  );
};

export default FloatingInput;
