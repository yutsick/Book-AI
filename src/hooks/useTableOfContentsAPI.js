import { useState, useEffect, useContext, useRef } from "react";
import CreateBookContext from "@/contexts/CreateBookContext";
import CreateGenreContext from "@/contexts/CreateGenreContext";

export const useTableOfContentsAPI = () => {
  const { authorName, selectedAge, selectedGender, questionsAndAnswers } = useContext(CreateBookContext);
  const { selectedGenre, selectedTopic, selectedSubTopic, genreUpdated, setGenreUpdated, topicUpdated, setTopicUpdated } = useContext(CreateGenreContext);

  const [tableOfContents, setTableOfContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchTriggered = useRef(false);

  useEffect(() => {
    let missingFields = [];

    if (!authorName) missingFields.push("authorName");
    // if (!selectedAge) missingFields.push("selectedAge");
    // if (!selectedGender) missingFields.push("selectedGender");
    if (!questionsAndAnswers || questionsAndAnswers.length === 0) missingFields.push("quiz_answers");
    // if (!selectedGenre) missingFields.push("selectedGenre");
    if (!selectedTopic) missingFields.push("selectedTopic");
    if (!selectedSubTopic) missingFields.push("selectedSubTopic");

    if (missingFields.length > 0) {
      console.error(`⛔ Missing required fields: ${missingFields.join(", ")}`);
      setLoading(false);
      setError(`Missing required fields: ${missingFields.join(", ")}`);
      return;
    }

    const storageKey = `toc`;
    if (!genreUpdated && !topicUpdated && typeof window !== "undefined") {
      const storedToc = localStorage.getItem(storageKey);
      if (storedToc) {
        try {
          const parsedToc = JSON.parse(storedToc);
          if (Array.isArray(parsedToc) && parsedToc.length > 0) {
            console.log("📦 Using Table of Contents from localStorage");
            setTableOfContents(parsedToc);
            setLoading(false);
            return;
          }
        } catch (error) {
          console.error("❌ Error parsing stored Table of Contents:", error);
        }
      }
    }

    if (genreUpdated) {
      console.log("🔄 Topic or SubTopic changed, clearing previous Table of Contents...");
      localStorage.removeItem(storageKey);
      setTableOfContents([]);
      fetchTriggered.current = false;
    }
    if (topicUpdated) {
      console.log("🔄 Topic or SubTopic changed, clearing previous Table of Contents...");
      localStorage.removeItem(storageKey);
      setTableOfContents([]);
      fetchTriggered.current = false;
    }

    if (fetchTriggered.current) {
      console.warn("🚫 API call already triggered, skipping...");
      return;
    }
    fetchTriggered.current = true;
    setGenreUpdated(false);
    setTopicUpdated(false);

    const fetchTableOfContents = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log("📖 Fetching Table of Contents from API...");
        const response = await fetch("https://api.booktailor.com/generate-table-of-contents", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: selectedTopic,
            subtitle: selectedSubTopic,
            author_name: authorName,
            genre: selectedGenre,
            gender: selectedGender,
            age: selectedAge ? String(selectedAge.value) : null,
            quiz_answers: questionsAndAnswers
          }),
        });

        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();

        if (!data.table_of_contents || !Array.isArray(data.table_of_contents)) {
          console.error("❌ API Response does not contain a valid Table of Contents:", data);
          throw new Error("Invalid API response: No valid Table of Contents found");
        }

        console.log("✅ Table of Contents received:", data.table_of_contents);

        const formattedContents = data.table_of_contents.map(item => ({
          chapter: `Chapter ${item.chapter_number}: ${item.title}`,
          title: item.description,
          page: item.page_number
        }));

        setTableOfContents(formattedContents);
        localStorage.setItem(storageKey, JSON.stringify(formattedContents));

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTableOfContents();
  }, [genreUpdated, topicUpdated]); 

  return { tableOfContents, loading, error };
};
