import React, { useEffect, useState, useContext } from "react";
import { generateCoverDesign } from "@/utils/coverGenerator";
import CreateBookContext from "@/contexts/CreateBookContext";
import CreateGenreContext from "@/contexts/CreateGenreContext";

const CoverPreview = () => {
  const { authorName, authorImage } = useContext(CreateBookContext);
  const { selectedTopic } = useContext(CreateGenreContext);
  const [cover, setCover] = useState(null);

  useEffect(() => {
    const generateCover = async () => {
      try {
        const contextData = { authorName, selectedTopic, authorImage };
        const generatedCover = await generateCoverDesign("template2", "front", contextData);
        setCover(generatedCover);
      } catch (error) {
        console.error("Error generating cover:", error);
      }
    };

    generateCover();
  }, [authorName, selectedTopic, authorImage]);

  return (
    <div>
      <h1>Cover Preview</h1>
      {cover ? (
        <img src={cover} alt="Generated Cover" className="w-full h-auto" />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CoverPreview;
