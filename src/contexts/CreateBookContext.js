"use client";

import { createContext, useState, useEffect } from "react";

const CreateBookContext = createContext();

export const CreateBookProvider = ({ children }) => {
  const getStoredValue = (key, defaultValue = null) => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    }
    return defaultValue;
  };

  const [authorName, setAuthorName] = useState(() => getStoredValue("authorName", ""));
  const [selectedAge, setSelectedAge] = useState(() => getStoredValue("selectedAge", null));
  const [selectedGender, setSelectedGender] = useState(() => getStoredValue("selectedGender", null));
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState(() => getStoredValue("questionsAndAnswers", []));
  const [authorEmail, setAuthorEmail] = useState(() => getStoredValue("authorEmail", null));
  const [authorImage, setAuthorImage] = useState("");
  const [croppedImage, setCroppedImage] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState({
    templateId: null,
    front: "",
    back: "",
    spine: "",
    crop: { x: 0, y: 0 },  
    zoom: 1.5,            
  });
  
  const [praises, setPraises] = useState(null);

  const [selectedCopies, setSelectedCopies] = useState(1);
  const [selectedCoverIndex, setSelectedCoverIndex] = useState(0);
  const [selectedCover, setSelectedCover] = useState(0);
  const [selectedShippingIndex, setSelectedShippingIndex] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState(null);
  const [processedAuthorImage, setProcessedAuthorImage] = useState(null);

  useEffect(() => {
 
      localStorage.setItem("authorName", JSON.stringify(authorName));
    
      localStorage.setItem("selectedAge", JSON.stringify(selectedAge));
    
      localStorage.setItem("selectedGender", JSON.stringify(selectedGender));
    
    if (questionsAndAnswers.length > 0) {
      localStorage.setItem("questionsAndAnswers", JSON.stringify(questionsAndAnswers));
    }
    if (authorEmail && authorEmail.trim() !== "") {
      localStorage.setItem("authorEmail", JSON.stringify(authorEmail));
    }
  }, [authorName, selectedAge, selectedGender, questionsAndAnswers, authorEmail]);

  // Data update controlling
  const [contextUpdated, setContextUpdated] = useState(false);
  useEffect(() => {
    setContextUpdated(true);
  }, [authorName, selectedAge, selectedGender, questionsAndAnswers]);
  // const addQuestionAndAnswer = (question, answer) => {
  //   setQuestionsAndAnswers((prev) => {
  //     const existingIndex = prev.findIndex((qa) => qa.question === question);
  //     if (existingIndex !== -1) {
  //       const updated = [...prev];
  //       updated[existingIndex] = { ...updated[existingIndex], answer };
  //       return updated;
  //     }
  //     return [...prev, { question, answer }];
  //   });
  // };
  const addQuestionAndAnswer = (value, answer) => {
    setQuestionsAndAnswers((prev) => {
      const existingIndex = prev.findIndex((qa) => qa.value === value);
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], answer };
        return updated;
      }
      return [...prev, { value, answer }];
    });
  };
  
  const removeQuestion = (value) => { 
    setQuestionsAndAnswers((prev) =>
      prev.filter((item) => item.value !== value) 
    );
  };
  

  const handleImageUpload = (file) => {
    if (!file) return;
    setAuthorImage(file);
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
        authorEmail,
        setAuthorEmail,
        authorImage,
        setAuthorImage,
        croppedImage,
        setCroppedImage,
        processedAuthorImage,
        setProcessedAuthorImage,
        selectedTemplate,
        setSelectedTemplate,
        handleImageUpload,
        error,
        setError,
        selectedCopies,
        setSelectedCopies,
        selectedCoverIndex,
        setSelectedCoverIndex,
        selectedShippingIndex,
        setSelectedShippingIndex, 
        selectedCover,
        setSelectedCover,
        subtotal, 
        setSubtotal, 
        totalPrice, 
        setTotalPrice,
        contextUpdated, 
        setContextUpdated,
        praises,
        setPraises 
      }}
    >
      {children}
    </CreateBookContext.Provider>
  );
};

export default CreateBookContext;
