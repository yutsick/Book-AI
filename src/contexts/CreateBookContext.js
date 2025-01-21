"use client";

import { createContext, useState } from 'react';

const CreateBookContext = createContext();

export const CreateBookProvider = ({ children }) => {
  const [authorName, setAuthorName] = useState(""); 
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);

  const addQuestionAndAnswer = (question, answer) => {
    setQuestionsAndAnswers((prev) => {
      const existingIndex = prev.findIndex((qa) => qa.question === question);
      if (existingIndex !== -1) {
        // Якщо питання вже існує, оновлюємо відповідь
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], answer };
        return updated;
      }
      // Якщо питання нове, додаємо його
      return [...prev, { question, answer }];
    });
  };
  
  

  const removeQuestion = (question) => {
    setQuestionsAndAnswers((prev) =>
      prev.filter((item) => item.question !== question)
    );
  };

  return (
    <CreateBookContext.Provider 
      
      value={{
        authorName,
        setAuthorName,
        selectedAge,
        setSelectedAge,
        selectedGender,
        setSelectedGender,
        questionsAndAnswers,
        addQuestionAndAnswer,
        removeQuestion,
      }}
    >
      {children}
    </CreateBookContext.Provider>
  );
};

export default CreateBookContext;
