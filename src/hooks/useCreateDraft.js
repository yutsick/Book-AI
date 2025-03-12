import { useState, useEffect, useContext } from "react";
import CreateBookContext from "@/contexts/CreateBookContext";
import CreateGenreContext from "@/contexts/CreateGenreContext";
import config from "../../config";

const useCreateDraft = () => {
  const { questionsUrl } = config;
  const [questions, setQuestions] = useState(null);

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

  const {
    authorName,
    selectedAge,
    selectedGender,
    questionsAndAnswers,
    authorEmail,
  } = useContext(CreateBookContext);

  const { selectedGenre } = useContext(CreateGenreContext);

  const createDraft = async () => {
    const savedUUID = localStorage.getItem("draftUUID");

    if (savedUUID) {
      return;
    }

    const payload = {
      email: authorEmail,
      name: authorName,
      quiz_answers: questionsAndAnswers
        .filter((el) => el.answer.length !== 0)
        .map(({ value, answer }) => {
          const questionObj = questions.find((q) => q.value === value);
          return {
            question: questionObj ? questionObj.label.replace("{author}", authorName) : "Unknown question",
            answer,
          };
        }),
      genre: selectedGenre,
      age: selectedAge?.value,
      gender: selectedGender,
      author_name: authorName,
    };

    try {
      const response = await fetch("https://api.booktailor.com/create-draft", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.status === "success") {
        localStorage.setItem("draftUUID", data.data.uuid);
        localStorage.setItem("draftEmail", data.data.email);
      } else {
        console.error("API Error:", data.message);
      }
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  return createDraft;
};

export default useCreateDraft;
