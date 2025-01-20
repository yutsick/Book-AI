import React, { useState, useEffect, useRef } from "react";

const FloatingInput = ({
  placeholder = null,
  label = "Field label",
  title = null,
  description = null,
  tip = null,
  setIsButtonDisabled = true,
  onDelete,
  textError,
}) => {
  const [value, setValue] = useState("");
  const [localPlaceholder, setLocalPlaceholder] = useState(placeholder);
  const [isFocused, setIsFocused] = useState(false);

  const labelRef = useRef(null);
  const placeholderRef = useRef(null);
  const textareaRef = useRef(null);
  const tipRef = useRef(null);
  const [labelHeight, setLabelHeight] = useState(0);
  const [placeholderHeight, setPlaceholderHeight] = useState(0);
  const [tipHeight, setTipHeight] = useState(0);

  useEffect(() => {
    if (labelRef.current) {
      setLabelHeight(labelRef.current.offsetHeight);
    }
  }, [label]);

  useEffect(() => {
    if (tipRef.current) {
      setTipHeight(tipRef.current.offsetHeight);
    }
  }, [tip]);

  useEffect(() => {
    if (placeholderRef.current) {
      setPlaceholderHeight(placeholderRef.current.offsetHeight);
    }
  }, [localPlaceholder, value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);

  
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; 
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; 
    }
  };

  const handleFocus = () => {
    setLocalPlaceholder("");
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (value !== "") {
      setIsButtonDisabled(false);
      setIsFocused(false);
    } else {
      setLocalPlaceholder(placeholder);
      setIsButtonDisabled(true);
      setValue("");
      if (textareaRef.current) {
        textareaRef.current.style.height = `${labelHeight + placeholderHeight + tipHeight + 50}px`;
      }
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight  }px`;
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

      <div className="relative w-full">
        <label
          ref={labelRef}
          className={`absolute top-3 left-4 pr-6 transition-all leading-[16px] ${
            !isFocused && value
              ? "text-[#8F8F8F] text-[12.5px]"
              : "text-gray text-[16.5px] font-medium"
          }`}
        >
          {label}
        </label>
        {tip && (
          <div
            ref={tipRef}
            className="w-full absolute bottom-[25px] left-4 rounded-[5px] min-h-[26px] px-2 md:px-4 flex items-center text-[13px] leading-[13px] py-1 bg-[#F9F6EB] max-w-[calc(100%-32px)]"
          >
            <div className="text-[#232323] md:min-w-[95px] flex items-center">
              <span className="hidden md:block">Pro Advice</span>
              <span className="mr-2 md:mr-0">
                <img
                  className="min-w-[25px]"
                  src="images/create-book/icon-tip.svg"
                  alt=""
                />
              </span>
            </div>
            <span className="text-gray/85">{tip}</span>
          </div>
        )}

        <button
          type="button"
          className="absolute top-2 right-2 text-[#b0b0b0] font-light"
          onClick={onDelete}
        >
          ✖
        </button>

        <div
          ref={placeholderRef}
          className="invisible absolute top-0 left-0 text-[12px] leading-[16px] px-4"
        >
          {localPlaceholder}
        </div>

        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`text-[14px] leading-[20px] text-gray placeholder:text-[12px] placeholder:leading-[16px] rounded-[3px] px-4 w-full resize-none overflow-hidden focus:outline-none box-border ${
            tip ? "pb-16" : "pb-4"
          }`}
          placeholder={value ? "" : localPlaceholder}
          rows={1}
          style={{
            paddingTop: `${labelHeight + 20}px`,
            minHeight: `${labelHeight + placeholderHeight + tipHeight + 54}px`,
          }}
        />
      </div>
    </div>
  );
};

export default FloatingInput;
