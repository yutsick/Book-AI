import React, { useEffect, useState, useContext } from "react";
import CreateGenreContext from "@/contexts/CreateGenreContext";
import CreateBookContext from "@/contexts/CreateBookContext";
import RadioButtonList from "@/components/FormsElements/RadioButtonList";
import ReCAPTCHA from "react-google-recaptcha";
import { useBookAPI } from "@/hooks/useBookAPI";
import config from "../../../config";
function Step5({ setProgressStep, setIsButtonDisabled }) {
  const { questionsUrl } = config;
  const RECAPTCHA_SITE_KEY = "6LceUPgqAAAAAPY7FdQ9Wo9v_bIpM7uCaFXLiJI1"; 


  const { selectedTopic, setSelectedTopic, setSelectedSubTopic, selectedGenre } = useContext(CreateGenreContext);
  const { authorName, selectedAge, selectedGender, questionsAndAnswers } = useContext(CreateBookContext);
  const { books, loading, error } = useBookAPI();

  const [visibleTopics, setVisibleTopics] = useState([]);
  const [storedTopics, setStoredTopics] = useState([]);
  const [regenerate, setRegenerate] = useState(false);
  const [questions, setQuestions] = useState(null);

  const [regenerateCount, setRegenerateCount] = useState(0);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const toggleLoading = (state) => {
    setRegenerate(state);
    setIsButtonDisabled(state || !selectedTopic); 
  };
  
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(questionsUrl);
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setQuestions([]);
      }
    };

    fetchQuestions();
  }, [questionsUrl]);

  useEffect(() => {
    const storedVisible = JSON.parse(localStorage.getItem("visibleBooks")) || [];
    const storedHidden = JSON.parse(localStorage.getItem("storedBooks")) || [];

    if (storedVisible.length > 0) {
      setVisibleTopics(storedVisible);
      setStoredTopics(storedHidden);
    }
  }, []);



  useEffect(() => {
   

    if (Array.isArray(books) && books.length > 0 && !selectedTopic) {
      

      const visible = books.slice(0, 3);
      const stored = books.slice(3);

      setVisibleTopics(visible);
      setStoredTopics(stored);

      localStorage.setItem("visibleBooks", JSON.stringify(visible));
      localStorage.setItem("storedBooks", JSON.stringify(stored));
    }
  }, [books]);

  useEffect(() => {
    setProgressStep(4);
  }, [setProgressStep]);

  useEffect(() => {
    setIsButtonDisabled(!selectedTopic || loading);
    return () => {
      setIsButtonDisabled(false);
    };
  }, [setIsButtonDisabled, selectedTopic, loading]);

  const fetchNewBooks = async () => {
    toggleLoading(true);
    try {

      const response = await fetch("https://api.booktailor.com/generate-titles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author_name: authorName,
          genre: selectedGenre || null,
          gender: selectedGender || null,
          age: selectedAge ? String(selectedAge.value) : null,
            quiz_answers: questionsAndAnswers
              .filter((el) => el.answer.length !== 0)
              .map(({ value, answer }) => {
                const questionObj = questions.find((q) => q.value === value);
                return {
                  question: questionObj ? questionObj.label.replace("{author}", authorName) : "Unknown question",
                  answer,
                };
              }),
          
        }),
      });

      if (!response.ok) throw new Error("❌ API request error");

      const data = await response.json();
      const booksKey = Object.keys(data).find((key) => Array.isArray(data[key]));
      const formattedBooks = data[booksKey].map(({ title, subtitle }) => ({ title, subtitle }));

      if (formattedBooks.length === 0) throw new Error("⚠️ API reponse is empty");

      toggleLoading(false);

      return formattedBooks;
    } catch (error) {
      console.error("🚨 Book fetching error:", error);
      return null;
    }
  };

  const handleCaptchaVerify = async (token) => {
    try {
      const res = await fetch("/api/verify-recaptcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
  
      const data = await res.json();
      
      if (data.success) {
        setRegenerateCount(0);
        setShowCaptcha(false);
        setCaptchaVerified(true);
      } else {
        alert("Failed reCAPTCHA verification");
      }
    } catch (error) {
      console.error("Error verifying reCAPTCHA:", error);
    }
  };

  const handleRegenerate = async (index, topic) => {
    if (regenerateCount >= 20 && !captchaVerified) {
      setShowCaptcha(true);
      setRegenerateCount(0);
      setCaptchaVerified(false);
      return;
    }
  
    setRegenerateCount(prevCount => prevCount + 1);
    let savedBooks = JSON.parse(localStorage.getItem("storedBooks")) || [];
  
    if (savedBooks.length === 0) {
      toggleLoading(true);
      const newBooks = await fetchNewBooks();
      if (!newBooks) {
        toggleLoading(false);
        return;
      }
  
      localStorage.setItem("storedBooks", JSON.stringify(newBooks));
      setStoredTopics(newBooks);
      savedBooks = newBooks;
    }
  
    const newTopic = savedBooks.shift();
    const updatedVisible = [...visibleTopics];
    updatedVisible[index] = newTopic;
    setVisibleTopics(updatedVisible);
    setStoredTopics(savedBooks);
  
    localStorage.setItem("visibleBooks", JSON.stringify(updatedVisible));
    localStorage.setItem("storedBooks", JSON.stringify(savedBooks));
  
    if (selectedTopic === topic.title) {
      setSelectedTopic(null);
      setSelectedSubTopic(null);
      localStorage.removeItem("selectedTopic");
      localStorage.removeItem("selectedSubTopic");
    }
  
    toggleLoading(false);
  };
  
  

  return (

      <div className="relative">
        {showCaptcha ? (
          <div className="absolute w-full h-full bg-transparent flex justify-center items-center">
          <div className="bg-white p-6 shadow-lg rounded-md">
            <p className="text-center text-lg font-semibold">Please verify you're human</p>
            <div className="flex justify-center mt-4">
              <ReCAPTCHA
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={handleCaptchaVerify}
              />
            </div>
          </div>
        </div>
        ) : (
          regenerate && (
            <div className="absolute w-full h-full bg-transparent flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-amber-600 border-opacity-50"></div>
            </div>
          )
        )}
    
        <div className="w-full mt-4 md:mt-2 md:px-6">
          <div className="field-title">Choose a title and subtitle</div>
          {loading && (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-amber-600 border-opacity-50"></div>
            </div>
          )}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {visibleTopics.length > 0 && !loading && (
            <div className="my-8">
              {visibleTopics.map((topic, index) => (
                <div key={topic.id || `visible-topic-${index}`} className="flex items-center justify-between mb-3">
                  <RadioButtonList
                    options={[topic]}
                    selectedValue={selectedTopic}
                    setIsButtonDisabled={setIsButtonDisabled}
                    type="topic"
                  />
                  <button
                    onClick={() => handleRegenerate(index, topic)}
                    className="flex flex-col justify-center items-center ml-3 md:ml-2 md:hover:scale-105 text-sm"
                  >
                    <img className="w-7" src="images/create-book/icon-regenerate.svg" alt="" />
                    <span className="hidden md:block">Recreate</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
 
  );
}

export default Step5;
