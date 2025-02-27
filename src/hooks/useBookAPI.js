import { useState, useEffect, useContext, useRef } from "react";
import CreateBookContext from "@/contexts/CreateBookContext";
import CreateGenreContext from "@/contexts/CreateGenreContext";
import config from "../../config";
export const useBookAPI = () => {
  const { questionsUrl } = config;
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
  const [questions, setQuestions] = useState(null);

  const fetchTriggered = useRef(false);
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
    if (!questions) return;
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

    const storageKey = `books`;

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
        // const response = await fetch("https://api.booktailor.com/generate-titles", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //     author_name: authorName,
        //     genre: selectedGenre || null,
        //     gender: selectedGender || null,
        //     age: selectedAge ? String(selectedAge.value) : null,
        //     quiz_answers: questionsAndAnswers
        //       .filter((el) => el.answer.length !== 0)
        //       .map(({ value, answer }) => {
        //         const questionObj = questions.find((q) => q.value === value);
        //         return {
        //           question: questionObj ? questionObj.label.replace("{author}", authorName) : "Unknown question",
        //           answer,
        //         };
        //       }),
        //   }),
        // });
        const mockFetch = () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                ok: true,
                json: async () => ({
                  bookTitles: [
                    {
                      title: "It took us 4 years, 3 months & 8 days to finally meet for coffee",
                      author: "Tarik",
                      subtitle: "Close friends don’t always need to meet in person",
                    },
                    {
                      title: "A small savings jar",
                      author: "Tarik",
                      subtitle: "My path to the world of big dreams has never been easier or felt farther away",
                    },
                    {
                      title: "In My Next Life, I'd Like to Be a Shih Tzu",
                      author: "Tarik",
                      subtitle: "An Unforgettable Diary About Dogs, Humans, and the Lessons, They Teach Us",
                    },
                  ],
                }),
              });
            }, 900);
          });
        };


        // if (!response.ok) {
        //   throw new Error("Oops... Something went wrong. Please try again in 20 seconds.");
        //   console.log("❌ API Response:", response);
        // };
        const response = await mockFetch();


        const data = await response.json();

        const booksKey = Object.keys(data).find(key => Array.isArray(data[key]));
        const formattedBooks = data[booksKey].map(({ title, subtitle }) => ({ title, subtitle }));

        localStorage.setItem(storageKey, JSON.stringify(formattedBooks));

        setBooks(formattedBooks);

        setSelectedTopic("");
        setSelectedSubTopic("");

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [genreUpdated, questions, questionsAndAnswers]);

  return { books, loading, error };
};
