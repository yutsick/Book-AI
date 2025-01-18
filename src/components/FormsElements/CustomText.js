import React, { useState, useEffect, useRef } from "react";

const FloatingInput = ({
  placeholder = "Enter text",
  label = "Field label",
  title = null,
  description = null,
  tip=null,
  setIsButtonDisabled = true
}) => {
  const [value, setValue] = useState("");
  const [localPlaceholder, setLocalPlaceholder] = useState(placeholder);
  const [isFocused, setIsFocused] = useState(false);
  
  const textareaRef = useRef(null);
  const handleChange = (e) => setValue(e.target.value);

  const handleFocus = () => {
    setLocalPlaceholder('');
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (value !== '') {
      setIsButtonDisabled(false);
      setIsFocused(false);
    
    } else {
      setLocalPlaceholder(placeholder); 
      setIsButtonDisabled(true)
      setValue('');
      setIsFocused(true);
    }
  };

 
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
    
        
          <label className={`absolute top-3 left-4    transition-all 
            ${!isFocused && value ? 'text-[#8F8F8F] text-[12px]' : 'text-gray text-[17px] font-medium' }
            `}>
            {label}
          </label>
          { tip && (
            <div className="mr-4 w-fit absolute bottom-3 left-4 rounded-[5px] min-h-[26px] px-4 flex items-center  text-[13px] bg-[#F9F6EB]">
              <div className="text-[#232323] min-w-[95px] flex items-center">
                <span>Pro Advice</span>
                <span><img src="images/create-book/icon-tip.svg" alt="" /></span>
              </div>
              <span className="text-gray/85">{tip}</span>
              
            </div>
          )

          }

        

        <textarea 
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className= {`"text-[14px] leading-[16px] text-gray placeholder:text-[12px] placeholder:leading-[16px]  rounded-[3px] pt-10 pb-2 px-4 w-full min-h-[125px] resize-none overflow-hidden focus:outline-none 
            ${tip ? 'pb-16 md:pb-4' : ''}"`}
          placeholder={value ? "" : localPlaceholder}
          rows={1} 
        />
      </div>
    </div>
  );
};

export default FloatingInput;
