import React, { useEffect, useState, useContext } from "react";
import { generateAllCovers } from "@/utils/coverGeneratorHelper";
import CoverSlider from "../CoverSlider/CoverSlider";
import CreateBookContext from "@/contexts/CreateBookContext";
import CreateGenreContext from "@/contexts/CreateGenreContext";

// Функція для обробки зображення автора
const processAuthorImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await fetch("https://booktailor.com/api/remove-background", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to process image");
    }

    const data = await response.json();
    const processedUrl = data.processed_url; // Отримуємо processed_url безпосередньо

    return processedUrl; // Повертаємо лише processed_url
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
};

const Step7 = ({ setProgressStep }) => {
  const { authorName, authorImage } = useContext(CreateBookContext);
  const { selectedTopic, selectedSubTopic } = useContext(CreateGenreContext);

  const [allCovers, setAllCovers] = useState([]);
  const [selectedCover, setSelectedCover] = useState(null);

  useEffect(() => {
    setProgressStep(5);

    const fetchGeneratedCovers = async () => {
      try {
        let processedImage = authorImage;

        // Якщо зображення є файлом, обробляємо його
        if (authorImage instanceof File) {
          processedImage = await processAuthorImage(authorImage); // Отримуємо processed_url
          
        }

        // const contextData = { authorName, selectedTopic, authorImage: processedImage };
        const contextData = { authorName, selectedTopic, selectedSubTopic, authorImage};
        const covers = await generateAllCovers(contextData);
        setAllCovers(covers);

        // Встановлюємо перший шаблон як вибраний за замовчуванням
        if (covers.length > 0) setSelectedCover(covers[0]);
      } catch (error) {
        console.error("Error generating covers:", error);
      }
    };

    fetchGeneratedCovers();
  }, [authorName, selectedTopic, selectedSubTopic, authorImage, setProgressStep]);

  const handlePreviewClick = (index) => {
    setSelectedCover(allCovers[index]);
  };

  return (
    <div className="w-full mt-4 md:px-6 flex justify-between">
      

      {/* Слайдер */}
      <div className="max-w-[425px] relative">
        {selectedCover ? (
          <CoverSlider selectedCover={selectedCover} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {/* Список прев'юшок */}
      <div className="flex flex-col space-y-4 pr-6">
        {allCovers.map((cover, index) => (
          <img
            key={index}
            src={cover.frontCover}
            alt={`Preview Template ${index + 1}`}
            className={`w-20 h-auto cursor-pointer border ${
              selectedCover === cover ? "border-blue-500" : "border-gray-300"
            }`}
            onClick={() => handlePreviewClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Step7;
