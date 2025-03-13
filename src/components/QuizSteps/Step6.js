import React, { useEffect, useContext, useState } from "react";
import CreateBookContext from "@/contexts/CreateBookContext";
import ImageUploader from "@/components/ImageUploader/ImageUploader";
import { validateImage } from "@/utils/imageValidation";
import { useTableOfContentsAPI } from "@/hooks/useTableOfContentsAPI";
function Step6  ({ setProgressStep, setIsButtonDisabled,loader, setLoader }) {
  const {
    authorImage,
    setAuthorImage,
    croppedImage,
    setCroppedImage,
    setProcessedAuthorImage,
    authorName,
    error,
    setError,
    setSelectedTemplate,

  } = useContext(CreateBookContext);


   useTableOfContentsAPI();//  TOC Generating


  const [preview, setPreview] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const isMobile = () => /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

  useEffect(() => {
    setProgressStep(5);
  }, [setProgressStep]);

  useEffect(() => {
    if (authorImage && typeof authorImage === "string" && authorImage.startsWith("data:image")) {
      setPreview(authorImage);
    } else if (authorImage instanceof File) {
      setPreview(URL.createObjectURL(authorImage));
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

  const trimTransparentPixels = async (imageBlob) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(imageBlob);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
  
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const { data, width, height } = imageData;
  
        let top = null, bottom = null, left = null, right = null;
  
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const alpha = data[(y * width + x) * 4 + 3];
            if (alpha !== 0) {
              if (top === null) top = y;
              bottom = y;
              if (left === null || x < left) left = x;
              if (right === null || x > right) right = x;
            }
          }
        }
  
        // Якщо немає непрозорих пікселів — повернути null
        if (top === null || left === null || right === null || bottom === null) {
          resolve(null);
          return;
        }
  
        const trimmedWidth = right - left + 1;
        const trimmedHeight = bottom - top + 1;
  
        const trimmedCanvas = document.createElement('canvas');
        trimmedCanvas.width = trimmedWidth;
        trimmedCanvas.height = trimmedHeight;
  
        const trimmedCtx = trimmedCanvas.getContext('2d');
        trimmedCtx.drawImage(canvas, left, top, trimmedWidth, trimmedHeight, 0, 0, trimmedWidth, trimmedHeight);
  
        trimmedCanvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/png');
      };
    });
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
      if (validationResult.errorType === "unsupported_type" || validationResult.errorType === "file_too_large") {
        setIsProcessing(false);
        return;
      }
    } else {
      setError(null);
    }
  
    let processedFile = file;
  
    if (isMobile()) {
      processedFile = await resizeImage(file, 431 * 1.5, 648 * 1.5);
    }
  
    setAuthorImage(file);
  
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
  
      // Обрізаємо прозорі пікселі
      const trimmedBlob = await trimTransparentPixels(imageBlob);
  
      if (!trimmedBlob) {
        throw new Error("Image is fully transparent or invalid.");
      }
  
      const imageFile = new File([trimmedBlob], "processed-image.png", { type: "image/png" });
  
      let finalImage = imageFile;
      if (isMobile()) {
        finalImage = await resizeImage(imageFile, 431 * 4, 648 * 4);
      }
  
      setCroppedImage(finalImage);
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
      <div className="w-full mt-4 md:mt-2 md:px-6">
        <div className="field-title">Upload a photo for a book cover</div>
        <div className="field-desc">
        For best results, use a high-quality portrait or upper-body shot of  {authorName.trim()}  
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
