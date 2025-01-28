"use client";

import { createContext, useContext, useState } from "react";

const GenreContext = createContext();

export const GenreProvider = ({ children }) => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedSubTopic, setSelectedSubTopic] = useState("");

  return (
    <GenreContext.Provider value={{ 
      selectedGenre, 
      setSelectedGenre,
      selectedTopic, 
      setSelectedTopic,
      selectedSubTopic, 
      setSelectedSubTopic,
      
      }}>
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
