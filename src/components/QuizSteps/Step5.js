import React, { useEffect, useState, useContext } from "react";
import CreateGenreContext from "@/contexts/CreateGenreContext";
import CreateBookContext from "@/contexts/CreateBookContext";
import RadioButtonList from "@/components/FormsElements/RadioButtonList";
import { useBookAPI } from "@/hooks/useBookAPI";

function Step5({ setProgressStep, setIsButtonDisabled }) {
  const { selectedTopic, setSelectedTopic, setSelectedSubTopic, selectedGenre } = useContext(CreateGenreContext);
  const { authorName, selectedAge, selectedGender, questionsAndAnswers } = useContext(CreateBookContext);
  const { books, loading, error } = useBookAPI();

  const [visibleTopics, setVisibleTopics] = useState([]);
  const [storedTopics, setStoredTopics] = useState([]);
  const [regenerate, setRegenerate] = useState(false);

  const startLoading = () => {
    setRegenerate(true);
    setIsButtonDisabled(true); 
  };
  
  const stopLoading = () => {
    setRegenerate(false);
    setIsButtonDisabled(false); 
  };

  useEffect(() => {
    const storedVisible = JSON.parse(localStorage.getItem("visibleBooks")) || [];
    const storedHidden = JSON.parse(localStorage.getItem("storedBooks")) || [];

    if (storedVisible.length > 0) {
      setVisibleTopics(storedVisible);
      setStoredTopics(storedHidden);
    }
  }, []);



  useEffect(() => {
    if (Array.isArray(books) && books.length > 0 && visibleTopics.length === 0) {
      console.log("📚 Books from API:", books);

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
    setIsButtonDisabled(!selectedTopic);
    return () => {
      setIsButtonDisabled(false);
    };
  }, [setIsButtonDisabled, selectedTopic]);

  const fetchNewBooks = async () => {
    startLoading();
    try {

      const response = await fetch("https://api.booktailor.com/generate-titles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author_name: authorName,
          genre: selectedGenre || null,
          gender: selectedGender || null,
          age: selectedAge ? String(selectedAge.value) : null,
          quiz_answers: questionsAndAnswers,
        }),
      });

      if (!response.ok) throw new Error("❌ API request error");

      const data = await response.json();
      const booksKey = Object.keys(data).find((key) => Array.isArray(data[key]));
      const formattedBooks = data[booksKey].map(({ title, subtitle }) => ({ title, subtitle }));

      if (formattedBooks.length === 0) throw new Error("⚠️ API reponse is empty");

      stopLoading();

      return formattedBooks;
    } catch (error) {
      console.error("🚨 Book fetching error:", error);
      return null;
    }
  };


  const handleRegenerate = async (index, topic) => {
    let savedBooks = JSON.parse(localStorage.getItem("storedBooks")) || [];
  
    if (savedBooks.length === 0) {
      startLoading();
      const newBooks = await fetchNewBooks();
      if (!newBooks) {
        stopLoading();
        return;
      }
  
      localStorage.setItem("storedBooks", JSON.stringify(newBooks));
      setStoredTopics(newBooks);
  
      const newTopic = newBooks.shift();
  
      const updatedVisible = [...visibleTopics];
      updatedVisible[index] = newTopic;
  
      setVisibleTopics(updatedVisible);
      localStorage.setItem("visibleBooks", JSON.stringify(updatedVisible));
  
      // ✅ Скидаємо `selectedTopic`, якщо він був замінений
      if (selectedTopic === topic.title) {
        console.log("🗑 Скидаємо вибраний топік, бо він був перегенерований");
  
        setSelectedTopic(null);
        setSelectedSubTopic(null);
        localStorage.removeItem("selectedTopic");
        localStorage.removeItem("selectedSubTopic");
      }
  
      stopLoading();
      return;
    }
  
    const newTopic = savedBooks.shift();
    const updatedVisible = [...visibleTopics];
  
    // ✅ Якщо вибраний топік був змінений – скидаємо його в контексті та localStorage
    if (selectedTopic === topic.title) {
      console.log("🗑 Скидаємо вибраний топік, бо він був перегенерований");
  
      setSelectedTopic(null);
      setSelectedSubTopic(null);
      localStorage.removeItem("selectedTopic");
      localStorage.removeItem("selectedSubTopic");
    }
  
    updatedVisible[index] = newTopic;
  
    setVisibleTopics(updatedVisible);
    setStoredTopics(savedBooks);
  
    localStorage.setItem("visibleBooks", JSON.stringify(updatedVisible));
    localStorage.setItem("storedBooks", JSON.stringify(savedBooks));
  
    stopLoading();
  };
  

  return (
    <div className="relative">
       {regenerate && (
      <div className="absolute w-full h-full bg-black opacity-60 flex justify-center items-center">
        <div className=" ">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-amber-600 border-opacity-50"></div>
        </div>
      </div>
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
          <div className="my-8 ">
            {visibleTopics.map((topic, index) => (
              <div key={topic.id || `visible-topic-${index}`} className="flex items-center justify-between mb-3">
                <RadioButtonList

                  options={[topic]}
                  selectedValue={selectedTopic}
                  onChange={(value) => handleTopicChange(value, topic.description)}
                  setIsButtonDisabled={setIsButtonDisabled}
                  type="topic"
                />
                <button
                  onClick={() => handleRegenerate(index, topic)}
                  className=" flex flex-col justify-center items-center ml-2 px-2 py-1  hover:scale-105 text-sm"
                 
                >
                  <img src="images/create-book/icon-regenerate.svg" alt="" />
                  <span>Recreate</span>
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
