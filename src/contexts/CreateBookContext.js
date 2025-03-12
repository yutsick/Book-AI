"use client";

import { createContext, useState, useEffect } from "react";
import { debouncedImageUpdate } from "@/utils/imageUpdater";
import useDebouncedUpdate from "@/hooks/useDebouncedUpdate";

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
  const [praises, setPraises] = useState(() => getStoredValue("praises", null));
  const [tableOfContents, setTableOfContents] = useState(() => getStoredValue("tableOfContents", []));
  const [originalToc, setOriginalToc] = useState([]);
  const [questions, setQuestions] = useState([]);
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

  const [selectedCopies, setSelectedCopies] = useState(1);
  const [selectedCoverIndex, setSelectedCoverIndex] = useState(0);
  const [selectedCover, setSelectedCover] = useState('');
  const [selectedShippingIndex, setSelectedShippingIndex] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState(null);
  const [errorToc, setErrorToc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processedAuthorImage, setProcessedAuthorImage] = useState(null);


  useEffect(() => {
    localStorage.setItem("authorName", JSON.stringify(authorName));
    localStorage.setItem("selectedAge", JSON.stringify(selectedAge));
    localStorage.setItem("selectedGender", JSON.stringify(selectedGender));
    localStorage.setItem("questionsAndAnswers", JSON.stringify(questionsAndAnswers));
    localStorage.setItem("authorEmail", JSON.stringify(authorEmail));
    localStorage.setItem("praises", JSON.stringify(praises));
    localStorage.setItem("tableOfContents", JSON.stringify(tableOfContents));
  }, [
    authorName,
    selectedAge,
    selectedGender,
    questionsAndAnswers,
    authorEmail,
    praises,
    tableOfContents,
  ]);

  const [contextUpdated, setContextUpdated] = useState(false);


  const debouncedUpdate = useDebouncedUpdate();

  useEffect(() => {
    debouncedUpdate("name", authorName );
  }, [authorName]);

  useEffect(() => {
    debouncedUpdate("age", selectedAge?.value );
  }, [selectedAge?.value]);

  useEffect(() => {
    debouncedUpdate("gender", selectedGender );
  }, [selectedGender]);

  useEffect(() => {
    debouncedUpdate("quiz_answers", questionsAndAnswers );
  }, [questionsAndAnswers]);

  useEffect(() => {
    debouncedUpdate("email", authorEmail );
  }, [authorEmail]);

  useEffect(() => {
    debouncedUpdate("praises", praises );
  }, [praises]);

  useEffect(() => {
    debouncedUpdate("table_of_contents", originalToc );
  }, [tableOfContents]);

  useEffect(() => {
    debouncedImageUpdate(authorImage, croppedImage, selectedTemplate);
    
  }, [authorImage, croppedImage, selectedTemplate]);

  useEffect(() => {
    setContextUpdated(true);
  }, [authorName, selectedAge, selectedGender, questionsAndAnswers]);

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

  const updateBookData = (data) => {
    setAuthorEmail(data.email || "");
    setAuthorName(data.name || "");
    setQuestionsAndAnswers(data.quiz_answers || []);
    setPraises(data.praises || []);
    setTableOfContents(data.table_of_contents || []);
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
        errorToc,
        setErrorToc,
        loading,
        setLoading,
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
        praises,
        setPraises,
        tableOfContents,
        setTableOfContents,
        originalToc,
        setOriginalToc,
        updateBookData,
        contextUpdated,
        setContextUpdated,
        questions,
        setQuestions,
      }}
    >
      {children}
    </CreateBookContext.Provider>
  );
};

export default CreateBookContext;
