"use client";

import { createContext, useState } from "react";

const CreateBookContext = createContext();

export const CreateBookProvider = ({ children }) => {
  const [authorName, setAuthorName] = useState("");
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  const [authorEmail, setAuthorEmail] = useState(null);
  const [selectedCopies, setSelectedCopies] = useState({ value: 1, label: "1", price: 0 });
  const [selectedCoverIndex, setSelectedCoverIndex] = useState(0);
  const [selectedShippingIndex, setSelectedShippingIndex] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [authorImage, setAuthorImage] = useState(""); // Оригінальне зображення
  const [croppedImage, setCroppedImage] = useState(""); // Обрізане зображення
  const [processedAuthorImage, setProcessedAuthorImage] = useState(null); // Оброблене (можливо, з фільтрами)

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
