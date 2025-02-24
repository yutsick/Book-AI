import { useState, useEffect, useContext, useRef } from "react";
import CreateBookContext from "@/contexts/CreateBookContext";
import CreateGenreContext from "@/contexts/CreateGenreContext";

export const useBookAPI = () => {
  const { 
    authorName, selectedAge, selectedGender, questionsAndAnswers, 
    contextUpdated, setContextUpdated 
  } = useContext(CreateBookContext);
  
  const { 
    selectedGenre, genreUpdated, setGenreUpdated, 
    setSelectedTopic, setSelectedSubTopic 
  } = useContext(CreateGenreContext);

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTriggered = useRef(false);

  useEffect(() => {
    let missingFields = [];

    if (!authorName) missingFields.push("authorName");
    // if (!selectedAge) missingFields.push("selectedAge");
    // if (!selectedGender) missingFields.push("selectedGender");
    if (questionsAndAnswers.length === 0) missingFields.push("questionsAndAnswers");
    // if (!selectedGenre) missingFields.push("selectedGenre");

    if (missingFields.length > 0) {
      console.error(`⛔ Missing required fields: ${missingFields.join(", ")}`);
      setLoading(false);
      setError(`Missing required fields: ${missingFields.join(", ")}`);
      return;
    }

    const storageKey = `books_${selectedGenre}`;

    if (!contextUpdated && !genreUpdated && typeof window !== "undefined") {
      const storedBooks = localStorage.getItem(storageKey);
      if (storedBooks) {
        try {
          const parsedBooks = JSON.parse(storedBooks);
          if (Array.isArray(parsedBooks) && parsedBooks.length > 0) {
            console.log("📦 Using books from localStorage:", parsedBooks);
            setBooks(parsedBooks);
            setLoading(false);
            return;
          }
        } catch (error) {
          console.error("❌ Error parsing stored books:", error);
        }
      }
    }

    if (genreUpdated) {
      console.log("🔄 Genre changed, regenerating books...");
      localStorage.removeItem(storageKey);
      setBooks([]);
      fetchTriggered.current = false;
    }

    if (fetchTriggered.current) {
      console.warn("🚫 API call already triggered, skipping...");
      return;
    }
    fetchTriggered.current = true;

    setContextUpdated(false);
    setGenreUpdated(false);

    const fetchBooks = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log("🌍 Fetching books from API...");
        const response = await fetch("https://api.booktailor.com/generate-titles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            author_name: authorName,
            genre: selectedGenre,
            gender: selectedGender,
            age: String(selectedAge),
            quiz_answers: questionsAndAnswers
          }),
        });

        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();

        const booksKey = Object.keys(data).find(key => Array.isArray(data[key]));

        if (!booksKey) {
          console.error("❌ API Response does not contain a book array:", data);
          throw new Error("Invalid API response: No book array found");
        }

        console.log(`✅ Found books array under key: ${booksKey}`);

        const formattedBooks = data[booksKey].map(({ title, subtitle }) => ({ title, subtitle }));

        console.log("📂 Saving to localStorage:", formattedBooks);
        localStorage.setItem(storageKey, JSON.stringify(formattedBooks));

        setBooks(formattedBooks);

        // 🔥 Скидаємо вибір теми після генерації
        console.log("🔄 Resetting selected topic after book generation...");
        setSelectedTopic("");
        setSelectedSubTopic("");

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [genreUpdated]); 

  return { books, loading, error };
};
