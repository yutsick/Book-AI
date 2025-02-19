import React, { useState } from "react";
import Select from "react-select";



const CustomSelect = ({
  options = [],
  onChange = () => { },
  value,
  placeholder = "Choose name",

}) => {
  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderRadius: "12px",
      padding: "0 12px",
      border: "none",
      backgroundColor: "#fff",
      boxShadow: "none",
      minHeight: "43px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#929292",
      fontSize: "17px",
      textAlign: "center",
    }),
    singleValue: (base) => ({
      ...base,
   
      color: "#000",
      fontSize: "17px",
      textAlign: "center",

    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "#929292",
      transition: "0.3s",
      

    }),
    indicatorSeparator: () => ({
      display: "none", // Прибираємо розділювач
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "10px",
      overflow: "hidden",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    }),
    menuList: (base) => ({
      ...base,
      padding: "0",
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected ? "#E0E0E0" : isFocused ? "#F0F0F0" : "#FFF",
      color: "#000",
      fontSize: "16px",
      padding: "10px",
      cursor: "pointer",
      textAlign: "center",
      "&:active": { backgroundColor: "#D0D0D0" },
    }),
    input: (base) => ({
      ...base,
      // height: 0,
      opacity: 0,
      pointerEvents: "none",
    })
  };


  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      styles={customStyles}
    />
  );
};

export default CustomSelect;
