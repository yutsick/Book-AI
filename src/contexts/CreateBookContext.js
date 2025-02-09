"use client";

import { createContext, useState } from "react";

const CreateBookContext = createContext();

export const CreateBookProvider = ({ children }) => {
  const [authorName, setAuthorName] = useState("");
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  const [authorEmail, setAuthorEmail] = useState(null);

  const [authorImage, setAuthorImage] = useState(""); 
  const [croppedImage, setCroppedImage] = useState(""); 
  const [processedAuthorImage, setProcessedAuthorImage] = useState(null); 

  const [error, setError] = useState(null);

  const addQuestionAndAnswer = (question, answer) => {
    setQuestionsAndAnswers((prev) => {
      const existingIndex = prev.findIndex((qa) => qa.question === question);
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], answer };
        return updated;
      }
      return [...prev, { question, answer }];
    });
  };

  const removeQuestion = (question) => {
    setQuestionsAndAnswers((prev) =>
      prev.filter((item) => item.question !== question)
    );
  };

  const [selectedTemplate, setSelectedTemplate] = useState({
    templateId: null,
    front: "",
    back: "",
    spine: "",
    crop: { x: 0, y: 0 },  // 🔥 Додаємо `crop` у контекст
    zoom: 1.5,            // 🔥 Додаємо `zoom` у контекст
  });
  


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
        authorEmail,
        setAuthorEmail,
        authorImage,
        setAuthorImage,
        croppedImage,
        setCroppedImage,
        processedAuthorImage,
        setProcessedAuthorImage,
        error,
        setError,
        selectedTemplate,
        setSelectedTemplate,
      }}
    >
      {children}
    </CreateBookContext.Provider>
  );
};

export default CreateBookContext;
