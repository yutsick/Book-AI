import React, { useState, useEffect, useRef } from "react";

const FloatingInput = ({
  value = "", // Приймаємо пропс для зовнішнього значення
  onChange = () => {}, // Функція для оновлення зовнішнього значення
  placeholder = null,
  label = "Field label",
  title = null,
  description = null,
  tip = null,
  setIsButtonDisabled = true,
  onDelete,
  textError,
}) => {
  const [localValue, setLocalValue] = useState(value); // Локальний стейт для керування значенням
  const [localPlaceholder, setLocalPlaceholder] = useState(placeholder);
  const [isFocused, setIsFocused] = useState(false);

  const labelRef = useRef(null);
  const placeholderRef = useRef(null);
  const textareaRef = useRef(null);
  const tipRef = useRef(null);

  const [labelHeight, setLabelHeight] = useState(0);
  const [placeholderHeight, setPlaceholderHeight] = useState(0);
  const [tipHeight, setTipHeight] = useState(0);

  // Встановлення висоти label
  useEffect(() => {
    if (labelRef.current) {
      setLabelHeight(labelRef.current.offsetHeight);
    }
  }, [label]);

  // Встановлення висоти tip
  useEffect(() => {
    if (tipRef.current) {
      setTipHeight(tipRef.current.offsetHeight);
    }
  }, [tip]);

  // Встановлення висоти placeholder
  useEffect(() => {
    if (placeholderRef.current) {
      setPlaceholderHeight(placeholderRef.current.offsetHeight);
    }
  }, [localPlaceholder, localValue]);

  // Оновлення локального стейту і передача змін наверх
  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue); // Оновлюємо локальний стейт
    onChange(newValue); // Викликаємо функцію для оновлення зовнішнього стейту

    // Автоматичне регулювання висоти textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  // Обробка фокусу
  const handleFocus = () => {
    setLocalPlaceholder("");
    setIsFocused(true);
  };

  // Обробка втрати фокусу
  const handleBlur = () => {
    if (localValue !== "") {
      setIsButtonDisabled(false);
      setIsFocused(false);
    } else {
      setLocalPlaceholder(placeholder);
      setIsButtonDisabled(true);
      setLocalValue("");
      if (textareaRef.current) {
        textareaRef.current.style.height = `${labelHeight + placeholderHeight + tipHeight + 50}px`;
      }
    }
  };

  // Регулювання висоти при зміні значення
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [localValue]);

  return (
    <div className="w-full mb-2">
      {title && (
        <div className="flex items-center space-x-2">
          <p className="field-title">{title}</p>
        </div>
      )}

      {description && <div className="field-desc">{description}</div>}

      <div className="relative w-full">
        {/* Label */}
        <label
          ref={labelRef}
          className={`absolute top-3 left-4 pr-6 transition-all leading-[16px] ${
            !isFocused && localValue
              ? "text-[#8F8F8F] text-[12.5px]"
              : "text-gray text-[16.5px] font-medium"
          }`}
        >
          {label}
        </label>

        {/* Tip */}
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

        {/* Delete Button */}
        <button
          type="button"
          className="absolute top-2 right-2 text-[#b0b0b0] font-light"
          onClick={onDelete}
        >
          ✖
        </button>

        {/* Placeholder (Invisible для визначення висоти) */}
        <div
          ref={placeholderRef}
          className="invisible absolute top-0 left-0 text-[12px] leading-[16px] px-4"
        >
          {localPlaceholder}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={localValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`text-[14px] leading-[20px] text-gray placeholder:text-[12px] placeholder:leading-[16px] rounded-[3px] px-4 w-full resize-none overflow-hidden focus:outline-none box-border ${
            tip ? "pb-16" : "pb-4"
          }`}
          placeholder={localValue ? "" : localPlaceholder}
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
