import { useEffect, useContext, useRef, useState } from "react";
import CreateBookContext from "@/contexts/CreateBookContext";
import CreateGenreContext from "@/contexts/CreateGenreContext";
import config from "../../config";

export const useTableOfContentsAPI = () => {
  const { questionsUrl } = config;

  const {
    authorName,
    selectedAge,
    selectedGender,
    questionsAndAnswers,
    tableOfContents,
    setTableOfContents,
    setErrorToc,
    setLoading,
    questions,
    setQuestions,
  } = useContext(CreateBookContext);

  const {
    selectedGenre,
    selectedTopic,
    selectedSubTopic,
    genreUpdated,
    setGenreUpdated,
    topicUpdated,
    setTopicUpdated,
  } = useContext(CreateGenreContext);

  const [localTableOfContents, setLocalTableOfContents] = useState(tableOfContents || []);
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

    if (!questions || questions.length === 0) {
      fetchQuestions();
    }
  }, [questionsUrl]);

  useEffect(() => {
    const shouldRegenerate = (
      genreUpdated || topicUpdated ||
      !tableOfContents || tableOfContents.length === 0
    );

    if (!shouldRegenerate) {
      setLocalTableOfContents(tableOfContents);
      setLoading(false);
      return;
    }

    if (fetchTriggered.current) {
      return;
    }

    fetchTriggered.current = true;
    setLoading(true);
    setErrorToc(null);

    const fetchTableOfContents = async () => {
      try {
        const response = await fetch("https://api.booktailor.com/generate-table-of-contents", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: selectedTopic,
            subtitle: selectedSubTopic,
            author_name: authorName,
            genre: selectedGenre ? selectedGenre.toLowerCase().trim() : null,
            gender: selectedGender,
            age: selectedAge ? String(selectedAge.value) : null,
            quiz_answers: questionsAndAnswers.map(({ value, answer }) => {
              const questionObj = questions.find((q) => q.value === value);
              return {
                question: questionObj ? questionObj.label.replace("{author}", authorName) : "Unknown question",
                answer,
              };
            }),
          }),
        });

        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();

        if (!Array.isArray(data.table_of_contents)) {
          throw new Error("Invalid API response: No valid Table of Contents found");
        }

        const formattedContents = data.table_of_contents.map(item => ({
          chapter: `Chapter ${item.chapter_number}: ${item.title}`,
          title: item.description,
          page: item.page_number,
        }));

        setTableOfContents(formattedContents);
        setLocalTableOfContents(formattedContents);

      } catch (err) {
        setErrorToc(err.message);
      } finally {
        setLoading(false);
        setGenreUpdated(false);
        setTopicUpdated(false);
      }
    };

    fetchTableOfContents();

  }, [
    genreUpdated,
    topicUpdated,
    selectedGenre,
    selectedTopic,
    selectedSubTopic,
    authorName,
    selectedAge,
    selectedGender,
    questionsAndAnswers,
    questions,
  ]);


  return { tableOfContents: localTableOfContents };
};
