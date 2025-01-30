import React, { useEffect, useState, useContext } from "react";
import { generateCoverById } from "@/utils/coverGenerators/coverGeneratorHelper";
import CoverSlider from "../CoverSlider/CoverSlider";
import ImageCropperModal from "@/components/ImageCropper/ImageCropperModal";
import CreateBookContext from "@/contexts/CreateBookContext";
import CreateGenreContext from "@/contexts/CreateGenreContext";

const previewTemplates = [
  { id: 1, src: "images/create-book/previews/front1.png", alt: "Template 1" },
  { id: 2, src: "images/create-book/previews/front2.png", alt: "Template 2" },
  { id: 3, src: "images/create-book/previews/front3.png", alt: "Template 3" },
  { id: 4, src: "images/create-book/previews/front4.png", alt: "Template 4" },
  { id: 5, src: "images/create-book/previews/front5.png", alt: "Template 5" },
  { id: 6, src: "images/create-book/previews/front6.png", alt: "Template 6" },
  { id: 7, src: "images/create-book/previews/front7.png", alt: "Template 7" },
  { id: 8, src: "images/create-book/previews/front8.png", alt: "Template 8" },
];

const Step7 = ({ setProgressStep }) => {
  const { 
    authorName, 
    authorImage, 
    processedAuthorImage, 
    croppedImage, 
    setCroppedImage, 
    selectedTemplate, 
    setSelectedTemplate 
  } = useContext(CreateBookContext);

  const { selectedTopic, selectedSubTopic } = useContext(CreateGenreContext);

  const [selectedCover, setSelectedCover] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRendered, setIsRendered] = useState(false);
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    setProgressStep(5);
  }, [setProgressStep]);

  // ✅ Якщо `croppedImage` змінилося — оновлюємо шаблон
  useEffect(() => {
    if (croppedImage) {
      console.log("🔄 Cropped image updated! Reloading cover...");
      setSelectedTemplate(null); // Очистка попереднього темплейту
      fetchGeneratedCover(1); // Генеруємо новий шаблон
    }
  }, [croppedImage]);

  const fetchGeneratedCover = async (templateId) => {
    if (!croppedImage) {
      console.warn("⚠️ Waiting for `croppedImage`...");
      return;
    }

    setLoading(true);
    try {
      const contextData = { 
        authorName, 
        selectedTopic, 
        selectedSubTopic, 
        authorImage, 
        processedAuthorImage, 
        croppedImage 
      };

      const cover = await generateCoverById(contextData, templateId);
      setSelectedCover(cover);

      setSelectedTemplate({
        templateId,
        front: cover.frontCover, 
        back: cover.backCover, 
        spine: cover.spineCover
      });

      setIsRendered(true);
    } catch (error) {
      console.error("❌ Error generating cover:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Конвертуємо `croppedImage` у Base64 для `ImageCropperModal`
  useEffect(() => {
    if (croppedImage && croppedImage instanceof File) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(croppedImage);
    } else {
      setImageSrc(croppedImage);
    }
  }, [croppedImage]);

  return (
    <>
      <div className="w-full mt-4 md:px-2 flex flex-col items-center md:flex-row justify-between">
        {/* Slider */}
        <div className="max-w-[425px] relative">
          {loading ? <p>Loading...</p> : selectedCover ? <CoverSlider selectedCover={selectedCover} /> : <p>No cover selected</p>}
        </div>

        {/* Previews list */}
        {isRendered && (
          <div className="flex md:max-w-[180px] md:grid grid-cols-2 grid-rows-4 md:gap-2 md:h-[640px]">
            {previewTemplates.map((preview) => (
              <div className="max-h-[130px]" key={preview.id}>
                <img
                  src={preview.src}
                  alt={preview.alt}
                  className="w-full h-auto cursor-pointer"
                  onClick={() => fetchGeneratedCover(preview.id)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Modal crop window */}
        {isCropperOpen && imageSrc && (
          <ImageCropperModal
            imageSrc={imageSrc}
            onClose={() => setIsCropperOpen(false)}
            onSave={(newCroppedImage) => {
              setCroppedImage(newCroppedImage);
              setIsCropperOpen(false);
            }}
          />
        )}
      </div>



      {/* Button for the modal */}
      {isRendered && (
        <div className="flex justify-center max-w-[425px] pl-2">
          <button
            className="mt-4 text-15px[] bg-[#EAAC0026] text-black shadow-md h-6 box-content w-[150px] flex items-center justify-center border rounded-[3px] border-black"
            onClick={() => setIsCropperOpen(true)}
          >
            Adjust the Image
          </button>
        </div>
      )}
    </>
  );
};

export default Step7;
