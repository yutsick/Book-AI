import React, { useState, useRef, useEffect } from "react";

const ContactSelect = ({
    options,
    onChange = () => { },
    value,
    placeholder = "Choose name",
    afterFocusPlaceholder = null,
    resetOnSelect = false,
    title = null,
    className = "",
    height = "60px",
    fontSize = "17px",
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(value || null);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const selectRef = useRef(null);
    const optionsRef = useRef(null);
    const inputRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);

    const handleToggle = () => setIsOpen((prev) => !prev);

    const handleSelect = (option) => {
        onChange(option);
        if (resetOnSelect) {
            setSelected(null);
            setIsFocused(false);
        } else {
            setSelected(option);
        }
        setIsOpen(false);
    };

    const handleBlur = (event) => {
        if (!selectRef.current.contains(event.relatedTarget)) {
            setIsOpen(false);
            if (!selected) setIsFocused(false);
        }
    };

    const handleKeyDown = (event) => {
        if (!isOpen && event.key === "Enter") {
            setIsOpen(true);
            event.preventDefault();
        } else if (isOpen) {
            switch (event.key) {
                case "ArrowDown":
                    setHighlightedIndex((prev) => (prev < options.length - 1 ? prev + 1 : prev));
                    event.preventDefault();
                    break;
                case "ArrowUp":
                    setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
                    event.preventDefault();
                    break;
                case "Enter":
                    if (highlightedIndex !== -1) {
                        handleSelect(options[highlightedIndex]);
                    }
                    break;
                case "Escape":
                    setIsOpen(false);
                    break;
                default:
                    break;
            }
        }
    };

    useEffect(() => {
        if (value) {
            setSelected(value);
        }
    }, [value]);

    return (
        <div
            className={className}
            ref={selectRef}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            onFocus={() => setIsFocused(true)}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-controls="dropdown-options"
            aria-labelledby="dropdown-label"
            tabIndex="0"
        >
            {title && <label id="dropdown-label" className="field-title">{title}</label>}

            <input
                ref={inputRef}
                type="text"
                value={selected?.label || ""}
                onChange={() => { }}
                style={{ position: "absolute", opacity: 0, height: 0 }}
                tabIndex="-1"
            />


            <div className="relative w-full h-[60px]" aria-live="polite">
                {afterFocusPlaceholder && (isFocused || selected) && (
                    <label className="absolute top-1 left-2 text-[#8F8F8F] text-[12.5px] transition-all">
                        {afterFocusPlaceholder}
                    </label>
                )}

                <div
                    className="h-full bg-white rounded-[3px] py-3 px-4 border border-gray cursor-pointer flex justify-between items-center rounded-md"
                    onClick={handleToggle}
                    style={{ height }}
                >
                    <span className={`${selected ? "text-gray" : "text-[#8F8F8F]"} text-[${fontSize}]`}>
                        {selected ? selected.label : placeholder}
                    </span>
                    <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                        <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                    </svg>
                </div>

                {isOpen && (
                    <ul
                        ref={optionsRef}
                        className="p-2 absolute left-0 right-0 mt-2 border border-gray-300 bg-white rounded-md shadow-lg z-10 max-h-48 overflow-auto"
                        role="listbox"
                        id="dropdown-options"
                        aria-activedescendant={highlightedIndex !== -1 ? `option-${highlightedIndex}` : undefined}
                    >
                        {options.map((option, index) => (
                            <li
                                key={option.value || `${option.label}-${index}`}
                                id={`option-${index}`}
                                className={`rounded-[3px] px-4 py-2 cursor-pointer hover:bg-[#F1F1F1] ${option.isDisabled
                                        ? "text-gray-300 opacity-20 cursor-not-allowed hover:bg-transparent"
                                        : highlightedIndex === index
                                            ? "bg-[#F1F1F1] text-black"
                                            : selected?.value === option.value
                                                ? "text-black bg-white"
                                                : ""
                                    }`}
                                onClick={() => !option.isDisabled && handleSelect(option)}
                                role="option"
                                aria-selected={selected?.value === option.value}
                                tabIndex={option.isDisabled ? -1 : 0} 
                                onKeyDown={(event) => {
                                    if (event.key === "Enter" || event.key === " ") {
                                        handleSelect(option); 
                                        event.preventDefault();
                                    }
                                }}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>

                )}
            </div>
        </div>
    );
};

export default ContactSelect;
