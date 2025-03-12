import { useState, useEffect, useContext } from "react";
import CreateBookContext from "@/contexts/CreateBookContext";
import CreateGenreContext from "@/contexts/CreateGenreContext";

const usePraises = () => {
  const {
    authorName,
    selectedAge,
    selectedGender,
    questionsAndAnswers,
    contextUpdated,
    praises,
    setPraises,
  } = useContext(CreateBookContext);
  
  const { selectedTopic, selectedSubTopic, topicUpdated } = useContext(CreateGenreContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!contextUpdated && !topicUpdated) {
      setLoading(false);
      return;
    }

    if (!selectedTopic || !selectedSubTopic || !authorName) {
      setLoading(false);
      return;
    }

    const fetchPraises = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("https://api.booktailor.com/generate-praises", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: selectedTopic,
            subtitle: selectedSubTopic,
            author_name: authorName,
            gender: selectedGender,
          }),
        });

        if (!response.ok) {
          throw new Error("❌ Failed to fetch praises");
        }

        const data = await response.json();

        setPraises(Array.isArray(data.praises) ? data.praises : []);
      } catch (err) {
        console.error("❌ Fetch error:", err);
        setError(err.message);
        setPraises([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchPraises();
  }, [contextUpdated, topicUpdated]);

  return { praises: praises || [], loading, error };
};

export default usePraises;
