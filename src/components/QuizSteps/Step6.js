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
  } = useContext(CreateBookContext);

  const [preview, setPreview] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false); // 🔥 Лоадер

  useEffect(() => {
    setProgressStep(4);
  }, [setProgressStep]);

  useEffect(() => {
    if (authorImage) {
      setPreview(URL.createObjectURL(authorImage));
    }
  }, [authorImage]);

  useEffect(() => {
    setIsButtonDisabled(!croppedImage); // 🔥 Вимикаємо кнопку, поки немає обробленого зображення
    return () => {
      setIsButtonDisabled(false);
    };
  }, [setIsButtonDisabled, croppedImage]);

  const handleFileChange = async (file) => {
    setPreview(URL.createObjectURL(file));
    setAuthorImage(file);
    setCroppedImage(null); // 🔥 Очищаємо старий `croppedImage`
    setIsProcessing(true); // 🔥 Вмикаємо лоадер
  
    // 🔥 Валідація, але дозволяємо продовжити процес
    const validationResult = await validateImage(file);
    if (!validationResult.valid) {
      setError(validationResult.error); // ❌ Відображаємо помилку, але не зупиняємо процес
    } else {
      setError(null);
    }
  
    try {
      const formData = new FormData();
      formData.append("image", file);
  
      const response = await fetch("https://api.booktailor.com/remove-background", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Error removing background");
      }
  
      const data = await response.json();
      const processedUrl = data.data.processed_url;
      setProcessedAuthorImage(processedUrl);
  
      // 🔥 Завантажуємо оброблене зображення
      const imageResponse = await fetch(processedUrl);
      if (!imageResponse.ok) {
        throw new Error("Error fetching processed image");
      }
  
      const imageBlob = await imageResponse.blob();
      const imageFile = new File([imageBlob], "processed-image.png", { type: "image/png" });
  
      console.log("✅ Processed Image:", imageFile);
      setCroppedImage(imageFile); // 🔥 Зберігаємо в контекст
  
    } catch (error) {
      console.error("❌ Error processing image:", error);
      setError("Failed to process the image.");
    } finally {
      setIsProcessing(false); // 🔥 Вимикаємо лоадер
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

        {isProcessing && (
          <div className="flex justify-center items-center mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500 border-opacity-50"></div>
            <span className="ml-2 text-gray-600">Processing image...</span>
          </div>
        )}

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
