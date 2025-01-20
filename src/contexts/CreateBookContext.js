"use client";

import { createContext, useState } from 'react';

const CreateBookContext = createContext();

export const CreateBookProvider = ({ children }) => {
  const [authorName, setAuthorName] = useState(""); 
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);

  return (
    <CreateBookContext.Provider 
      
      value={{
        authorName,
        setAuthorName,
        selectedAge,
        setSelectedAge,
        selectedGender,
        setSelectedGender,
      }}
    >
      {children}
    </CreateBookContext.Provider>
  );
};

export default CreateBookContext;
