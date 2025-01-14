import React, { useState } from "react";

const FloatingInput = ({ placeholder = "Enter text", label = "Field label" }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => setValue(e.target.value);

  return (
    <div className="relative w-full max-w-sm mt-4 ">
     
      {value && (
        <label
          className="absolute top-1 left-0 text-gray-500 text-sm transition-all scale-75"
        >
          {label}
        </label>
      )}

      
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="border border-gray-300 rounded-md py-2 px-4 w-full h-[60px]"
        placeholder={value ? "" : placeholder}
      />
    </div>
  );
};

export default FloatingInput;
