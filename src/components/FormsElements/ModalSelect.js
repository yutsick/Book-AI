import React, { useState, useRef } from "react";

const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

const CustomModalSelect = ({
  options,
  onChange = () => {},
  value,
  placeholder = "Choose name",
  resetOnSelect = false,
  title = null,
  iconOrange = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value || null);
  const [showFakeScrollbar, setShowFakeScrollbar] = useState(true);
  const listRef = useRef(null);

  const handleClose = () => {
    setIsOpen(false);
    window.scrollTo({ top: document.body.scrollHeight + 100, behavior: "instant" });
  };

  const handleOpen = () => {
    setIsOpen(true);
    setShowFakeScrollbar(true); // Повертаємо заглушку кожного разу при відкритті
  };

  const handleSelect = (option) => {
    onChange(option);
    if (resetOnSelect) {
      setSelected(null);
    } else {
      setSelected(option);
    }
    handleClose();
  };

  const handleScroll = () => {
    if (showFakeScrollbar) {
      setShowFakeScrollbar(false);
    }
  };

  return (
    <div className="mb-8">
      <div className="field-title">{title}</div>
      <div className="relative w-full h-[60px]">
        <button
          className="h-full w-full bg-white rounded-[3px] py-3 px-4 cursor-pointer flex justify-between items-center"
          onClick={handleOpen}
        >
          <span className={`text-[17px] ${selected ? "text-gray-700" : "text-[#2B2B2B]/80"}`}>
            {selected ? selected.label : placeholder}
          </span>
          {iconOrange ? (
            <div className="w-8 h-8 rounded-full text-[32px] leading-[32px] font-medium bg-orange text-white flex justify-center items-center pb-1 pl-[0.5px]">
              +
            </div>
          ) : (
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={() => setIsOpen(false)}>
            <div
              className="bg-white rounded-lg p-6 w-full max-w-[660px] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <ul
                  ref={listRef}
                  onScroll={handleScroll}
                  className="max-h-[280px] overflow-auto custom-scrollbar flex flex-col gap-[0.85rem]"
                  style={{
                    WebkitOverflowScrolling: "touch",
                  }}
                >
                  {options.map((option) => (
                    <li
                      key={option.value}
                      className={`border-[#959595] ${
                        isIOS ? "border-[1px]" : "border-[0.5px]"
                      } p-[10px] cursor-pointer rounded-md hover:bg-gray-100 mr-6 ${
                        option.isDisabled
                          ? "text-gray-300 opacity-50 cursor-not-allowed hover:bg-white"
                          : selected?.value === option.value
                          ? "bg-gray-200 font-bold "
                          : ""
                      }`}
                      onClick={() => !option.isDisabled && handleSelect(option)}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>

                {isIOS && showFakeScrollbar && (
                  <div className="absolute top-0 right-[3px] w-[3px] h-[30%] bg-gray-400 rounded-md pointer-events-none"></div>
                )}
              </div>

              <button onClick={handleClose} className="absolute right-2 top-1 text-[12px] text-gray-400">
                ✖
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomModalSelect;
