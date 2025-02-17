"use client";

import { createContext, useContext, useState, useEffect } from "react";

const GenreContext = createContext();

export const GenreProvider = ({ children }) => {

  const getStoredValue = (key, defaultValue = "") => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(key);
      return saved && saved.trim() !== "" ? saved : defaultValue;
    }
    return defaultValue;
  };


  const [selectedGenre, setSelectedGenre] = useState(() => getStoredValue("selectedGenre", ""));
  const [selectedTopic, setSelectedTopic] = useState(() => getStoredValue("selectedTopic", ""));
  const [selectedSubTopic, setSelectedSubTopic] = useState(() => getStoredValue("selectedSubTopic", ""));


  useEffect(() => {
    if (selectedGenre.trim() !== "") {
      localStorage.setItem("selectedGenre", selectedGenre);
    }
    if (selectedTopic.trim() !== "") {
      localStorage.setItem("selectedTopic", selectedTopic);
    }
    if (selectedSubTopic.trim() !== "") {
      localStorage.setItem("selectedSubTopic", selectedSubTopic);
    }
  }, [selectedGenre, selectedTopic, selectedSubTopic]);

  return (
    <GenreContext.Provider
      value={{
        selectedGenre,
        setSelectedGenre,
        selectedTopic,
        setSelectedTopic,
        selectedSubTopic,
        setSelectedSubTopic,
      }}
    >
      {children}
    </GenreContext.Provider>
  );
};


export const useGenre = () => {
  const context = useContext(GenreContext);
  if (!context) {
    throw new Error("useGenre must be used within a GenreProvider");
  }
  return context;
};

export default GenreContext;
