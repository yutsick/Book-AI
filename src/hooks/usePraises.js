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
    console.log("🔄 Checking conditions in usePraises...");

    if (!contextUpdated && !topicUpdated) {
      console.log("❌ No context/topic update, skipping fetch.");
      setLoading(false);
      return;
    }

    if (!selectedTopic || !selectedSubTopic || !authorName) {
      console.log("❌ Missing required fields, skipping fetch.");
      setLoading(false);
      return;
    }

    // if (praises?.length > 0) {
    //   console.log("✅ Praises already exist, skipping fetch.");
    //   setLoading(false);
    //   return;
    // }

    const fetchPraises = async () => {
      console.log("🚀 Fetching praises...");
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
        console.log("✅ Received praises:", data.praises);

        setPraises(Array.isArray(data.praises) ? data.praises : []);
      } catch (err) {
        console.error("❌ Fetch error:", err);
        setError(err.message);
        setPraises([]); // Гарантуємо, що це масив
      } finally {
        console.log("✅ Finished fetching praises.");
        setLoading(false);
      }
    };

    fetchPraises();
  }, [contextUpdated, topicUpdated]);

  return { praises: praises || [], loading, error };
};

export default usePraises;
