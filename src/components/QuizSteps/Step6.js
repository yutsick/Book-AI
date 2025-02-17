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
    setError,
    setSelectedTemplate
  } = useContext(CreateBookContext);

  const [preview, setPreview] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const isMobile = () => /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

  // 🚀 Завантаження `authorImage` і `croppedImage` з localStorage при оновленні сторінки
  useEffect(() => {
    const savedImage = localStorage.getItem("authorImage");
    if (savedImage) {
      setAuthorImage(JSON.parse(savedImage));
    }

    const savedCroppedImage = localStorage.getItem("croppedImage");
    if (savedCroppedImage) {
      setCroppedImage(JSON.parse(savedCroppedImage));
    }
  }, [setAuthorImage, setCroppedImage]);

  useEffect(() => {
    setProgressStep(5);
  }, [setProgressStep]);

  useEffect(() => {
    if (authorImage) {
      setPreview(authorImage.startsWith("data:image") ? authorImage : URL.createObjectURL(authorImage));
    }
  }, [authorImage]);

  useEffect(() => {
    setIsButtonDisabled(isProcessing || !croppedImage);
    return () => {
      setIsButtonDisabled(false);
    };
  }, [setIsButtonDisabled, croppedImage, isProcessing]);

  const resizeImage = async (file, maxWidth, maxHeight) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        let { width, height } = img;

        let scaleFactor = Math.min(maxWidth / width, maxHeight / height, 1);

        if (scaleFactor < 1) {
          width = Math.round(width * scaleFactor);
          height = Math.round(height * scaleFactor);
        }

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d", { alpha: true });
        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
          const resizedFile = new File([blob], "resized-image.png", { type: "image/png" });
          resolve(resizedFile);
        }, "image/png", 0.8);
      };
    });
  };

  const convertFileToBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => callback(reader.result);
    reader.onerror = (error) => console.error("❌ Error converting file:", error);
  };

  const handleFileChange = async (file) => {
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setIsProcessing(true);
    setCroppedImage(null);
    setAuthorImage(null);

    const validationResult = await validateImage(file);

    if (!validationResult.valid) {
      setError(validationResult.error);
      setIsProcessing(false);
      return;
    } else {
      setError(null);
    }

    let processedFile = file;

    if (isMobile()) {
      console.log("📱 Mobile detected - resizing image...");
      processedFile = await resizeImage(file, 431 * 1.5, 648 * 1.5);
    }

    convertFileToBase64(file, (base64) => {
      setAuthorImage(base64);
      localStorage.setItem("authorImage", JSON.stringify(base64));
    });

    try {
      const formData = new FormData();
      formData.append("image", processedFile);

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

      const imageResponse = await fetch(processedUrl);
      if (!imageResponse.ok) {
        throw new Error("Error fetching processed image");
      }

      const imageBlob = await imageResponse.blob();
      const imageFile = new File([imageBlob], "processed-image.png", { type: "image/png" });

      let finalImage = imageFile;
      if (isMobile()) {
        finalImage = await resizeImage(imageFile, 431 * 4, 648 * 4);
      }

      // Зберігаємо croppedImage для можливості редагування
      convertFileToBase64(finalImage, (base64) => {
        setCroppedImage(base64);
        localStorage.setItem("croppedImage", JSON.stringify(base64));
      });

    } catch (error) {
      console.error("❌ Error processing image:", error);
      setError("Failed to process the image.");
    } finally {
      setIsProcessing(false);
      setSelectedTemplate({});
    }
  };

  return (
    <div>
      <div className="w-full mt-2 md:px-6">
        <div className="field-title">Upload a photo</div>
        <div className="field-desc">
          We’ll feature it on the front cover to make your book feel more personal. For the best results, use a high-quality image of {authorName.trim()} — either a portrait or an upper-body shot.
        </div>

        <div className="w-full flex justify-center mt-5">
          <ImageUploader onFileChange={handleFileChange} preview={preview} />
        </div>

        {isProcessing && (
          <div className="flex justify-center items-center mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-amber-600 border-opacity-50"></div>
            <span className="ml-2 text-gray-600">Processing image...</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 w-full justify-center mt-2">
            <div className="text-[#CF8700] text-[16px] leading-[20px] flex gap-1 items-center">
              <img src="/images/create-book/warning-icon.svg" alt="" />
              {error}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step6;
