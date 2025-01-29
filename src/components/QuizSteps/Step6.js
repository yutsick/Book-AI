import React, { useEffect, useContext, useState } from "react";
import CreateBookContext from "@/contexts/CreateBookContext";
import ImageUploader from "@/components/ImageUploader/ImageUploader";
import { validateImage } from "@/utils/imageValidation";

const Step6 = ({ setProgressStep, setIsButtonDisabled }) => {
  const { 
    authorImage, 
    setAuthorImage, 
    croppedImage, 
    setCroppedImage,
    setProcessedAuthorImage, 
    authorName, 
    error, 
    setError 
  } =
    useContext(CreateBookContext);

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    setProgressStep(4);
  }, [setProgressStep]);

  useEffect(() => {
    if (authorImage) {
      setPreview(URL.createObjectURL(authorImage));
    }
  }, [authorImage]);

  useEffect(() => {
    setIsButtonDisabled(!authorImage);
    return () => {
      setIsButtonDisabled(false);
    };
  }, [setIsButtonDisabled, authorImage]);

  const handleFileChange = async (file) => {
    setPreview(URL.createObjectURL(file));
    setAuthorImage(file); // 🔥 Зберігаємо оригінальне зображення
    setCroppedImage(file); // 🔥 Ініціалізуємо croppedImage = authorImage
    const validationResult = await validateImage(file);
    if (!validationResult.valid) {
      setError(validationResult.error);
      return;
    }

    setError(null);

    // 🔥 Викликаємо API для видалення фону
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("https://booktailor.com/api/remove-background", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error removing background");
      }

      const data = await response.json();
      setProcessedAuthorImage(data.data.processed_url); // 🔥 Зберігаємо зображення без фону

    } catch (error) {
      console.error("❌ Error processing image:", error);
    }
  };

  return (
    <div>
      <div className="w-full mt-2 md:px-6">
        <div className="field-title">Upload a photo to personalize your book’s cover.</div>
        <div className="field-desc">
          We recommend using a high-quality photo of {authorName}, either a portrait or a full upper body shot.
        </div>

        <div className="w-full flex justify-center mt-5">
          <ImageUploader onFileChange={handleFileChange} preview={preview} />
        </div>

        {error && (
          <div className="flex items-center gap-2 w-full justify-center mt-2">
            <div className="text-[#DD4E4E] text-[15px]">{error}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step6;
