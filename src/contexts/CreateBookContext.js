"use client";

import { createContext, useState } from 'react';

const CreateBookContext = createContext();

export const CreateBookProvider = ({ children }) => {
  const [authorName, setAuthorName] = useState(""); 

  return (
    <CreateBookContext.Provider value={{ authorName, setAuthorName }}>
      {children}
    </CreateBookContext.Provider>
  );
};

export default CreateBookContext;
