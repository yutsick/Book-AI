import React, { useState } from "react";

const CustomInput = ({ placeholder = "Enter text", label = "Field label", title = null, description=null }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => setValue(e.target.value);

  return (
    <div className="w-full mb-8 ">
      <div className="flex items-center space-x-2">
        <p className="field-title">{title}</p>
      </div>
      <div className="field-desc">{description}</div>
      <div className="relative ">
      {value && (

        <label
          className="absolute top-4 left-0 text-gray-500 text-sm transition-all scale-75"
        >
          {label}
        </label>
      )}


      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="mt-[14px] rounded-[3px] py-2 px-4 w-full h-[60px]"
        placeholder={value ? "" : placeholder}
      />
      </div>
    </div>
  );
};

export default CustomInput;