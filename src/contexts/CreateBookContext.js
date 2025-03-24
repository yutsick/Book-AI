"use client";

import { createContext, useState, useEffect, useRef } from "react";
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

  const savedTemplateId = localStorage.getItem('selectedTemplateId') || 1;
  const [selectedTemplate, setSelectedTemplate] = useState({
    templatesAdjusted: [],
    templateId: savedTemplateId || null,
    front: "",
    back: "",
    spine: "",
    crop: { x: 0, y: 0 },
    zoom: 1.5,
  });

  const [selectedCopies, setSelectedCopies] = useState(() => getStoredValue("selectedCopies", 1));
  const [selectedCoverIndex, setSelectedCoverIndex] = useState(() => getStoredValue("selectedCoverIndex", 0));
  const [selectedCover, setSelectedCover] = useState(() => getStoredValue("selectedCover", ''));
  const [selectedShippingIndex, setSelectedShippingIndex] = useState(() => getStoredValue("selectedShippingIndex", 0));
  const [subtotal, setSubtotal] = useState(() => getStoredValue("subtotal", 0));
  const [totalPrice, setTotalPrice] = useState(() => getStoredValue("totalPrice", 0));

  const [contextUpdated, setContextUpdated] = useState(() => getStoredValue("contextUpdated", false));
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

  useEffect(() => {
    loadTemplateFromIndexedDB(); 
    setIsTemplateLoaded(true);
  }, []);  

  const [isTemplateLoaded, setIsTemplateLoaded] = useState(false);

  useEffect(() => {
    if (selectedTemplate) {
      localStorage.setItem('selectedTemplateId', selectedTemplate.templateId);

    }
  }, [selectedTemplate.templateId]);

  // templates
  const urlToBase64 = async (url) => {

    const response = await fetch(url);
    const blob = await response.blob();
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);  
      reader.onerror = reject;
      reader.readAsDataURL(blob);  
    });
  };

  const saveTemplateToIndexedDB = async (template) => {
    const frontBase64 = await urlToBase64(template.front);
    const backBase64 = await urlToBase64(template.back);
    const spineBase64 = await urlToBase64(template.spine);
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
  
  useEffect(() => {
    if(!isTemplateLoaded) return;
    saveTemplateToIndexedDB(selectedTemplate);
  }, [selectedTemplate]);
  
  const openIndexedDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('templateDB', 1);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;

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

  const request = store.get('selectedTemplate');

  request.onsuccess = () => {
    const result = request.result;
    if (result) {
      if (result) {
        const frontBlob = base64ToBlob(result.front);
        const backBlob = base64ToBlob(result.back);
        const spineBlob = base64ToBlob(result.spine);

        const frontURL = URL.createObjectURL(frontBlob);
        const backURL = URL.createObjectURL(backBlob);
        const spineURL = URL.createObjectURL(spineBlob);

        setSelectedTemplate({
          ...selectedTemplate,
          front: frontURL,
          back: backURL,
          spine: spineURL,

        });
        setSelectedCover({
          frontCover: frontURL,
          backCover: backURL,
          spineCover: spineURL,
        });
      } else {
        console.error("Front image is undefined");
      }
    } else {
      console.warn("No template found in IndexedDB");
    }
  };

  request.onerror = () => {
    console.error("Error retrieving template from IndexedDB:", request.error);
  };
};


const base64ToBlob = (base64) => {
  if (!base64 || typeof base64 !== 'string') {
    throw new Error('Provided value is not a valid Base64 string');
  }



  const byteCharacters = atob(base64.split(',')[1]);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset++) {
    const byte = byteCharacters.charCodeAt(offset);
    byteArrays.push(byte);
  }

  const byteArray = new Uint8Array(byteArrays);
  return new Blob([byteArray], { type: 'image/png' }); 
};




  
  // End templates

  useEffect(() => {
    localStorage.setItem("contextUpdated", JSON.stringify(contextUpdated));
    localStorage.setItem("authorName", JSON.stringify(authorName));
    localStorage.setItem("selectedAge", JSON.stringify(selectedAge));
    localStorage.setItem("selectedGender", JSON.stringify(selectedGender));
    localStorage.setItem("questionsAndAnswers", JSON.stringify(questionsAndAnswers));
    localStorage.setItem("authorEmail", JSON.stringify(authorEmail));
    localStorage.setItem("praises", JSON.stringify(praises));
    localStorage.setItem("tableOfContents", JSON.stringify(tableOfContents));
  }, [
    contextUpdated,
    authorName,
    selectedAge,
    selectedGender,
    questionsAndAnswers,
    authorEmail,
    praises,
    tableOfContents,
  ]);

  


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

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; 
    }
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
