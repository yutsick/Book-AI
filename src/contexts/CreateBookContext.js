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
  const [authorImage, setAuthorImage] = useState(() => getStoredValue("authorImage", ""));
  const [croppedImage, setCroppedImage] = useState(() => getStoredValue("croppedImage", ""));
  const [selectedTemplate, setSelectedTemplate] = useState(() => getStoredValue("selectedTemplate", {
    templateId: null,
    front: "",
    back: "",
    spine: "",
    crop: { x: 0, y: 0 },  
    zoom: 1.5,            
  }));

  const [selectedCopies, setSelectedCopies] = useState({ value: 1, label: "1", price: 0 });
  const [selectedCoverIndex, setSelectedCoverIndex] = useState(0);
  const [selectedShippingIndex, setSelectedShippingIndex] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState(null);
  const [processedAuthorImage, setProcessedAuthorImage] = useState(null);

  useEffect(() => {
    if (authorName.trim() !== "") {
      localStorage.setItem("authorName", JSON.stringify(authorName));
    }
    if (selectedAge !== null) {
      localStorage.setItem("selectedAge", JSON.stringify(selectedAge));
    }
    if (selectedGender !== null) {
      localStorage.setItem("selectedGender", JSON.stringify(selectedGender));
    }
    if (questionsAndAnswers.length > 0) {
      localStorage.setItem("questionsAndAnswers", JSON.stringify(questionsAndAnswers));
    }
    if (authorEmail && authorEmail.trim() !== "") {
      localStorage.setItem("authorEmail", JSON.stringify(authorEmail));
    }
    if (typeof authorImage === "string" && authorImage.trim() !== "") {
      localStorage.setItem("authorImage", JSON.stringify(authorImage));
    }
    if (typeof croppedImage === "string" && croppedImage.trim() !== "") {
      localStorage.setItem("croppedImage", JSON.stringify(croppedImage));
    }
    if (selectedTemplate.templateId !== null) {
      localStorage.setItem("selectedTemplate", JSON.stringify(selectedTemplate));
    }
  }, [authorName, selectedAge, selectedGender, questionsAndAnswers, authorEmail, authorImage, croppedImage, selectedTemplate]);

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

  const convertFileToBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => callback(reader.result);
    reader.onerror = (error) => console.error("Error converting file:", error);
  };


  const handleImageUpload = (file) => {
    if (!file) return;
    convertFileToBase64(file, (base64) => setAuthorImage(base64));
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
        subtotal, 
        setSubtotal, 
        totalPrice, 
        setTotalPrice
      }}
    >
      {children}
    </CreateBookContext.Provider>
  );
};

export default CreateBookContext;
