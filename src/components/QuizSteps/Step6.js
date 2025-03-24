import React, { useEffect, useContext, useState } from "react";
import CreateBookContext from "@/contexts/CreateBookContext";
import ImageUploader from "@/components/ImageUploader/ImageUploader";
import { validateImage } from "@/utils/imageValidation";
import { useTableOfContentsAPI } from "@/hooks/useTableOfContentsAPI";
import { trimTransparentPixels, resizeImage, createPreview } from "@/utils/imageProcesses";
import { saveImageToDB, getImageFromDB } from "@/utils/indexedDB"; // ✅ IndexedDB

function Step6({ setProgressStep, setIsButtonDisabled, loader, setLoader }) {
  const {
    authorImage,
    setAuthorImage,
    croppedImage,
    setCroppedImage,
    setProcessedAuthorImage,
    setAuthorTransparentImage,
    authorName,
    error,
    setError,
    setSelectedTemplate,
  } = useContext(CreateBookContext);

  useTableOfContentsAPI(); //  TOC Generating

  const [preview, setPreview] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const isMobile = () => /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

  useEffect(() => {
    setProgressStep(5);
  }, [setProgressStep]);

  useEffect(() => {
    if (!preview) { // Якщо прев'юшка ще не встановлена
      if (authorImage && typeof authorImage === "string" && authorImage.startsWith("data:image")) {
        setPreview(authorImage);
      } else if (authorImage instanceof File) {
        setPreview(URL.createObjectURL(authorImage));
      }
    }
  }, [authorImage, preview]);
  

  useEffect(() => {
    setIsButtonDisabled(isProcessing || !croppedImage);
    return () => {
      setIsButtonDisabled(false);
    };
  }, [setIsButtonDisabled, croppedImage, isProcessing]);

  useEffect(() => {
    const storedProcessedImage = localStorage.getItem("processedAuthorImage");
    if (storedProcessedImage) {
      setProcessedAuthorImage(storedProcessedImage);
    }
  }, []);

  const validation = async(file) =>{
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
  }
  useEffect(() => {
    if (authorImage && authorImage !== "") {
      validation(authorImage);  
    }
  
    setIsButtonDisabled(false); 
  }, [authorImage, validation, setIsButtonDisabled]);


  // Preview

  const handleFileChange = async (file) => {
    if (!file) return;
  
    // Preview setting
    const preview = await createPreview(file, 1024);
    if (preview) {
      setPreview(preview); 
    }

    setIsProcessing(true);
    setCroppedImage(null);
    setAuthorImage(null);
  
    validation(file);
  
    let processedFile = file;
  
    if (isMobile()) {
      processedFile = await resizeImage(file, 431 * 1.5, 648 * 1.5);
    }
  
    try {
      await saveImageToDB("authorImage", file);
      setAuthorImage(file);
  
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
  
      localStorage.setItem("processedAuthorImage", processedUrl);
      setProcessedAuthorImage(processedUrl);
  
      const imageResponse = await fetch(processedUrl);
      if (!imageResponse.ok) {
        throw new Error("Error fetching processed image");
      }
  
      const imageBlob = await imageResponse.blob();
  
      // Cut transparent area
      const trimmedBlob = await trimTransparentPixels(imageBlob);
  
      if (!trimmedBlob) {
        throw new Error("Image is fully transparent or invalid.");
      }
  
      const imageFile = new File([trimmedBlob], "processed-image.png", { type: "image/png" });
  
      let finalImage = imageFile;
      if (isMobile()) {
        finalImage = await resizeImage(imageFile, 431 * 4, 648 * 4);
      }
  
      await saveImageToDB("croppedImage", finalImage);
      await saveImageToDB("authorTransparentImage", finalImage);

      setCroppedImage(finalImage);
      setAuthorTransparentImage(finalImage);
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
          For best results, use a high-quality portrait or upper-body shot of {authorName.trim()}
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
          <div className="text-[#CF8700] text-[16px] flex justify-center mt-2">
            <img src="/images/create-book/warning-icon.svg" alt="" />
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default Step6;
