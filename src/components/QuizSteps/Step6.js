import React, { useEffect, useContext, useState } from "react";
import CreateBookContext from "@/contexts/CreateBookContext";
import ImageUploader from "@/components/ImageUploader/ImageUploader";
import { validateImage } from "@/utils/imageValidation";

const Step6 = ({ setProgressStep }) => {
  const { authorImage, setAuthorImage, authorName, error, setError } = useContext(CreateBookContext);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    setProgressStep(4); // Встановлення кроку
  }, [setProgressStep]);

  useEffect(() => {
    if (authorImage) {
      setPreview(URL.createObjectURL(authorImage)); // Попередній перегляд для збереженого зображення
    }
  }, [authorImage]);

  const handleFileChange = async (file) => {
    setPreview(URL.createObjectURL(file)); // Завжди оновлюємо попередній перегляд
    setAuthorImage(file); // Завжди зберігаємо зображення в контексті

    const validationResult = await validateImage(file);
    if (!validationResult.valid) {
      setError(validationResult.error); // Показуємо помилку, якщо валідація не пройшла
      return;
    }

    setError(null); // Очищення помилки, якщо файл валідний
  };

  return (
    <div>
      <div className="w-full mt-2 md:px-6">
        <div className="field-title">
          Upload a photo to personalize your book’s cover.
        </div>
        <div className="field-desc">
          We recommend using a high-quality photo of {authorName}, either a portrait or a full upper body shot.
        </div>

        <div className="w-full flex justify-center mt-5">
          <ImageUploader onFileChange={handleFileChange} preview={preview} />
        </div>

        {/* Відображення помилки з контексту */}
        {error && (
          <div className="flex items-center gap-2 w-full justify-center mt-2">
            <div className="icon">
              <svg
                width="23"
                height="24"
                viewBox="0 0 23 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.97372 18.0001L11.5 1.50012L21.0263 18.0001H1.97372Z"
                  stroke="#DD4E4E"
                  strokeWidth="0.5"
                />
                <path
                  d="M12.3763 6.78271L12.2863 13.4075H11.2422L11.1521 6.78271H12.3763ZM11.7642 16.0719C11.5422 16.0719 11.3517 15.9924 11.1927 15.8334C11.0336 15.6743 10.9541 15.4838 10.9541 15.2618C10.9541 15.0398 11.0336 14.8492 11.1927 14.6902C11.3517 14.5312 11.5422 14.4517 11.7642 14.4517C11.9863 14.4517 12.1768 14.5312 12.3358 14.6902C12.4948 14.8492 12.5743 15.0398 12.5743 15.2618C12.5743 15.4088 12.5368 15.5438 12.4618 15.6668C12.3898 15.7899 12.2923 15.8889 12.1693 15.9639C12.0493 16.0359 11.9142 16.0719 11.7642 16.0719Z"
                  fill="#DD4E4E"
                />
              </svg>
            </div>
            <div className="text-[#DD4E4E] text-[15px]">{error}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step6;
