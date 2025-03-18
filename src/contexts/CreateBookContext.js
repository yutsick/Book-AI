"use client";

import { createContext, useState, useEffect } from "react";
import { debouncedImageUpdate } from "@/utils/imageUpdater";
import useDebouncedUpdate from "@/hooks/useDebouncedUpdate";
import { getImageFromDB, saveImageToDB } from "@/utils/indexedDB";
import { use } from "react";

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
    templatesAdjusted: [],
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
    async function fetchImages() {
      try {
        const storedAuthorImage = await getImageFromDB("authorImage");
        if (storedAuthorImage) setAuthorImage(storedAuthorImage);

        const storedCroppedImage = await getImageFromDB("croppedImage");
        if (storedCroppedImage) setCroppedImage(storedCroppedImage);
      } catch (error) {
        console.error("❌ Error loading images from IndexedDB:", error);
      }
    }

    fetchImages();
  }, []);

  // templates
  const urlToBlob = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return blob;
  };
  
  const urlToBase64 = async (url) => {
    // Завантажуємо Blob з URL
    const response = await fetch(url);
    const blob = await response.blob();
    
    // Перетворюємо Blob в Base64
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);  // reader.result буде Base64
      reader.onerror = reject;
      reader.readAsDataURL(blob);  // Перетворюємо в Base64
    });
  };

  const saveTemplateToIndexedDB = async (template) => {
    const frontBase64 = await urlToBase64(selectedTemplate.front);
    const backBase64 = await urlToBase64(selectedTemplate.back);
    const spineBase64 = await urlToBase64(selectedTemplate.spine);
    console.log('Converted Base64 values:', { frontBase64, backBase64, spineBase64 });
    const db = await openIndexedDB();
    const transaction = db.transaction('templates', 'readwrite');
    const store = transaction.objectStore('templates');

    store.put({
      front: frontBase64,
      back: backBase64,
      spine: spineBase64,
    }, 'selectedTemplate');
   
    return transaction.complete;
  };
  
  
  // useEffect(() => {
  //   saveTemplateToIndexedDB(selectedTemplate);
  // }, [selectedTemplate]);
  
  const openIndexedDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('templateDB', 1);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;

      // Створення сховища з простим ключем 'id'
      if (!db.objectStoreNames.contains('templates')) {
        db.createObjectStore('templates');
      }
    };

    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = (e) => reject(e);
  });
};
// Load from DB
const loadTemplateFromIndexedDB = async () => {
  const db = await openIndexedDB();
  const transaction = db.transaction('templates', 'readonly');
  const store = transaction.objectStore('templates');
  
  const result = await store.get('selectedTemplate'); 
   
  if (result) {
    
    
    // const parsedData = JSON.parse(result);  // Розпарсити збережений JSON

    // Перетворюємо Base64 в Blob
    console.log(result.front);
    
    const frontBlob = base64ToBlob(result.front);
    // const backBlob = base64ToBlob(result.back);
    // const spineBlob = base64ToBlob(result.spine);

    // // Оновлюємо контекст з новими Blob
    // setSelectedTemplate({
    //   ...result,
    //   front: frontBlob,
    //   back: backBlob,
    //   spine: spineBlob,
    // });
  }
};

// Функція для перетворення Base64 в Blob
const base64ToBlob = (base64) => {
  // Перевіряємо, чи є base64 валідною строкою
  if (!base64 || typeof base64 !== 'string') {
    throw new Error('Provided value is not a valid Base64 string');
  }

  // Якщо Base64 не має префікса "data:", додаємо його
  if (!base64.startsWith('data:')) {
    base64 = 'data:image/png;base64,' + base64;
  }

  const byteCharacters = atob(base64.split(',')[1]);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset++) {
    const byte = byteCharacters.charCodeAt(offset);
    byteArrays.push(byte);
  }

  const byteArray = new Uint8Array(byteArrays);
  return new Blob([byteArray], { type: 'image/png' }); // Змінити тип, якщо потрібно
};


useEffect(() => {
  loadTemplateFromIndexedDB(); // Завантажуємо шаблон при першому рендері
}, []);  // Пустий масив, щоб спрацювало тільки при першому рендері

  
  // End templates

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
